import 'dotenv/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

/**
 * Script to subtract Orbs tokens currently in general staking contract
 * that are considered by CoinMarketCap as being under internal custody.
 *
 * Sums:
 *   1) Tokens held by the staking contract address
 *   2) Tokens held by the designated staking wallet address
 *
 * Returns: number (float) = Noncirculating_Balance_In_Staking_Contract
 *
 * ENV required:
 *   - RPC_URL                    RPC endpoint (HTTPS) for the chain where ORBS is deployed
 *   - ERC20_TOKEN_ADDRESS        ORBS ERC20 contract address
 *   - STAKING_CONTRACT_ADDRESS   Staking contract address
 *   - STAKING_WALLET_ADDRESS     Staking wallet (custody) address
 */

// Minimal ERC20 ABI for balanceOf & decimals
const ERC20_ABI: AbiItem[] = [
  { constant: true, inputs: [{ name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], type: 'function' },
  { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
];

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

export async function getTeamBalanceInStaking(): Promise<number> {
  const rpcUrl = requireEnv('RPC_URL');
  const tokenAddress = requireEnv('ERC20_TOKEN_ADDRESS');
  const stakingContract = requireEnv('STAKING_CONTRACT_ADDRESS');
  const stakingWallet = requireEnv('STAKING_WALLET_ADDRESS');

  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  const erc20 = new web3.eth.Contract(ERC20_ABI, tokenAddress);

  const [decimalsRaw, contractBalRaw, walletBalRaw] = await Promise.all([
    erc20.methods.decimals().call(),
    erc20.methods.balanceOf(stakingContract).call(),
    erc20.methods.balanceOf(stakingWallet).call(),
  ]);

  const decimals = Number(decimalsRaw);
  const divisor = 10 ** decimals;

  const contractBal = Number(web3.utils.toBN(contractBalRaw)) / divisor;
  const walletBal = Number(web3.utils.toBN(walletBalRaw)) / divisor;

  const total = contractBal + walletBal;
  return total;
}

// Allow running this module directly: `ts-node contract_parser.ts`
if (require.main === module) {
  (async () => {
    try {
      const v = await getTeamBalanceInStaking();
      console.log(v);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}