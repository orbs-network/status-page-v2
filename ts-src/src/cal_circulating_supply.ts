import { getOrbsBalance } from './get_cb_orbs_balance';
import { getTeamBalanceInStaking, getWalletOrbsBalance} from './contract_parser';


/**
 * Calculates the non-circulating supply of ORBS tokens by summing:
 *  - The balance held in Coinbase Prime (portfolio ORBS balance)
 *  - The total supply held by the team in staking (staking contract + staking wallet)
 */

export async function calcNoncirculatingSupply(): Promise<number> {
  const [coinbaseBalance, teamStakingTotal, stakingWalletBalance] = await Promise.all([
    getOrbsBalance(),
    getTeamBalanceInStaking(),
    getWalletOrbsBalance()
  ]);
  const nonCirculating = coinbaseBalance + teamStakingTotal + stakingWalletBalance;
  return nonCirculating;
}

// Allow running this module directly: `ts-node cal_circulating_supply.ts`
if (require.main === module) {
  (async () => {
    try {
      const v = await calcNoncirculatingSupply();
      console.log(v);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}