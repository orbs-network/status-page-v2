from get_cb_orbs_balance import main as get_cb_orbs_balance
from contract_parser import main as get_team_balance_in_staking


"""
This script calculates the non-circulating supply of ORBS tokens by summing
the balance held in Coinbase and the total supply held by the team in staking.

"""
def cal_noncirculating_supply():
    coinbase_balance = get_cb_orbs_balance()
    total_supply = get_team_balance_in_staking()
    non_circulating_supply = coinbase_balance + total_supply
    return non_circulating_supply


if __name__ == "__main__":
    print(cal_noncirculating_supply())