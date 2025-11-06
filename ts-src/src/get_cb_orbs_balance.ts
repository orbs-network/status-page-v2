import 'dotenv/config';
import { CoinbasePrimeClientWithServices } from '@coinbase-sample/prime-sdk-ts';

type Balance = { symbol?: string; amount?: string | number };

export async function getOrbsBalance(): Promise<number> {
  const portId = process.env.PRIME_PORTFOLIO_ID;
  if (!portId) throw new Error("Missing env var PRIME_PORTFOLIO_ID");

  const client = CoinbasePrimeClientWithServices.fromEnv();
  const resp = await client.balances.listPortfolioBalances({ portfolioId: portId });

  const balances: Balance[] = Array.isArray((resp as any)?.balances)
    ? (resp as any).balances
    : [];

  const orbs = balances.find(b => (b.symbol ?? '').toLowerCase() === 'orbs');
  if (!orbs) throw new Error("ORBS balance not found in Coinbase response");

  const amount =
    typeof orbs.amount === 'string'
      ? parseFloat(orbs.amount)
      : typeof orbs.amount === 'number'
      ? orbs.amount
      : NaN;

  if (!Number.isFinite(amount)) {
    throw new Error("Invalid ORBS balance value");
  }

  return amount;
}


// run file directly
(async () => {
  try {
    const v = await getOrbsBalance();
    console.log('ORBS balance:', v);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
