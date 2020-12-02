/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import BigNumber from 'bignumber.js';
// @ts-ignore
import { aggregate } from '@makerdao/multicall';
import { Model } from '../model/model';
import { FirstPoSv2BlockNumber, FirstRewardsBlockNumber, getBlockInfo, OrbsEthResrouces, Topics } from './eth-helper';

const THIRTY_DAYS_IN_BLOCKS = 45000;

const VOID_ADDR = '0xffffffffffffffffffffffffffffffffffffffff';
const LONG_TERM_RESERVES = "0x384f5cf955b39b76c47a440f14c31ad39fd39d00";
const PRIVATE_SALE = "0x1bef7f8798256e033eaa42f005d2b53079b90ffe";
const TEAM_AND_FOUNDING_PARTNERS = "0xc200f98f3c088b868d80d8eb0aeb9d7ee18d604b";
const ADVISORS = "0x574d48b2ec0a5e968adb77636656672327402634";
const NON_CIRCULATING_WALLETS = [LONG_TERM_RESERVES, PRIVATE_SALE, TEAM_AND_FOUNDING_PARTNERS, ADVISORS];

export async function getPoSStatus(model:Model, resources:OrbsEthResrouces, web3:any) {
    const {blockNumber, data } = await read(resources, web3);
    const currentBlock = await getBlockInfo(blockNumber - 1, web3); // avoid jitter

    // Token
    const supplyInCirculation = data[Erc20TotalSupply]
        .minus(data[Erc20LongTerm]).minus(data[Erc20PrivateSale]).minus(data[Erc20TeamAndFounding]).minus(data[Erc20Advisors])
        .minus(data[StakingLongTerm]).minus(data[StakingPrivateSale]).minus(data[StakingTeamAndFounding]).minus(data[StakingAdvisors]);

    const startBlock = await getBlockInfo(blockNumber - THIRTY_DAYS_IN_BLOCKS, web3);
    const timePeriodSeconds = currentBlock.time - startBlock.time;

    const transferEvents = await readEvents([Topics.Transfer], resources.erc20Contract, web3, startBlock.number, currentBlock.number, 100000);
    const dailyNumberOfTransfers = (transferEvents.length * 86400) / (timePeriodSeconds);
    let totalTransfers = new BigNumber(0);
    for (const event of transferEvents) {
        totalTransfers = totalTransfers.plus(new BigNumber(event.returnValues.value));
    }
    const dailyAmountOfTransfers = totalTransfers.times(new BigNumber(86400)).dividedToIntegerBy(new BigNumber(timePeriodSeconds))

    // Staked
    const stakeEvents = await readEvents([[Topics.Staked, Topics.Restaked, Topics.Unstaked, Topics.MigratedStake]], resources.stakingContract, web3, FirstPoSv2BlockNumber, currentBlock.number, 100000);
    const stakers: {[key:string]: BigNumber} = {};
    for (const event of stakeEvents) {
        const address = String(event.returnValues.stakeOwner).toLowerCase();
        const amount = new BigNumber(event.returnValues.totalStakedAmount);
        stakers[address] = amount;
    }

    // Rewards
    const rewardsAllocEvents = await readEvents([[Topics.StakingRewardsAllocated]], resources.stakingRewardsContract, web3, FirstRewardsBlockNumber, currentBlock.number, 100000);
    let totalAllocatedRewards = new BigNumber(0);
    for (const event of rewardsAllocEvents) {
        totalAllocatedRewards = totalAllocatedRewards.plus(new BigNumber(event.returnValues.allocatedRewards));
    }

    // committee
    const committeeAddresses:string[] = [];
    const committeeWeights:number[] = [];
    const committeeCerts:boolean[] = [];
    const committeeOrbsAddresses:string[] = [];
    const committeeIps:string[] = [];
    let totalWeight = 0;
    let totalCertWeight = 0;
    let nCert = 0;
    let nCommittee = _.size(model.CommitteeNodes);
    _.map(model.CommitteeNodes, guardian => {
        committeeAddresses.push('0x' + guardian.EthAddress);
        committeeWeights.push(guardian.EffectiveStake);
        committeeCerts.push(guardian.IsCertified);
        committeeOrbsAddresses.push('0x' + guardian.OrbsAddress);
        committeeIps.push(guardian.Ip);
        totalWeight = totalWeight + guardian.EffectiveStake;
        if (guardian.IsCertified) {
            totalCertWeight = totalCertWeight + guardian.EffectiveStake;
            nCert++;
        }
    });
    const standbyAddresses = _.map(model.StandByNodes, standByGuardian => '0x' + standByGuardian.EthAddress)
    const allAddresses = _.map(model.AllRegisteredNodes, guardian => '0x' + guardian.EthAddress)

    return {
        PosData: {
            Header: {
                BlockNumber: currentBlock.number,
                BlockTimestamp: currentBlock.time,
                BlockTime: new Date(currentBlock.time * 1000).toISOString(),                
            },
            TokenData: {
                Contract: resources.erc20Address,
                Decimals: "18",
                TotalSupply: data[Erc20TotalSupply].toFixed(),
                SupplyInCirculation: supplyInCirculation.toFixed(),
                DailyActivityNumberOfTransfers: dailyNumberOfTransfers.toFixed(2),
                DailyActivityTokenTransferred: dailyAmountOfTransfers.toFixed()
            }, 
            StakedTokenData: {
                Contract: resources.stakingAddress,
                Decimals: "18",
                StakedTokens: data[TotalStaked].minus(data[UncappedStaked]).toFixed(),
                UnstakedTokens: data[Erc20Staked].minus(data[TotalStaked]).toFixed(),
                NumberOfAllPastStakers: _.size(stakers),
                NumberOfActiveStakers: _.size(_.map(_.pickBy(stakers, (d) => {return !d.isZero()}), v => v)) 
            },
            RewardsAndFeeData: {
                CurrentStakingRewardPrecentMille: data[StakeingRewardRate].toNumber(),
                GeneralCommitteeGuardianMonthlyBootstrapFund: data[GenGuardFund].div(12).toFixed(),
                CertifiedCommitteeGuardianMonthlyBoostrapFund: data[CertGuardFund].div(12).toFixed(),
                GeneralCommitteeGuardianMonthlyFee: (data[GenGuardFeeNextMonth].minus(data[GenGuardFeeNow])).dividedToIntegerBy(nCommittee).toFixed(),
                CertifiedCommitteeGuardianMonthlyFee: (data[CertGuardFeeNextMonth].minus(data[CertGuardFeeNow])).dividedToIntegerBy(nCert).toFixed(),
                GeneralCommitteeGuardianBacklogFee: data[GenGuardFeeNextYear].dividedToIntegerBy(nCommittee).toFixed(),
                CertifiedCommitteeGuardianBacklogFee: data[CertGuardFeeNextYear].dividedToIntegerBy(nCert).toFixed(),
                UnclaimedStakingRewards: data[StakeingRewardUnclaimed].toFixed(),
                AwardedStakingRewards: totalAllocatedRewards.toFixed(),
            },
            CommitteeData: {
                CommitteeMembersData: {
                  Committee: committeeAddresses,
                  Weights: committeeWeights,
                  Certification: committeeCerts,
                  OrbsAddresses: committeeOrbsAddresses,
                  Ips: committeeIps,
                },
                CommitteeSize: _.size(model.CommitteeNodes),
                CertifiedComitteeSize: nCert,
                TotalCommitteeWeight: totalWeight,
                CertifiedCommitteeWeight: totalCertWeight,
                StandByAddresses: standbyAddresses,
                AllRegisteredAddresses: allAddresses
            },
            GeneralData: {
                TotalDelegatedStake: data[DelegationStakeTotal].toFixed(),
            }
        }, 
        SupplyStatus: {
            contract: resources.erc20Address,
            stakingContract: resources.stakingAddress,
            nonCirculatingWallets: NON_CIRCULATING_WALLETS,
            supplyInCirculation: supplyInCirculation.toFixed(),
            totalSupply: data[Erc20TotalSupply].toFixed(),
            decimals: "18",
            block : currentBlock.number,
            blockTimestamp: currentBlock.time,
            updatedAt : new Date(currentBlock.time * 1000).toISOString()
        }
    }
}

const Erc20TotalSupply = 'Erc20TotalSupply';
const Erc20LongTerm = 'Erc20LongTerm';
const Erc20PrivateSale = 'Erc20PrivateSale';
const Erc20TeamAndFounding = 'Erc20TeamAndFounding';
const Erc20Advisors = 'Erc20Advisors';
const StakingLongTerm = 'StakingLongTerm';
const StakingPrivateSale = 'StakingPrivateSale';
const StakingTeamAndFounding = 'StakingTeamAndFounding';
const StakingAdvisors = 'StakingAdvisors';
const TotalStaked = 'TotalStaked';
const UncappedStaked = 'UncappedStaked';
const Erc20Staked = 'Erc20Staked';
const StakeingRewardRate = 'StakeingRewardRate';
const GenGuardFund = 'GenGuardFund';
const GenGuardFeeNow = 'GenGuardFeeNow';
const GenGuardFeeNextMonth = 'GenGuardFeeNextMonth';
const GenGuardFeeNextYear = 'GenGuardFeeNextYear';
const CertGuardFund = 'CertGuardFund';
const CertGuardFeeNow = 'CertGuardFeeNow';
const CertGuardFeeNextMonth = 'CertGuardFeeNextMonth';
const CertGuardFeeNextYear = 'CertGuardFeeNextYear';
const StakeingRewardUnclaimed = 'StakeingRewardUnclaimed';
const StakeingRewardPerWeight = 'StakeingRewardPerWeight';
const DelegationStakeTotal = 'DelegationStakeTotal';

// Function depends on version 0.11.0 of makderdao/multicall only on 'latest' block
const MulticallContractAddress = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
export async function read(resources:OrbsEthResrouces, web3:any) {
    const config = { web3, multicallAddress: MulticallContractAddress};

    const nowTime = Math.floor(Date.now() / 1000) + 13; // time component needs to be "not in past"

    const calls: any[] = [
        {
            target: resources.erc20Address, 
            call: ['totalSupply()(uint256)'],
            returns: [[Erc20TotalSupply, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.erc20Address, 
            call: ['balanceOf(address)(uint256)', LONG_TERM_RESERVES],
            returns: [[Erc20LongTerm, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.erc20Address, 
            call: ['balanceOf(address)(uint256)', PRIVATE_SALE],
            returns: [[Erc20PrivateSale, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.erc20Address, 
            call: ['balanceOf(address)(uint256)', TEAM_AND_FOUNDING_PARTNERS],
            returns: [[Erc20TeamAndFounding, (v: BigNumber.Value) => new BigNumber(v)]]
        },        {
            target: resources.erc20Address, 
            call: ['balanceOf(address)(uint256)', ADVISORS],
            returns: [[Erc20Advisors, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingAddress, 
            call: ['getStakeBalanceOf(address)(uint256)', LONG_TERM_RESERVES],
            returns: [[StakingLongTerm, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingAddress, 
            call: ['getStakeBalanceOf(address)(uint256)', PRIVATE_SALE],
            returns: [[StakingPrivateSale, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingAddress, 
            call: ['getStakeBalanceOf(address)(uint256)', TEAM_AND_FOUNDING_PARTNERS],
            returns: [[StakingTeamAndFounding, (v: BigNumber.Value) => new BigNumber(v)]]
        },        {
            target: resources.stakingAddress, 
            call: ['getStakeBalanceOf(address)(uint256)', ADVISORS],
            returns: [[StakingAdvisors, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingAddress, 
            call: ['getTotalStakedTokens()(uint256)'],
            returns: [[TotalStaked, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.delegationsAddress, 
            call: ['uncappedDelegatedStake(address)(uint256)', VOID_ADDR],
            returns: [[UncappedStaked, (v: BigNumber.Value) => new BigNumber(v)]]
        },        {
            target: resources.erc20Address, 
            call: ['balanceOf(address)(uint256)', resources.stakingAddress],
            returns: [[Erc20Staked, (v: BigNumber.Value) => new BigNumber(v)]]
        },        {
            target: resources.stakingRewardsAddress, 
            call: ['getCurrentStakingRewardsRatePercentMille()(uint256)'],
            returns: [[StakeingRewardRate, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.bootstrapRewardsAddress, 
            call: ['getGeneralCommitteeAnnualBootstrap()(uint256)'],
            returns: [[GenGuardFund, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.generalFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime],
            returns: [[GenGuardFeeNow, (v: BigNumber.Value) => new BigNumber(v)]]
        },        
        {
            target: resources.generalFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime + 2592000],
            returns: [[GenGuardFeeNextMonth, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.generalFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime + 31536000],
            returns: [[GenGuardFeeNextYear, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.bootstrapRewardsAddress, 
            call: ['getCertifiedCommitteeAnnualBootstrap()(uint256)'],
            returns: [[CertGuardFund, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.certifiedFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime],
            returns: [[CertGuardFeeNow, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.certifiedFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime + 2592000],
            returns: [[CertGuardFeeNextMonth, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.certifiedFeesWalletAddress, 
            call: ['getOutstandingFees(uint256)(uint256)', nowTime + 31536000],
            returns: [[CertGuardFeeNextYear, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingRewardsAddress, 
            call: ['getStakingRewardsState()(uint96,uint96)'],
            returns: [[StakeingRewardPerWeight, (v: BigNumber.Value) => new BigNumber(v)],[StakeingRewardUnclaimed, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.delegationsAddress, 
            call: ['getTotalDelegatedStake()(uint256)'],
            returns: [[DelegationStakeTotal, (v: BigNumber.Value) => new BigNumber(v)]]
        }
    ];

    const r = await aggregate(calls, config);
    return { blockNumber: r.results.blockNumber, data: r.results.transformed};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readEvents(filter: (string[] | string | undefined)[], contract:any, web3:any, startBlock: number, endBlock: number, pace: number) {
    try {
        let options = {topics: filter, fromBlock: startBlock, toBlock: endBlock};
        return await contract.getPastEvents('allEvents', options);
    } catch (e) {
        if (`${e}`.includes('query returned more than')) {
            if (pace <= 10) {
                throw new Error('looking for events slowed down to 10 - fail')
            }
            //console.log('\x1b[36m%s\x1b[0m', `read events slowing down to ${pace}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results:any = [];
            for(let i = startBlock; i < endBlock; i+=pace) {
                const currentEnd = i+pace > endBlock ? endBlock : i+pace;
                results.push(...await readEvents(filter, contract, web3, i, currentEnd, pace/10));
            }
            //console.log('\x1b[36m%s\x1b[0m', `read events slowing down ended`);
            return results;
        } else {
            throw e;
        }
    }
}
