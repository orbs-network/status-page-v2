/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { Configuration } from '../config';
import { getCurrentClockTime, isStaleTime, timeAgoText } from '../helpers';
import { EthereumStatus, HealthLevel } from '../model/model';
import { getBlockInfo, OrbsEthResrouces, toTokenNumber } from './eth-helper';


export async function getEthereumContractsStatus(resources:OrbsEthResrouces, web3:any, config:Configuration): Promise<EthereumStatus>  {
    const stakingRewardsBalance = toTokenNumber(await resources.stakingRewardsWalletContract.methods.getBalance().call());
    const bootstrapRewardsBalance = toTokenNumber(await resources.bootstrapRewardsWalletContract.methods.getBalance().call());
    
    const currentBlock = await getBlockInfo('latest', web3);
    const events = await resources.stakingContract.getPastEvents('allEvents', {fromBlock: currentBlock.number-10000, toBlock: 'latest'});
    let lastEventTime = 0;

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
    if (lastEventTime + config.MaxTimeSinceLastEvent < getCurrentClockTime() ) {
        healthMessages.push(`Last staking/unstaking event was ${timeAgoText(lastEventTime)}. `);
        healthLevel = HealthLevel.Yellow;
    }
    if (lastEventTime + (config.MaxTimeSinceLastEvent*3) < getCurrentClockTime() ) {
        healthMessages.push(`Last staking/unstaking event was ${timeAgoText(lastEventTime)}. `);
        healthLevel = HealthLevel.Red;
    }
    if (isStaleTime(currentBlock.time, config.RootNodeStaleErrorTimeSeconds)) {
        healthMessages.push(`Ethereum connection is stale. Ethereum latest block (${currentBlock.number}) is from ${timeAgoText(currentBlock.time)}.`);
        healthLevel = HealthLevel.Red;
    }  
    if (stakingRewardsBalance < config.MinStakingBlance) {
        healthMessages.push(`Staking rewards wallet balance (${Math.floor(stakingRewardsBalance)}) is below the threshold (${config.MinStakingBlance}).`);
        healthLevel = HealthLevel.Red;
    }
    if (bootstrapRewardsBalance < config.MinBootstrapBlance) {
        healthMessages.push(`Bootstrap rewards wallet balance (${Math.floor(bootstrapRewardsBalance)}) is below the threshold (${config.MinBootstrapBlance}).`);
        healthLevel = HealthLevel.Red;
    }
    const healthTooltip = healthMessages.join("\n") || "OK";
    const healthMessage = `PoS Contracts status: ${healthMessages.length == 0 ? 'OK' : 'Issues Detected'}`;

    return {
        StakingRewardsBalance: stakingRewardsBalance,
        BootstrapRewardsBalance: bootstrapRewardsBalance,
        LastStakeUnstakeTime: lastEventTime,
        Status: healthLevel,
        StatusMsg: healthMessage,
        StatusToolTip: healthTooltip
    };
}

export function generateErrorEthereumContractsStatus(msg:string):EthereumStatus {
    return {
        StakingRewardsBalance: 0,
        BootstrapRewardsBalance: 0,
        LastStakeUnstakeTime: 0,
        Status: HealthLevel.Red,
        StatusMsg: `PoS Contracts status: Ethereum Error Detected`,
        StatusToolTip: msg,
    }
}