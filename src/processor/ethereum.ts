/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Configuration } from '../config';
import { getCurrentClockTime, isStaleTime, timeAgoText } from '../helpers';
import { EthereumStatus, HealthLevel } from '../model/model';

const protocolWalletAbi = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "client", "type": "address" } ], "name": "ClientSet", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "addr", "type": "address" } ], "name": "EmergencyWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "added", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "total", "type": "uint256" } ], "name": "FundsAddedToPool", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "maxAnnualRate", "type": "uint256" } ], "name": "MaxAnnualRateSet", "type": "event" }, { "anonymous": false, "inputs": [], "name": "OutstandingTokensReset", "type": "event" }, { "inputs": [], "name": "getToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "balance", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "topUp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "annual_rate", "type": "uint256" } ], "name": "setMaxAnnualRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "client", "type": "address" } ], "name": "setClient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMaxAnnualRate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "resetOutstandingTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
const stakeAbi = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "stakeOwner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalStakedAmount", "type": "uint256" } ], "name": "MigratedStake", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "stakeOwner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalStakedAmount", "type": "uint256" } ], "name": "Restaked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "stakeOwner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalStakedAmount", "type": "uint256" } ], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "stakeOwner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalStakedAmount", "type": "uint256" } ], "name": "Unstaked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "stakeOwner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalStakedAmount", "type": "uint256" } ], "name": "Withdrew", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "restake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_totalAmount", "type": "uint256" }, { "internalType": "address[]", "name": "_stakeOwners", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amounts", "type": "uint256[]" } ], "name": "distributeRewards", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_stakeOwner", "type": "address" } ], "name": "getStakeBalanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalStakedTokens", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_stakeOwner", "type": "address" } ], "name": "getUnstakeStatus", "outputs": [ { "internalType": "uint256", "name": "cooldownAmount", "type": "uint256" }, { "internalType": "uint256", "name": "cooldownEndTime", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract IMigratableStakingContract", "name": "_newStakingContract", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "migrateStakedTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];

export async function getEthereumStatus(nodeData:any, config: Configuration): Promise<EthereumStatus> {
    const web3 = getWeb3(config.EthereumEndpoint);
    
    const { stakingContract, stakingRewardsContract, bootstrapRewardsContract} = getContracts(nodeData, config, web3);
 
    const stakingRewardsBalance = toTokenNumber(await stakingRewardsContract.methods.getBalance().call());
    const bootstrapRewardsBalance = toTokenNumber(await bootstrapRewardsContract.methods.getBalance().call());
    
    const block = await web3.eth.getBlock('latest');
    const events = await stakingContract.getPastEvents('allEvents', {fromBlock: block.number-10000, toBlock: 'latest'});
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
    if (isStaleTime(block.timestamp, config.RootNodeStaleErrorTimeSeconds)) {
        healthMessages.push(`Ethereum connection is stale. Ethereum latest block (${block.number}) is from ${timeAgoText(block.timestamp)}.`);
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

export function generateErrorEthereumStatus(msg:string):EthereumStatus {
    return {
        StakingRewardsBalance: 0,
        BootstrapRewardsBalance: 0,
        LastStakeUnstakeTime: 0,
        Status: HealthLevel.Red,
        StatusMsg: `PoS Contracts status: Ethereum Error Detected`,
        StatusToolTip: msg,
    }
}

function getWeb3(ethereumEndpoint: string) {
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumEndpoint, {keepAlive: true,}));
    web3.eth.transactionBlockTimeout = 0; // to stop web3 from polling pending tx
    web3.eth.transactionPollingTimeout = 0; // to stop web3 from polling pending tx
    web3.eth.transactionConfirmationBlocks = 1; // to stop web3 from polling pending tx
    return web3;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContracts(nodeData:any, config:Configuration, web3:any) {
    let stakingAddress = '', stakingRewardsAddress = '', bootstrapRewardsAddress = '';
    if (_.isObject(nodeData?.Payload?.CurrentContractAddress)) { 
        stakingAddress = String(nodeData.Payload.CurrentContractAddress["staking"]).toLowerCase();
        stakingRewardsAddress = String(nodeData.Payload.CurrentContractAddress["stakingRewardsWallet"]).toLowerCase();
        bootstrapRewardsAddress = String(nodeData.Payload.CurrentContractAddress["bootstrapRewardsWallet"]).toLowerCase();
    }

    console.log(config.StakingAddress)
    if (stakingAddress.length === 0 || config.StakingAddress.length !== 0) {
        stakingAddress = config.StakingAddress;
    }
    if (stakingRewardsAddress.length === 0 || config.StakingRewardsAddress.length !== 0) {
        stakingRewardsAddress = config.StakingRewardsAddress;
    }
    if (bootstrapRewardsAddress.length === 0 || config.BootstrapRewardsAddress.length !== 0) {
        bootstrapRewardsAddress = config.BootstrapRewardsAddress;
    }

    return  {
        stakingContract: getContract(web3, stakeAbi, stakingAddress),
        stakingRewardsContract: getContract(web3, protocolWalletAbi, stakingRewardsAddress),
        bootstrapRewardsContract: getContract(web3, protocolWalletAbi, bootstrapRewardsAddress),
    }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contractCache: {[key: string]: any;} = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContract(web3:any, abi:any, address: string) {
    if (!(address in contractCache)) {
        contractCache[address] = new web3.eth.Contract(abi, address);
    }
    return contractCache[address];
}

function toTokenNumber(n: string):number {
    return new BigNumber(n).dividedBy("1e18").toNumber();
}