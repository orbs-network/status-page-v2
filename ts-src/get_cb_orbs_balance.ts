import 'dotenv/config';
import axios from 'axios';

/**
 * Script to get the balance of ORBS tokens in Orbs LTD Coinbase Prime portfolio.
 * 
 * This TypeScript version assumes access to Coinbase Prime REST APIs.
 * Provide the following env vars:
 *   - PRIME_API_BASE_URL  e.g., https://api.prime.coinbase.com   (placeholder)
 *   - PRIME_API_TOKEN     Bearer token with read permissions (placeholder)
 *   - PRIME_PORTFOLIO_ID  Portfolio ID to query balances for
 * 
 * NOTE: The original Python used `prime_sdk` which isn't mirrored here.
 * Replace the placeholder REST call below with your actual Prime API client if available.
 */

export async function getCbOrbsBalance(): Promise<number> {
  const baseUrl = process.env.PRIME_API_BASE_URL;
  const token = process.env.PRIME_API_TOKEN;
  const portfolioId = process.env.PRIME_PORTFOLIO_ID;

  if (!baseUrl || !token || !portfolioId) {
    throw new Error("Missing env vars PRIME_API_BASE_URL, PRIME_API_TOKEN, or PRIME_PORTFOLIO_ID");
  }

  // TODO: Replace with the official Coinbase Prime endpoint and response typing.
  const url = `${baseUrl.replace(/\/$/, '')}/portfolios/${portfolioId}/balances`;

  const resp = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // params: { /* If the API needs pagination / filters add here */ }
  });

  // Heuristic parsing: look for an entry where symbol === 'orbs'
  const balances: Array<{ symbol: string; amount: string | number }> =
    resp.data?.balances ?? resp.data ?? [];

  const found = balances.find(b => (b.symbol || '').toLowerCase() === 'orbs');
  if (!found) {
    throw new Error("Could not find ORBS balance in the Coinbase Prime response.");
  }

  const amount = typeof found.amount === 'string' ? parseFloat(found.amount) : Number(found.amount);
  if (!Number.isFinite(amount)) {
    throw new Error("ORBS amount is not a finite number.");
  }
  return amount;
}

// Allow running this module directly: `ts-node get_cb_orbs_balance.ts`
if (require.main === module) {
  (async () => {
    try {
      const v = await getCbOrbsBalance();
      console.log(v);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}