from dotenv import load_dotenv
import os

from prime_sdk.client_services import PrimeServicesClient
from prime_sdk.services.portfolios import ListPortfoliosRequest
from prime_sdk.services.balances import ListPortfolioBalancesRequest

load_dotenv()

"""
Script to get the balance of ORBS tokens in Orbs LTD Coinbase Prime portfolio.
"""

def main():
    # Build the unified services client from env (uses PRIME_CREDENTIALS)
    client = PrimeServicesClient.from_env("PRIME_CREDENTIALS")

    # 1) Get a portfolio id (use PRIME_PORTFOLIO_ID if you already exported it)
    portfolio_id = os.getenv("PRIME_PORTFOLIO_ID")

    # 2) Fetch balances for that portfolio
    req = ListPortfolioBalancesRequest(portfolio_id=portfolio_id)
    resp = client.balances.list_portfolio_balances(req)

    for b in resp.balances:
        if b.symbol == "orbs":
            return float(b.amount)
