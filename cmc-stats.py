# pos_status.py
# -*- coding: utf-8 -*-
"""
Copyright 2020 the orbs-network/status-page-v2 authors
Python translation of the TypeScript module.

Notes:
- Uses web3.py contracts for calls/events.
- Event reads are generic (ABI-driven) and support topic filters (like TS).
- Multicall is replaced here with sequential calls for clarity and portability.
  If you want Multicall, wire it in the `read()` function where indicated.
"""

import os
import json
import gzip as _gzip
import zlib
import base64
import hashlib
import logging
import time
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple, Union

from web3 import Web3
from web3.contract import Contract
from web3.types import BlockIdentifier, FilterParams, LogReceipt

try:
    import redis  # redis-py
except ImportError:
    redis = None  # Optional

from web3._utils.events import get_event_data
from eth_utils import event_abi_to_log_topic

# -------------------------
# Constants (mirroring TS)
# -------------------------

THIRTY_DAYS_IN_BLOCKS = 45_000

VOID_ADDR = '0xffffffffffffffffffffffffffffffffffffffff'
LONG_TERM_RESERVES = "0x384f5cf955b39b76c47a440f14c31ad39fd39d00"
PRIVATE_SALE = "0x1bef7f8798256e033eaa42f005d2b53079b90ffe"
TEAM_AND_FOUNDING_PARTNERS = "0xc200f98f3c088b868d80d8eb0aeb9d7ee18d604b"
ADVISORS = "0x574d48b2ec0a5e968adb77636656672327402634"

OPERATIONAL_1 = "0xbf0BDC642090A9bAad286B58D41f89026B0F23b2"
FOUNDERS_TRADING = "0x5e5A00903a8469291845Ac2Fb148e92c754B6Aa6"
STAKING_REWARDS_1 = "0xB5303c22396333D9D27Dc45bDcC8E7Fc502b4B32"
STAKING_REWARDS_2 = "0xdBb374E965B21C5d6EE370dcB80176884Fa936f1"
PRIVATE_SALE_REMAINING = "0xd43424102fce7b967b3b1F0fc52152DA401E5510"
ETH_LIQUIDITY = "0x2cf59F8986aa73D37F5Dc3A59a50DB2704f5aD9e"
OPERATIONAL_2 = "0x64fefb4f855510c88b3d3b4b20c7f942ef928b4a"
OPERATIONAL_3 = "0xE7670FDF36a49c2Cc358196af9bDC2bCfBABB0FD"
MISTAKE_ADDRESS = "0xCAE24D45363Dcb03F19F44c5b6eD48E431fAFE63"

NON_CIRCULATING_WALLETS = [
    LONG_TERM_RESERVES, PRIVATE_SALE, TEAM_AND_FOUNDING_PARTNERS, ADVISORS
]
NON_CIRCULATING_WALLETS_CMC = NON_CIRCULATING_WALLETS + [
    OPERATIONAL_1, FOUNDERS_TRADING, STAKING_REWARDS_1,
    STAKING_REWARDS_2, PRIVATE_SALE_REMAINING, ETH_LIQUIDITY,
    OPERATIONAL_2, OPERATIONAL_3, MISTAKE_ADDRESS
]

# Backoff pace for event scans
MAX_PACE = 300_000

# Chain IDs (mirror of CHAIN_ID enum)
class CHAIN_ID:
    ETHEREUM = 1
    MATIC = 137

# If you have these from your TS `eth-helper`, set them accordingly:
FirstPoSv2BlockNumber = 9_820_000         # placeholder – set real value!
FirstMaticPoSv2BlockNumber = 26_000_000   # placeholder – set real value!
FirstRewardsBlockNumber = 9_900_000       # placeholder – set real value!

# -------------------------
# Env / Redis configuration
# -------------------------

REDIS_ENABLED = os.getenv("REDIS_ENABLED", "true").lower() != "false"
REDIS_COMPRESSION_ENABLED = os.getenv("REDIS_COMPRESSION_ENABLED", "true").lower() != "false"

def _parse_redis_url(redis_url: str) -> Optional[Dict[str, Any]]:
    try:
        from urllib.parse import urlparse
        u = urlparse(redis_url)
        cfg = {
            "host": u.hostname,
            "port": int(u.port or 6379),
            "password": u.password or None,
            "ssl": u.scheme == "rediss",
            "ssl_cert_reqs": None if u.scheme == "rediss" else None,
        }
        return cfg
    except Exception as e:
        logging.error("Error parsing REDIS_URL: %s", e)
        return None

_redis_client = None
if REDIS_ENABLED and redis is not None:
    cfg = None
    if os.getenv("REDIS_URL"):
        logging.info("Using REDIS_URL configuration")
        cfg = _parse_redis_url(os.getenv("REDIS_URL") or "")
    if cfg is None:
        logging.info("Using individual Redis configuration")
        cfg = {
            "host": os.getenv("REDIS_HOST", "localhost"),
            "port": int(os.getenv("REDIS_PORT", "6379")),
            "password": os.getenv("REDIS_PWD") or None,
            "ssl": True,
            "ssl_cert_reqs": None,
        }
    try:
        _redis_client = redis.StrictRedis(**cfg)  # type: ignore[arg-type]
        _redis_client.ping()
        logging.info("Redis enabled: %s, compression: %s", REDIS_ENABLED, REDIS_COMPRESSION_ENABLED)
    except Exception as e:
        logging.error("Redis connection failed, disabling cache: %s", e)
        _redis_client = None
else:
    logging.info("Redis disabled or redis-py not installed")

# -------------------------
# Helpers (compression/hash)
# -------------------------

def _compress(data: Any) -> str:
    if not REDIS_COMPRESSION_ENABLED:
        return json.dumps(data)
    raw = json.dumps(data).encode("utf-8")
    comp = zlib.compress(raw)
    return base64.b64encode(comp).decode("ascii")

def _decompress(b64: str) -> Any:
    if not REDIS_COMPRESSION_ENABLED:
        return json.loads(b64)
    comp = base64.b64decode(b64)
    raw = zlib.decompress(comp)
    return json.loads(raw.decode("utf-8"))

def _hash_key(contract_addr: str, web3_host: str, filter_topics: List[Union[List[str], str, None]]) -> str:
    data = json.dumps({"contractAddress": contract_addr, "web3Host": web3_host, "filter": filter_topics}, sort_keys=True)
    return hashlib.sha256(data.encode("utf-8")).hexdigest()

def _redis_set(key: str, data: Any) -> None:
    if _redis_client is None:
        return
    _redis_client.set(key, _compress(data))

def _redis_get(key: str) -> Optional[Any]:
    if _redis_client is None:
        return None
    blob = _redis_client.get(key)
    if not blob:
        return None
    try:
        return _decompress(blob.decode("ascii"))
    except Exception as e:
        logging.error("Failed to decompress redis data: %s", e)
        return None

# -------------------------
# Event utilities
# -------------------------

def _topic0_to_abi_map(contract: Contract) -> Dict[str, Dict[str, Any]]:
    """Map event signature topic0 -> event ABI."""
    result: Dict[str, Dict[str, Any]] = {}
    for abi in contract.abi:
        if abi.get("type") == "event":
            topic0 = event_abi_to_log_topic(abi).hex()
            result[topic0] = abi
    return result

def _decode_logs(contract: Contract, logs: List[LogReceipt]) -> List[Dict[str, Any]]:
    topic_map = _topic0_to_abi_map(contract)
    w3 = contract.web3
    out = []
    for log in logs:
        if not log["topics"]:
            continue
        topic0 = Web3.to_hex(log["topics"][0])
        abi = topic_map.get(topic0)
        if not abi:
            # Unknown event, skip
            continue
        try:
            evt = get_event_data(w3.codec, abi, log)
            # Normalize to TS-like shape
            out.append({
                "event": evt["event"],
                "address": evt["address"],
                "blockNumber": evt["blockNumber"],
                "transactionHash": evt["transactionHash"].hex() if isinstance(evt["transactionHash"], bytes) else evt["transactionHash"],
                "returnValues": dict(evt["args"]),
            })
        except Exception as e:
            logging.error("Failed to decode log at block %s: %s", log.get("blockNumber"), e)
    return out

def address_to_topic(addr: str) -> str:
    """Mirror TS addressToTopic: pad address for topic filtering."""
    return "0x" + "0" * 24 + addr.lower().replace("0x", "")

def _extract_guardian_from_filter(filter_topics: List[Union[List[str], str, None]]) -> Optional[str]:
    if len(filter_topics) > 1:
        t1 = filter_topics[1]
        if isinstance(t1, str) and len(t1) == 66:
            return "0x" + t1[26:]
    return None

# -------------------------
# Core event read (cached)
# -------------------------

def read_events(
    filter_topics: List[Union[List[str], str, None]],
    contract: Contract,
    web3: Web3,
    start_block: int,
    end_block: int,
    pace: int
) -> List[Dict[str, Any]]:
    """Read & decode events with a backoff split, similar to TS logic."""
    try:
        logging.info("read events chain_id=%s from=%s to=%s pace=%s", web3.eth.chain_id, start_block, end_block, pace)
        fp: FilterParams = {
            "fromBlock": start_block,
            "toBlock": end_block,
            "address": contract.address,
            "topics": filter_topics,  # already topic-encoded
        }
        logs = web3.eth.get_logs(fp)
        return _decode_logs(contract, logs)
    except Exception as e:
        pace = max(int(round(pace * 0.9)), 101)
        if pace <= 100:
            raise RuntimeError(f"looking for events slowed down below {pace} - fail") from e
        logging.info("slowing down to pace=%s range=(%s..%s)", pace, start_block, end_block)
        out: List[Dict[str, Any]] = []
        i = start_block
        while i < end_block:
            chunk_end = min(i + pace, end_block)
            out += read_events(filter_topics, contract, web3, i, chunk_end, pace)
            i = chunk_end
            pace = MAX_PACE  # attempt to recover after a successful chunk
        logging.info("finished slowed read from=%s to=%s", start_block, end_block)
        return out

def read_events_with_persistence(
    filter_topics: List[Union[List[str], str, None]],
    contract: Contract,
    web3: Web3,
    start_block: int,
    end_block: int,
    pace: int
) -> List[Dict[str, Any]]:
    """Redis-backed cached event reader, mirrors TS behavior."""
    web3_host = getattr(getattr(web3, "provider", None), "endpoint_uri", "") or "unknown"
    key = _hash_key(contract.address, web3_host, filter_topics)
    guardian_addr = _extract_guardian_from_filter(filter_topics)

    cached = _redis_get(key)
    if cached:
        events = cached.get("events", [])
        cached_end = int(cached.get("endBlock", start_block))
        if cached_end < end_block:
            new_events = read_events(filter_topics, contract, web3, cached_end + 1, end_block, pace)
            merged = events + new_events
            payload = {
                "events": merged,
                "contractAddress": contract.address,
                "web3ProviderUrl": web3_host,
                "guardianAddress": guardian_addr,
                "startBlock": start_block,
                "endBlock": end_block,
                "filter": filter_topics,
            }
            _redis_set(key, payload)
            return merged
        return events

    # No cache
    events = read_events(filter_topics, contract, web3, start_block, end_block, pace)
    payload = {
        "events": events,
        "contractAddress": contract.address,
        "web3ProviderUrl": web3_host,
        "guardianAddress": guardian_addr,
        "startBlock": start_block,
        "endBlock": end_block,
        "filter": filter_topics,
    }
    _redis_set(key, payload)
    return events

# -------------------------
# Helpers for block info
# -------------------------

def get_block_info(block_number: int, web3: Web3) -> Dict[str, Any]:
    blk = web3.eth.get_block(block_number)
    return {"number": blk.number, "time": blk.timestamp}

def multicall_to_block_info(now_block: Dict[str, Any]) -> Dict[str, Any]:
    # In TS, makerdao/multicall returns a structure you convert here.
    # Our `read()` does sequential calls and fills this directly from latest block.
    return now_block

# -------------------------
# “Model” hints (lightweight types)
# -------------------------

# Expect `model` to have:
# - AllRegisteredNodes: Dict[str, Any] (keys are guardian addresses without 0x)
# - CommitteeNodes: Dict[str, Any], nodes with fields: EthAddress, EffectiveStake, IsCertified, OrbsAddress, Ip
# - StandByNodes: Dict[str, Any]
# You can mirror your TS model or pipe in your existing Python structures.

# Expect `resources` to have:
# - erc20Address, stakingAddress, delegationsAddress, stakingRewardsAddress, bootstrapRewardsAddress
#   generalFeesWalletAddress, certifiedFeesWalletAddress
# - erc20Contract, stakingContract, delegationContract, stakingRewardsContract, ... (web3.py Contract instances)

# -------------------------
# read(): sequential calls version (TS used makerdao/multicall aggregate)
# -------------------------

# keys for the data dict (mirror TS constants)
Erc20TotalSupply = 'Erc20TotalSupply'
Erc20LongTerm = 'Erc20LongTerm'
Erc20PrivateSale = 'Erc20PrivateSale'
Erc20TeamAndFounding = 'Erc20TeamAndFounding'
Erc20Advisors = 'Erc20Advisors'




StakingLongTerm = 'StakingLongTerm'
StakingPrivateSale = 'StakingPrivateSale'
StakingTeamAndFounding = 'StakingTeamAndFounding'
StakingAdvisors = 'StakingAdvisors'
TotalStaked = 'TotalStaked'
UncappedStaked = 'UncappedStaked'
Erc20Staked = 'Erc20Staked'
StakeingRewardRate = 'StakeingRewardRate'
GenGuardFund = 'GenGuardFund'
GenGuardFeeNow = 'GenGuardFeeNow'
GenGuardFeeNextMonth = 'GenGuardFeeNextMonth'
GenGuardFeeNextYear = 'GenGuardFeeNextYear'
CertGuardFund = 'CertGuardFund'
CertGuardFeeNow = 'CertGuardFeeNow'
CertGuardFeeNextMonth = 'CertGuardFeeNextMonth'
CertGuardFeeNextYear = 'CertGuardFeeNextYear'
StakeingRewardUnclaimed = 'StakeingRewardUnclaimed'
StakeingRewardPerWeight = 'StakeingRewardPerWeight'
DelegationStakeTotal = 'DelegationStakeTotal'
BlockTimestamp = 'BlockTimestamp'

def read(resources: Any, web3: Web3) -> Dict[str, Any]:
    """
    Sequentially execute the same read set as the TS multicall.
    Returns: {"block": {"number": int, "time": int}, "data": Dict[str, int]}
    All numeric values returned as Python ints (wei). Convert/format as needed.
    """
    chain_id = web3.eth.chain_id
    now_block = web3.eth.get_block("latest")

    now_time = int(time.time()) + 13

    data: Dict[str, int] = {}

    # ERC20
    data[Erc20TotalSupply] = int(resources.erc20Contract.functions.totalSupply().call())
    data[Erc20LongTerm] = int(resources.erc20Contract.functions.balanceOf(LONG_TERM_RESERVES).call())
    data[Erc20PrivateSale] = int(resources.erc20Contract.functions.balanceOf(PRIVATE_SALE).call())
    data[Erc20TeamAndFounding] = int(resources.erc20Contract.functions.balanceOf(TEAM_AND_FOUNDING_PARTNERS).call())
    data[Erc20Advisors] = int(resources.erc20Contract.functions.balanceOf(ADVISORS).call())

    # Staking balances
    data[StakingLongTerm] = int(resources.stakingContract.functions.getStakeBalanceOf(LONG_TERM_RESERVES).call())
    data[StakingPrivateSale] = int(resources.stakingContract.functions.getStakeBalanceOf(PRIVATE_SALE).call())
    data[StakingTeamAndFounding] = int(resources.stakingContract.functions.getStakeBalanceOf(TEAM_AND_FOUNDING_PARTNERS).call())
    data[StakingAdvisors] = int(resources.stakingContract.functions.getStakeBalanceOf(ADVISORS).call())

    data[TotalStaked] = int(resources.stakingContract.functions.getTotalStakedTokens().call())
    data[UncappedStaked] = int(resources.delegationContract.functions.uncappedDelegatedStake(VOID_ADDR).call())
    data[Erc20Staked] = int(resources.erc20Contract.functions.balanceOf(resources.stakingAddress).call())
    data[StakeingRewardRate] = int(resources.stakingRewardsContract.functions.getCurrentStakingRewardsRatePercentMille().call())

    data[GenGuardFund] = int(resources.bootstrapRewardsContract.functions.getGeneralCommitteeAnnualBootstrap().call())
    data[GenGuardFeeNow] = int(resources.generalFeesWalletContract.functions.getOutstandingFees(now_time).call())
    data[GenGuardFeeNextMonth] = int(resources.generalFeesWalletContract.functions.getOutstandingFees(now_time + 2_592_000).call())
    data[GenGuardFeeNextYear] = int(resources.generalFeesWalletContract.functions.getOutstandingFees(now_time + 31_536_000).call())

    data[CertGuardFund] = int(resources.bootstrapRewardsContract.functions.getCertifiedCommitteeAnnualBootstrap().call())
    data[CertGuardFeeNow] = int(resources.certifiedFeesWalletContract.functions.getOutstandingFees(now_time).call())
    data[CertGuardFeeNextMonth] = int(resources.certifiedFeesWalletContract.functions.getOutstandingFees(now_time + 2_592_000).call())
    data[CertGuardFeeNextYear] = int(resources.certifiedFeesWalletContract.functions.getOutstandingFees(now_time + 31_536_000).call())

    # getStakingRewardsState()(uint96,uint96)
    s0, s1 = resources.stakingRewardsContract.functions.getStakingRewardsState().call()
    data[StakeingRewardPerWeight] = int(s0)
    data[StakeingRewardUnclaimed] = int(s1)

    data[DelegationStakeTotal] = int(resources.delegationContract.functions.getTotalDelegatedStake().call())
    data[BlockTimestamp] = int(now_block.timestamp)

    return {"block": {"number": now_block.number, "time": now_block.timestamp}, "data": data}

# -------------------------
# Sum unlocked cooldown amounts for wallets
# -------------------------

def sum_unlocked(wallets: List[str], resources: Any) -> int:
    total = 0
    for w in wallets:
        try:
            status = resources.stakingContract.functions.getUnstakeStatus(w).call()
            # Expecting a struct with .cooldownAmount (uint256); web3.py returns tuple/dict depending on ABI.
            cooldown_amount = status.get("cooldownAmount") if isinstance(status, dict) else status[0]
            total += int(cooldown_amount)
        except Exception as e:
            logging.error("getUnstakeStatus failed for %s: %s", w, e)
    return total

# -------------------------
# getPoSStatus (main)
# -------------------------

def get_pos_status(model: Any, resources: Any, web3: Web3) -> Dict[str, Any]:
    """
    Mirrors TS getPoSStatus: reads on-chain state, events, and composes a status object.
    All large numbers returned as decimal strings (wei).
    """
    rd = read(resources, web3)
    block = rd["block"]
    data = rd["data"]

    chain_id = web3.eth.chain_id
    first_pos_block = FirstMaticPoSv2BlockNumber if chain_id == CHAIN_ID.MATIC else FirstPoSv2BlockNumber

    # Delegations (per guardian)
    delegator_map: Dict[str, set] = {}
    for guardian_no0x in list(model["AllRegisteredNodes"].keys()):
        guardian = "0x" + guardian_no0x.lower()
        left_delegators: List[str] = []

        # Topics.DelegateStakeChanged equivalent (topic0 only); if you have the exact keccak,
        # put it here. As a generic example we accept any event and filter by returnValues later
        # but it's best to set the precise topic0 for performance.
        # filter: [[topic0], addressToTopic(guardian)]
        delegate_changed_topic = model["Topics"]["DelegateStakeChanged"]  # hex topic0 expected
        events = read_events_with_persistence(
            [[delegate_changed_topic], address_to_topic(guardian)],
            resources.delegationContract,
            web3,
            first_pos_block,
            block["number"],
            MAX_PACE,
        )
        events.sort(key=lambda e: e["blockNumber"], reverse=True)
        for ev in events:
            rv = ev["returnValues"]
            delegator = rv.get("delegator") or rv.get("delegatorAddress") or rv.get("_delegator")
            stake = int(rv.get("delegatorContributedStake", 0))
            if stake == 0:
                left_delegators.append(delegator)
            if delegator and (delegator.lower() != guardian.lower()) and (delegator not in left_delegators):
                delegator_map.setdefault(guardian, set()).add(delegator)

    unlocked_non_circ = sum_unlocked(NON_CIRCULATING_WALLETS_CMC, resources)

    # Token: supply in circulation (all math in wei)
    supply_in_circ = (
        data[Erc20TotalSupply]
        - data[Erc20LongTerm] - data[Erc20PrivateSale] - data[Erc20TeamAndFounding] - data[Erc20Advisors]
        - data[StakingLongTerm] - data[StakingPrivateSale] - data[StakingTeamAndFounding] - data[StakingAdvisors]
        - unlocked_non_circ
    )

    # Daily activity (approx over last 30-day blocks window)
    start_blk_num = max(0, block["number"] - THIRTY_DAYS_IN_BLOCKS)
    start_block = get_block_info(start_blk_num, web3)
    period_secs = block["time"] - start_block["time"]

    # Transfer topic0 (ERC20 Transfer)
    transfer_topic0 = model["Topics"]["Transfer"]  # keccak of Transfer(address,address,uint256)
    transfer_events = read_events_with_persistence(
        [transfer_topic0], resources.erc20Contract, web3, start_block["number"], block["number"], MAX_PACE
    )
    daily_num_transfers = (len(transfer_events) * 86400.0) / float(period_secs or 1)

    total_transferred = 0
    for ev in transfer_events:
        rv = ev["returnValues"]
        val = int(rv.get("value", 0))
        total_transferred += val
    daily_amount_transferred = (total_transferred * 86400) // (period_secs or 1)

    # Stakers map (use stake-related topics group)
    stake_topics = [
        [model["Topics"]["Staked"], model["Topics"]["Restaked"], model["Topics"]["Unstaked"], model["Topics"]["MigratedStake"]]
    ]
    stake_events = read_events_with_persistence(
        stake_topics, resources.stakingContract, web3,
        FirstPoSv2BlockNumber, block["number"], MAX_PACE
    )
    stakers: Dict[str, int] = {}
    for ev in stake_events:
        rv = ev["returnValues"]
        addr = str(rv.get("stakeOwner") or rv.get("_stakeOwner") or "").lower()
        amt = int(rv.get("totalStakedAmount", 0))
        if addr:
            stakers[addr] = amt

    # Rewards allocations
    rewards_alloc_events = read_events_with_persistence(
        [[model["Topics"]["StakingRewardsAllocated"]]],
        resources.stakingRewardsContract,
        web3,
        FirstRewardsBlockNumber,
        block["number"],
        MAX_PACE
    )
    total_alloc_rewards = 0
    for ev in rewards_alloc_events:
        rv = ev["returnValues"]
        total_alloc_rewards += int(rv.get("allocatedRewards", 0))

    # Committee data (expects your model structure)
    committee_addrs: List[str] = []
    committee_weights: List[int] = []
    committee_certs: List[bool] = []
    committee_orbs: List[str] = []
    committee_ips: List[str] = []
    total_weight = 0
    total_cert_weight = 0
    n_cert = 0

    committee_nodes = model["CommitteeNodes"]
    for _, g in committee_nodes.items():
        eth_addr = "0x" + g["EthAddress"]
        w = int(g["EffectiveStake"])
        cert = bool(g["IsCertified"])
        committee_addrs.append(eth_addr)
        committee_weights.append(w)
        committee_certs.append(cert)
        committee_orbs.append("0x" + g["OrbsAddress"])
        committee_ips.append(g["Ip"])
        total_weight += w
        if cert:
            total_cert_weight += w
            n_cert += 1

    standby_addresses = ["0x" + s["EthAddress"] for _, s in model["StandByNodes"].items()]
    all_addresses = ["0x" + a["EthAddress"] for _, a in model["AllRegisteredNodes"].items()]

    # Build response (stringify big ints like TS .toFixed())
    def s(x: Union[int, str]) -> str:
        return str(int(x)) if isinstance(x, int) else str(x)

    pos_data = {
        "Header": {
            "BlockNumber": block["number"],
            "BlockTimestamp": block["time"],
            "BlockTime": datetime.utcfromtimestamp(block["time"]).isoformat() + "Z",
        },
        "TokenData": {
            "Contract": resources.erc20Address,
            "Decimals": "18",
            "TotalSupply": s(data[Erc20TotalSupply]),
            "SupplyInCirculation": s(supply_in_circ),
            "DailyActivityNumberOfTransfers": f"{daily_num_transfers:.2f}",
            "DailyActivityTokenTransferred": s(daily_amount_transferred),
        },
        "StakedTokenData": {
            "Contract": resources.stakingAddress,
            "Decimals": "18",
            "StakedTokens": s(data[TotalStaked] - data[UncappedStaked]),
            "UnstakedTokens": s(data[Erc20Staked] - data[TotalStaked]),
            "NumberOfAllPastStakers": len(stakers),
            "NumberOfActiveStakers": len([v for v in stakers.values() if v != 0]),
        },
        "RewardsAndFeeData": {
            "CurrentStakingRewardPrecentMille": data[StakeingRewardRate],
            "GeneralCommitteeGuardianMonthlyBootstrapFund": s(data[GenGuardFund] // 12),
            "CertifiedCommitteeGuardianMonthlyBoostrapFund": s(data[CertGuardFund] // 12),
            "GeneralCommitteeGuardianMonthlyFee": s((data[GenGuardFeeNextMonth] - data[GenGuardFeeNow]) // max(1, len(committee_nodes))),
            "CertifiedCommitteeGuardianMonthlyFee": s((data[CertGuardFeeNextMonth] - data[CertGuardFeeNow]) // max(1, n_cert)),
            "GeneralCommitteeGuardianBacklogFee": s(data[GenGuardFeeNextYear] // max(1, len(committee_nodes))),
            "CertifiedCommitteeGuardianBacklogFee": s(data[CertGuardFeeNextYear] // max(1, n_cert)),
            "UnclaimedStakingRewards": s(data[StakeingRewardUnclaimed]),
            "AwardedStakingRewards": s(total_alloc_rewards),
        },
        "DelegationData": {k: list(v) for (k, v) in delegator_map.items()},
        "CommitteeData": {
            "CommitteeMembersData": {
                "Committee": committee_addrs,
                "Weights": committee_weights,
                "Certification": committee_certs,
                "OrbsAddresses": committee_orbs,
                "Ips": committee_ips,
            },
            "CommitteeSize": len(committee_nodes),
            "CertifiedComitteeSize": n_cert,
            "TotalCommitteeWeight": total_weight,
            "CertifiedCommitteeWeight": total_cert_weight,
            "StandByAddresses": standby_addresses,
            "AllRegisteredAddresses": all_addresses,
        },
        "GeneralData": {
            "TotalDelegatedStake": s(data[DelegationStakeTotal]),
        },
    }

    supply_data = {
        "contract": resources.erc20Address,
        "stakingContract": resources.stakingAddress,
        "nonCirculatingWallets": NON_CIRCULATING_WALLETS,
        "supplyInCirculation": s(supply_in_circ),
        "totalSupply": s(data[Erc20TotalSupply]),
        "decimals": "18",
        "block": block["number"],
        "blockTimestamp": block["time"],
        "updatedAt": datetime.utcfromtimestamp(block["time"]).isoformat() + "Z",
    }

    return {"PosData": pos_data, "SupplyData": supply_data}

# -------------------------
# Utility kept from TS
# -------------------------

def get_total_committee_weight(guardians: Dict[str, Dict[str, Any]]) -> int:
    return sum(int(g.get("EffectiveStake", 0)) for g in guardians.values())
