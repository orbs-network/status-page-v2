/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import BigNumber from 'bignumber.js';
import { aggregate } from '@makerdao/multicall';
import { Configuration, Contracts } from '../config';
import { getCurrentClockTime, isStaleTime, timeAgoText } from '../helpers';
import { EthereumStatus, HealthLevel } from '../model/model';
import {BlockTimestamp, getChainName, multicallToBlockInfo, OrbsEthResrouces} from './eth-helper';
import { DelegationsService, StakingService } from '@orbs-network/contracts-js';

function bigToNumber(n: BigNumber):number {
    return n.dividedBy("1e18").toNumber();
}

async function readTotalStakeByChain(web3: any, contracts: Contracts) {
    const { staking, delegations } = contracts
    const totalStake = await new StakingService(web3, staking).readTotalStakedInFullOrbs();
    const totalUncappedStakedOrbs = await new DelegationsService(
        web3,
        delegations,
    ).readUncappedDelegatedStakeInFullOrbs();
    return totalStake - totalUncappedStakedOrbs;
}

export async function getEthereumContractsStatus(numOfCertifiedGuardiansInCommittee:number, resources:OrbsEthResrouces, web3:any, config:Configuration, totalWeight: number, rewardsRate: number): Promise<EthereumStatus>  {
    const { block, data } = await read(resources, web3);

    const events = await resources.stakingContract.getPastEvents('allEvents', {fromBlock: block.number-10000, toBlock: 'latest'});
    let lastEventTime = 0;
    const chainName = await getChainName(web3);

    events.sort((n1:any, n2:any) => n2.blockNumber - n1.blockNumber); // sort desc
    for (const event of events) {
        if (event.event === 'Staked' || event.event === 'Unstaked') {
            const eventBlock = await web3.eth.getBlock(event.blockNumber);
            lastEventTime = Number(eventBlock.timestamp);
            break;
        }
    }

    let healthLevel = HealthLevel.Green;
    const healthMessages = [];
    if (lastEventTime) {
        const MaxTimeSinceLastEvent = chainName === "MATIC" ? config.MaxTimeSinceLastEventMatic : config.MaxTimeSinceLastEvent
        if (lastEventTime + MaxTimeSinceLastEvent < getCurrentClockTime()) {
            healthMessages.push(`Last staking/unstaking event was ${timeAgoText(getCurrentClockTime() - MaxTimeSinceLastEvent)}. `);
            healthLevel = HealthLevel.Yellow;
        }
    }
    else console.error(`lastEventTime is ${lastEventTime}. Ignoring`);

    if (isStaleTime(block.time, config.RootNodeStaleErrorTimeSeconds)) {
        healthMessages.push(`Ethereum connection is stale. Ethereum latest block (${block.number}) is from ${timeAgoText(block.time)}.`);
        healthLevel = HealthLevel.Yellow;
    }
    const stakingRewardsTwoWeeks = rewardsRate * totalWeight * 14 / 365;// 80000000*14/365;
    const stakingRewardsBalance = bigToNumber(data[StakeRewardWallet]);
    const stakingRewardsAllocated = bigToNumber(data[StakeRewardAllocated]);
    if ( (stakingRewardsBalance-stakingRewardsAllocated) < stakingRewardsTwoWeeks) {
        healthMessages.push(`Staking rewards: ORBS wallet balance minus allocated (${stakingRewardsBalance.toLocaleString()} - ${stakingRewardsAllocated.toLocaleString()} = ${(stakingRewardsBalance-stakingRewardsAllocated).toLocaleString()}) is below the 2 week threshold (${stakingRewardsTwoWeeks.toLocaleString()}). all numbers are in ORBS.`);
        healthLevel = HealthLevel.Yellow;
    }
    const bootstrapRewardsTwoWeeks = 3000*numOfCertifiedGuardiansInCommittee*14/365;
    const bootstrapRewardsWallet = bigToNumber(data[BootstrapRewardWallet]);
    const bootstrapAllocatedToken = bigToNumber(new BigNumber(getCurrentClockTime()).minus(data[BootstrapRewardLastWithdraw])
        .multipliedBy(numOfCertifiedGuardiansInCommittee).multipliedBy(data[BootstrapRewardAnnual]).div(31536000 /*year in sec*/));

    if ((bootstrapRewardsWallet - bootstrapAllocatedToken) < bootstrapRewardsTwoWeeks) {
        healthMessages.push(`Bootstrap rewards: DAI wallet balance (${bootstrapRewardsWallet.toFixed(3)}) minus allocated (${bootstrapAllocatedToken.toFixed(3)}) is below the 2 week threshold (${bootstrapRewardsTwoWeeks.toFixed(3)}) all numbers are in DAI.`);
        healthLevel = HealthLevel.Yellow;
    }
    const healthTooltip = healthMessages.join("\n") || "OK";
    const totalStaked = await readTotalStakeByChain(web3, config.NetworksContracts[chainName])
    let healthMessage = `${chainName} Contracts status: ${healthMessages.length == 0 ? 'OK' : 'Issues Detected'}`;
    healthMessage += `\nTotal Staked: ${totalStaked.toLocaleString("en",{maximumFractionDigits: 0})}`;

    return {
        StakingRewardsBalance: stakingRewardsBalance,
        StakingRewardsAllocated: stakingRewardsAllocated,
        StakingRewardsTwoWeeks: stakingRewardsTwoWeeks,
        BootstrapRewardsBalance: bootstrapRewardsWallet,
        BootstrapRewardsAllocated: bootstrapAllocatedToken,
        BootstrapRewardsTwoWeeks: bootstrapRewardsTwoWeeks,
        LastStakeUnstakeTime: lastEventTime,
        Status: healthLevel,
        StatusMsg: healthMessage,
        StatusToolTip: healthTooltip
    };
}

const StakeRewardWallet = 'StakeRewardWallet';
const StakeRewardAllocated = 'StakeRewardAllocated';
const BootstrapRewardWallet = 'BootstrapRewardWallet';
const BootstrapRewardAnnual = 'BootstrapRewardAnnual';
const BootstrapRewardLastWithdraw = 'BootstrapRewardLastWithdraw';
// Function depends on version 0.11.0 of makderdao/multicall only on 'latest' block
const MulticallContractAddress = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
const MaticMulticallContractAddress = '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507'
import { CHAIN_ID} from './eth-helper';

export async function read(resources:OrbsEthResrouces, web3:any) {
	let config;
	if (await web3.eth.getChainId() === CHAIN_ID.ETHEREUM)
    	config = { web3, multicallAddress: MulticallContractAddress};
	else if (await web3.eth.getChainId() === CHAIN_ID.MATIC)
    	config = { web3, multicallAddress: MaticMulticallContractAddress};

    const calls: any[] = [
        {
            target: resources.stakingRewardsWalletAddress,
            call: ['getBalance()(uint256)'],
            returns: [[StakeRewardWallet, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.stakingRewardsAddress,
            call: ['getStakingRewardsWalletAllocatedTokens()(uint256)'],
            returns: [[StakeRewardAllocated, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.bootstrapRewardsWalletAddress,
            call: ['getBalance()(uint256)'],
            returns: [[BootstrapRewardWallet, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.bootstrapRewardsWalletAddress,
            call: ['lastWithdrawal()(uint256)'],
            returns: [[BootstrapRewardLastWithdraw, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            target: resources.bootstrapRewardsAddress,
            call: ['getCertifiedCommitteeAnnualBootstrap()(uint256)'],
            returns: [[BootstrapRewardAnnual, (v: BigNumber.Value) => new BigNumber(v)]]
        },
        {
            call: ['getCurrentBlockTimestamp()(uint256)'],
            returns: [[BlockTimestamp]]
        }
    ];

    const r = await aggregate(calls, config);
    return { block: multicallToBlockInfo(r), data: r.results.transformed};
}

export function generateErrorEthereumContractsStatus(msg:string):EthereumStatus {
    return {
        Status: HealthLevel.Yellow,
        StatusMsg: `PoS Contracts status: Ethereum Error Detected`,
        StatusToolTip: msg,
    }
}
