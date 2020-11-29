/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import BigNumber from 'bignumber.js';
import { Model } from '../model/model';
import { OrbsEthResrouces, Topics } from './eth-helper';



const THIRTY_DAYS_IN_BLOCKS = 45000;

const VOID_ADDR = '0xffffffffffffffffffffffffffffffffffffffff';
const LONG_TERM_RESERVES = "0x384f5cf955b39b76c47a440f14c31ad39fd39d00";
const PRIVATE_SALE = "0x1bef7f8798256e033eaa42f005d2b53079b90ffe";
const TEAM_AND_FOUNDING_PARTNERS = "0xc200f98f3c088b868d80d8eb0aeb9d7ee18d604b";
const ADVISORS = "0x574d48b2ec0a5e968adb77636656672327402634";
const NON_CIRCULATING_WALLETS = [LONG_TERM_RESERVES, PRIVATE_SALE, TEAM_AND_FOUNDING_PARTNERS, ADVISORS];

export async function getPoSStatus(model:Model, resources:OrbsEthResrouces, web3:any) {
    // Token
    const totalSupply = new BigNumber(await resources.erc20Contract.methods.totalSupply().call({}, resources.blockNumber));

    const nonCirculatingWalletValues = await Promise.all(NON_CIRCULATING_WALLETS.map(address => {
        return resources.erc20Contract.methods.balanceOf(address).call({}, resources.blockNumber);
    }));

    const stakedNonCirculatingWalletValues = await Promise.all(NON_CIRCULATING_WALLETS.map(address => {
        return resources.stakingContract.methods.getStakeBalanceOf(address).call({}, resources.blockNumber);
    }))

    let totalNoncirculatingWallet = new BigNumber(0);
    for(const i of nonCirculatingWalletValues) {
        totalNoncirculatingWallet = totalNoncirculatingWallet.plus(new BigNumber(i));
    }
    let totalNoncirculatingStaked = new BigNumber(0);
    for(const i of stakedNonCirculatingWalletValues) {
        totalNoncirculatingStaked = totalNoncirculatingStaked.plus(new BigNumber(i));
    }

    const supplyInCirculation = totalSupply.minus(totalNoncirculatingWallet).minus(totalNoncirculatingStaked);

    const startBlock = await web3.eth.getBlock(resources.blockNumber - THIRTY_DAYS_IN_BLOCKS);
    const timePeriodSeconds = resources.blockTime - Number(startBlock.timestamp);

    const transferEvents = await readEvents([Topics.Transfer], resources.erc20Contract, web3, startBlock.blockNumber, resources.blockNumber, 100000);
    const dailyNumberOfTransfers = (transferEvents.length * 86400) / (timePeriodSeconds);
    let totalTransfers = new BigNumber(0);
    for (const event of transferEvents) {
        totalTransfers = totalTransfers.plus(new BigNumber(event.returnValues.value));
    }
    const dailyAmountOfTransfers = totalTransfers.times(new BigNumber(86400)).div(new BigNumber(timePeriodSeconds))

    // Staked
    const totalStaked = new BigNumber(await resources.stakingContract.methods.getTotalStakedTokens().call({}, resources.blockNumber));
    const uncapped = new BigNumber(await resources.delegationsContract.methods.uncappedDelegatedStake(VOID_ADDR).call({}, resources.blockNumber));
    const erc20Staked = new BigNumber(await resources.erc20Contract.methods.balanceOf(resources.stakingAddress).call({}, resources.blockNumber))

    const stakeEvents = await readEvents([[Topics.Staked, Topics.Restaked, Topics.Unstaked, Topics.MigratedStake]], resources.stakingContract, web3, startBlock.blockNumber, resources.blockNumber, 100000);
    const stakers: {[key:string]: BigNumber} = {};
    for (let event of stakeEvents) {
        const address = String(event.returnValues.stakeOwner).toLowerCase();
        const amount = new BigNumber(event.returnValues.totalStakedAmount);
        stakers[address] = amount;
    }

    // Rewards and fees
    const rewardRate = new BigNumber(await resources.stakingRewardsContract.methods.getCurrentStakingRewardsRatePercentMille().call({}, resources.blockNumber));
    const ggFund = new BigNumber(await resources.bootstrapRewardsContract.methods.getGeneralCommitteeAnnualBootstrap().call({}, resources.blockNumber));
    const ggFeeNow = new BigNumber(await resources.generalFeesWalletContract.methods.getOutstandingFees(resources.blockTime).call({}, resources.blockNumber));
    const ggFeeNextMonth = new BigNumber(await resources.generalFeesWalletContract.methods.getOutstandingFees(resources.blockTime + 2592000).call({}, resources.blockNumber));
    const ggFeeNextYear = new BigNumber(await resources.generalFeesWalletContract.methods.getOutstandingFees(resources.blockTime + 31536000).call({}, resources.blockNumber));
    const cgFund = new BigNumber(await resources.bootstrapRewardsContract.methods.getCertifiedCommitteeAnnualBootstrap().call({}, resources.blockNumber));
    const cgFeeNow = new BigNumber(await resources.certifiedFeesWalletContract.methods.getOutstandingFees(resources.blockTime).call({}, resources.blockNumber));
    const cgFeeNextMonth = new BigNumber(await resources.certifiedFeesWalletContract.methods.getOutstandingFees(resources.blockTime + 2592000).call({}, resources.blockNumber));
    const cgFeeNextYear = new BigNumber(await resources.certifiedFeesWalletContract.methods.getOutstandingFees(resources.blockTime + 31536000).call({}, resources.blockNumber));
    const rewardState = await resources.stakingRewardsContract.methods.getStakingRewardsState().call({}, resources.blockNumber);
    const unclaimed = new BigNumber(rewardState.unclaimedStakingRewards);

    

    model;

    return {
        PosData: {
            Header: {
                BlockNumber: resources.blockNumber,
                BlockTimestamp: resources.blockTime,
                BlockTime: new Date(resources.blockTime * 1000).toISOString(),                
            },
            TokenData: {
                Contract: resources.erc20Address,
                Decimals: "18",
                TotalSupply: totalSupply.toFixed(),
                SupplyInCirculation: supplyInCirculation.toFixed(),
                DailyActivityNumberOfTransfers: dailyNumberOfTransfers,
                DailyActivityTokenTransferred: dailyAmountOfTransfers.toFixed()
            }, 
            StakedTokenData: {
                Contract: resources.stakingAddress,
                Decimals: "18",
                StakedTokens: totalStaked.minus(uncapped).toFixed(),
                UnstakedTokens: erc20Staked.minus(totalStaked).toFixed(),
                NumberOfAllPastStakers: _.size(stakers),
                NumberOfActiveStakers: _.size(_.map(_.pickBy(stakers, (d) => {return d.isZero()}), v => v)) 
            },
            RewardsAndFeeData: {
                CurrentStakingRewardPrecentMille: rewardRate.toNumber(),
                GeneralCommitteeGuardianMonthlyBootstrapFund: ggFund.div(12).toFixed(),
                CertifiedCommitteeGuardianMonthlyBoostrapFund: cgFund.div(12).toFixed(),
                GeneralCommitteeGuardianMonthlyFee: ggFeeNextMonth.minus(ggFeeNow).toFixed(),
                CertifiedCommitteeGuardianMonthlyFee: cgFeeNextMonth.minus(cgFeeNow).toFixed(),
                GeneralCommitteeGuardianBacklogFee: ggFeeNextYear.toFixed(),
                CertifiedCommitteeGuardianBacklogFee: cgFeeNextYear.toFixed(),
                UnclaimedStakingRewards: unclaimed.toFixed(),
            }
        }, 
        SupplyStatus: {
            contract: resources.erc20Address,
            stakingContract: resources.stakingAddress,
            nonCirculatingWallets: NON_CIRCULATING_WALLETS,
            supplyInCirculation: supplyInCirculation.toFixed(),
            totalSupply: totalSupply.toFixed(),
            decimals: "18",
            block : resources.blockNumber,
            blockTimestamp: resources.blockTime,
            updatedAt : new Date(resources.blockTime * 1000).toISOString()
        }
    }


}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function readEvents(filter: (string[] | string | undefined)[], contract:any, web3:any, startBlock: number, endBlock: number, pace: number) {
    try {
        let options = {topics: filter, fromBlock: startBlock, toBlock: endBlock};
        return await contract.getPastEvents('allEvents', options);
    } catch (e) {
        if (`${e}`.includes('query returned more than')) {
            if (pace <= 10) {
                throw new Error('looking for events slowed down to 10 - fail')
            }
            console.log('\x1b[36m%s\x1b[0m', `read events slowing down to ${pace}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results:any = [];
            for(let i = startBlock; i < endBlock; i+=pace) {
                const currentEnd = i+pace > endBlock ? endBlock : i+pace;
                results.push(...await readEvents(filter, contract, web3, i, currentEnd, pace/10));
            }
            console.log('\x1b[36m%s\x1b[0m', `read events slowing down ended`);
            return results;
        } else {
            throw e;
        }
    }
}
