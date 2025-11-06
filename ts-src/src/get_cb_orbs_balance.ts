import 'dotenv/config';
import { CoinbasePrimeClientWithServices } from '@coinbase-sample/prime-sdk-ts';

async function getOrbsBalance(): Promise<number | undefined> {
  // Load the portfolio ID from environment
  const portId = process.env.PRIME_PORTFOLIO_ID;
  if (!portId) {
    throw new Error("Missing environment variable: PRIME_PORTFOLIO_ID");
  }

  // Initialize the Coinbase Prime client using credentials from the environment
  const client = CoinbasePrimeClientWithServices.fromEnv("PRIME_CREDENTIALS");

  // Fetch portfolio balances
  const resp = await client.balances.listPortfolioBalances({ portfolioId: portId });

  // Find ORBS balance
  for (const b of resp.balances) {
    if (b.symbol?.toLowerCase() === "orbs") {
      return parseFloat(b.amount);
    }
  }

  // Return undefined if ORBS not found
  return undefined;
}

// Example usage
(async () => {
  try {
    const balance = await getOrbsBalance();
    console.log("ORBS balance:", balance);
  } catch (err) {
    console.error("Error fetching balance:", err);
  }
})();
