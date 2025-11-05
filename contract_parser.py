from web3 import Web3
from dotenv import load_dotenv
import os, re, requests
load_dotenv()


"""
Script to detract Orbs tokens currently in general staking contract
that are considered by Coin Market Cap as being under internal custody. 

The script sums the total number of tokens staked in the Orbs Staking
contract + Orbs token balance held in contract wallet address. 

returns float(Noncirculating_Balance_In_Staking_Contract)

"""

ETHEREUM_ENDPOINT = os.getenv('ETHEREUM_ENDPOINT')
POS_CONTRACT= os.getenv('POS_CONTRACT')
POS_ADDRESS= os.getenv('POS_ADDRESS')
ORBS_TOKEN_ADDRESS = os.getenv('ORBS_TOKEN_ADDRESS')
ETHERSCAN_API_KEY= os.getenv('ETHERSCAN_API_KEY')
CHAIN_ID = 1
ETHERSCAN_API_URL = "https://api.etherscan.io/v2/api"

def get_noncirculating_in_contract(w3, abi_file):
    #Load ABI
    with open(abi_file, "r") as f:
        abi = f.read()

    #Create a contract instance
    contract = w3.eth.contract(address=Web3.to_checksum_address(POS_CONTRACT), abi=abi)

    # Call getStakeBalanceOffunction
    balance = contract.functions.getStakeBalanceOf(
        Web3.to_checksum_address(POS_ADDRESS)
    ).call()

    bal_translated = balance / 1e18

    return bal_translated

def _require_env(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise ValueError(f"Missing env var: {name}")
    return v

def _is_hex_addr(s: str) -> bool:
    return bool(re.fullmatch(r"0x[0-9a-fA-F]{40}", s or ""))

def get_noncirculating_in_wallet() -> float:
    POS_ADDRESS = _require_env("POS_ADDRESS")
    ORBS_TOKEN_ADDRESS = _require_env("ORBS_TOKEN_ADDRESS")
    ETHERSCAN_API_KEY = _require_env("ETHERSCAN_API_KEY")

    if not _is_hex_addr(POS_ADDRESS):
        raise ValueError(f"POS_ADDRESS is not a valid hex address: {POS_ADDRESS}")
    if not _is_hex_addr(ORBS_TOKEN_ADDRESS):
        raise ValueError(f"ORBS_TOKEN_ADDRESS is not a valid hex address: {ORBS_TOKEN_ADDRESS}")

    params = {
        "chainid": 1,                      # Mainnet
        "module": "account",
        "action": "tokenbalance",
        "contractaddress": ORBS_TOKEN_ADDRESS,
        "address": POS_ADDRESS,
        "tag": "latest",
        "apikey": ETHERSCAN_API_KEY,
    }

    resp = requests.get(ETHERSCAN_API_URL, params=params, timeout=20)
    try:
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        raise ValueError(f"HTTP/parse error: {e}; body={resp.text[:200]}")

    status = str(data.get("status", "")).strip()
    message = data.get("message", "")
    result = data.get("result")

    if status != "1":
        # Common messages: NOTOK / Invalid address format / Max rate limit reached
        raise ValueError(f"Etherscan error: status={status} message={message} result={result}")

    # Safe parse
    try:
        raw = int(result)
    except Exception:
        raise ValueError(f"Unexpected result payload: {result}")

    # If you want to avoid hard-coding 18, fetch token decimals via proxy.eth_call (0x313ce567).
    decimals = 18
    return raw / (10 ** decimals)

def sum_contract_wallet_balance(contract_balance: float, address_balance: float) -> float:
    total = float(contract_balance)+float(address_balance)
    return total

def main():
    w3 = Web3(Web3.HTTPProvider(ETHEREUM_ENDPOINT))
    abi_file = "contract_abi.json"
    tokensHeldInContract = get_noncirculating_in_contract(w3, abi_file)

    # print(f"Stake balance: {tokensHeldInContract:,}")

    tokensHeldInStakingWallet = get_noncirculating_in_wallet()
    # print(f"Unstaked balance: {tokensHeldInStakingWallet:,}")

    totalTokensNoncirculating = sum_contract_wallet_balance(tokensHeldInContract,tokensHeldInStakingWallet)
    # print(f"Total Noncirculating Balance: {totalTokensNoncirculating:,}")
    return float(totalTokensNoncirculating)



