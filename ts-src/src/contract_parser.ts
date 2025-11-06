import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
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
 *   - ORBS_TOKEN_ADDRESS         ORBS ERC20 contract address
 *   - STAKING_CONTRACT_ADDRESS   Staking contract address
 *   - STAKING_WALLET_ADDRESS     Staking wallet (custody) address
 */

const normalizeToBigInt = (v: unknown): bigint => {
  if (typeof v === 'bigint') return v;
  if (typeof v === 'number') return BigInt(v);
  if (typeof v === 'string') return BigInt(v);

  if (Array.isArray(v)) {
    if (v.length === 0) throw new Error('Contract returned an empty array');
    return normalizeToBigInt(v[0]); // tuple -> first item
  }

  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    const candidate =
      o.amount ?? o.value ?? o.balance ?? o.tokens ?? o.stake ?? o[0 as any];
    if (candidate !== undefined) return normalizeToBigInt(candidate);
  }

  throw new Error(`Unexpected return type: ${typeof v} ${JSON.stringify(v)}`);
};

const biToDecimalNumber = (amount: bigint, decimals: number): number => {
  const base = 10n ** BigInt(decimals);
  const whole = amount / base;
  const frac = amount % base;
  if (decimals === 0) return Number(whole);
  const s = `${whole}.${frac.toString().padStart(decimals, '0').replace(/0+$/, '') || '0'}`;
  return parseFloat(s);
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

/**
 * Load a smart contract ABI JSON file from disk.
 * @param abiPath Path to the ABI JSON (default: contract_abi.json)
 */
function loadAbi(abiPath = 'contract_abi.json'): AbiItem[] {
  const full = path.resolve(abiPath);
  if (!fs.existsSync(full)) {
    throw new Error(`ABI file not found at: ${full}`);
  }

  const raw = fs.readFileSync(full, 'utf8');
  const parsed = JSON.parse(raw);

  // Expect the file itself to be the ABI array
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected ABI JSON at ${full} to be an array`);
  }

  // Basic validation: each entry should have a type (function/event/etc.)
  if (!parsed.every((e: any) => typeof e === 'object' && 'type' in e)) {
    throw new Error(`Invalid ABI format at ${full}: each element must have a 'type' field`);
  }

  return parsed as AbiItem[];
}

export async function getTeamBalanceInStaking(abiPath?: string): Promise<number> {
  const rpcUrl = requireEnv('RPC_URL');
  const stakingContractAddr = requireEnv('STAKING_CONTRACT_ADDRESS');
  const stakingWalletAddr = requireEnv('STAKING_WALLET_ADDRESS');
  const tokenAddr = requireEnv('ORBS_TOKEN_ADDRESS');

  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

  // Load your staking contract ABI (raw array)
  // ...
  const STAKING_ABI = loadAbi(abiPath);
  const staking = new web3.eth.Contract(STAKING_ABI, stakingContractAddr);

  // Helper: normalize anything (string | number | bigint | array | object) -> bigint
  const normalizeToBigInt = (v: unknown): bigint => {
    if (typeof v === 'bigint') return v;
    if (typeof v === 'number') return BigInt(v); // assumes it's an integer-like number
    if (typeof v === 'string') return BigInt(v);

    if (Array.isArray(v)) {
      // Try first element if it’s a tuple return
      if (v.length === 0) throw new Error('Contract returned an empty array for stake balance');
      return normalizeToBigInt(v[0]);
    }

    if (v && typeof v === 'object') {
      // Try common keys found in staking contracts
      const o = v as Record<string, unknown>;
      const candidate =
        o.amount ?? o.value ?? o.balance ?? o.stake ?? o.tokens ?? o[0 as any];
      if (candidate !== undefined) return normalizeToBigInt(candidate);
    }

    throw new Error(
      `Unexpected stake return type from contract: ${typeof v} ${JSON.stringify(v)}`
    );
  };

  /**
   * NOTE: If your ABI uses a different method name for "staked balance of",
   * change it here (e.g., stakeOf, getStake, stakes, balances, etc.)
   */
  const walletStakeRaw: unknown = await staking.methods
    .getStakeBalanceOf(stakingWalletAddr)
    .call()
    .catch(() => {
      throw new Error(
        'The staking contract ABI does not include getStakeBalanceOf(address). Update the method name in the script.'
      );
    });

  const stakeBI = normalizeToBigInt(walletStakeRaw);

  // Fetch token decimals from ERC-20 at ORBS_TOKEN_ADDRESS
  const erc20 = new web3.eth.Contract(
    [
      {
        name: 'decimals',
        type: 'function',
        constant: true,
        inputs: [],
        outputs: [{ name: '', type: 'uint8' }],
      },
    ],
    tokenAddr
  );

  const decimalsRaw = await erc20.methods.decimals().call();
  const decimals = Number(decimalsRaw);

  const divisor = 10 ** decimals;
  const stake = Number(stakeBI) / divisor;

  return stake;

}

export async function getWalletOrbsBalance(): Promise<number> {
  const rpcUrl = requireEnv('RPC_URL');
  const tokenAddr = requireEnv('ORBS_TOKEN_ADDRESS');
  const walletAddr = requireEnv('STAKING_WALLET_ADDRESS');

  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

  // Minimal ERC20 ABI for balanceOf & decimals
  const ERC20_ABI: AbiItem[] = [
    {
      name: 'balanceOf',
      type: 'function',
      constant: true,
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
    },
    {
      name: 'decimals',
      type: 'function',
      constant: true,
      inputs: [],
      outputs: [{ name: '', type: 'uint8' }],
    },
  ];

  const token = new web3.eth.Contract(ERC20_ABI, tokenAddr);

  // Note: type as unknown and normalize – avoids TS2345
  const [decimalsRaw, balanceRaw]: [unknown, unknown] = await Promise.all([
    token.methods.decimals().call(),
    token.methods.balanceOf(walletAddr).call(),
  ]);

  const decimals = Number(decimalsRaw);
  const balanceBI = normalizeToBigInt(balanceRaw);

  return biToDecimalNumber(balanceBI, decimals);
}


// Allow running this module directly: `ts-node src/contract_parser.ts`
if (require.main === module) {
  (async () => {
    try {
      const stakingBalance = await getTeamBalanceInStaking();
      const walletBalance = await getWalletOrbsBalance();
      console.log('Team Staked Balance:', stakingBalance);
      console.log('Wallet ORBS Balance:', walletBalance);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
