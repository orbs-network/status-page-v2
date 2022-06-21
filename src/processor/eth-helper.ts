/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import Web3 from 'web3';
import { getAbiByContractRegistryKey } from '@orbs-network/orbs-ethereum-contracts-v2';
import { sleep } from '../helpers';

const stakeAbi = [{"inputs":[{"internalType":"uint256","name":"_cooldownPeriodInSec","type":"uint256"},{"internalType":"address","name":"_migrationManager","type":"address"},{"internalType":"address","name":"_emergencyManager","type":"address"},{"internalType":"contract IERC20","name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"AcceptedMigration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"emergencyManager","type":"address"}],"name":"EmergencyManagerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"MigratedStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IMigratableStakingContract","name":"stakingContract","type":"address"}],"name":"MigrationDestinationAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IMigratableStakingContract","name":"stakingContract","type":"address"}],"name":"MigrationDestinationRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"migrationManager","type":"address"}],"name":"MigrationManagerUpdated","type":"event"},{"anonymous":false,"inputs":[],"name":"ReleasedAllStakes","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"Restaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IStakeChangeNotifier","name":"notifier","type":"address"}],"name":"StakeChangeNotifierUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[],"name":"StoppedAcceptingNewStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalStakedAmount","type":"uint256"}],"name":"Withdrew","type":"event"},{"constant":true,"inputs":[],"name":"MAX_APPROVED_STAKING_CONTRACTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_stakeOwner","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"acceptMigration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"acceptingNewStakes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IMigratableStakingContract","name":"_newStakingContract","type":"address"}],"name":"addMigrationDestination","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"approvedStakingContracts","outputs":[{"internalType":"contract IMigratableStakingContract","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cooldownPeriodInSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_totalAmount","type":"uint256"},{"internalType":"address[]","name":"_stakeOwners","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"distributeRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"emergencyManager","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_stakeOwner","type":"address"}],"name":"getStakeBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalStakedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_stakeOwner","type":"address"}],"name":"getUnstakeStatus","outputs":[{"internalType":"uint256","name":"cooldownAmount","type":"uint256"},{"internalType":"uint256","name":"cooldownEndTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract IMigratableStakingContract","name":"_stakingContract","type":"address"}],"name":"isApprovedStakingContract","outputs":[{"internalType":"bool","name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IMigratableStakingContract","name":"_newStakingContract","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"migrateStakedTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"migrationManager","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"notifier","outputs":[{"internalType":"contract IStakeChangeNotifier","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"releaseAllStakes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"releasingAllStakes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IMigratableStakingContract","name":"_stakingContract","type":"address"}],"name":"removeMigrationDestination","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newEmergencyManager","type":"address"}],"name":"setEmergencyManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newMigrationManager","type":"address"}],"name":"setMigrationManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IStakeChangeNotifier","name":"_newNotifier","type":"address"}],"name":"setStakeChangeNotifier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stopAcceptingNewStakes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_stakeOwners","type":"address[]"}],"name":"withdrawReleasedStakes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const erc20Abi = [{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const delegationAbi = [{"inputs":[{"internalType":"contract IContractRegistry","name":"_contractRegistry","type":"address"},{"internalType":"address","name":"_registryAdmin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"ContractRegistryAddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Delegated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"selfDelegatedStake","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"delegatedStake","type":"uint256"},{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":false,"internalType":"uint256","name":"delegatorContributedStake","type":"uint256"}],"name":"DelegatedStakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"DelegationInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"from","type":"address[]"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"DelegationsImported","type":"event"},{"anonymous":false,"inputs":[],"name":"InitializationComplete","type":"event"},{"anonymous":false,"inputs":[],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousRegistryAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"newRegistryAdmin","type":"address"}],"name":"RegistryManagementTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Unlocked","type":"event"},{"inputs":[],"name":"VOID_ADDR","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRegistryManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractRegistry","outputs":[{"internalType":"contract IContractRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDelegatedStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDelegation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDelegationInfo","outputs":[{"internalType":"address","name":"delegation","type":"address"},{"internalType":"uint256","name":"delegatorStake","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDelegatedStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"from","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"importDelegations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"}],"name":"initDelegation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initializationAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initializationComplete","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitializationComplete","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isRegistryAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"locked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingRegistryAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refreshContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"refreshStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"refreshStakeBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registryAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceRegistryManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IContractRegistry","name":"newContractRegistry","type":"address"}],"name":"setContractRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_registryAdmin","type":"address"}],"name":"setRegistryAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeOwner","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"_updatedStake","type":"uint256"}],"name":"stakeChange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakeOwners","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"bool[]","name":"_signs","type":"bool[]"},{"internalType":"uint256[]","name":"_updatedStakes","type":"uint256[]"}],"name":"stakeChangeBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeOwner","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeMigration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeOwnersData","outputs":[{"internalType":"address","name":"delegation","type":"address"},{"internalType":"uint96","name":"stake","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newRegistryAdmin","type":"address"}],"name":"transferRegistryManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"uncappedDelegatedStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const ethereumErc20Address = "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa";
const maticErc20Address = "0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff";

export const FirstPoSv2BlockNumber = 9830000;
export const FirstMaticPoSv2BlockNumber = 25487295;
export const FirstRewardsBlockNumber = 11145373;

export const CHAIN_ID = {'ETHEREUM': 1, 'MATIC': 137}

export enum Topics {
    Transfer = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

    Staked = '0x1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90',
    Restaked = '0xa217c421e0e9357b7b1815d752952b142ddc0e23f9f14ecb8233f8f83d563c4d',
    Unstaked = '0x7fc4727e062e336010f2c282598ef5f14facb3de68cf8195c2f23e1454b2b74e',
    Withdrew = '0xadec52fcd1408589179b85e44b434374db078b4eaf793e7d1a1bb0ae4ecfeee5',
    MigratedStake = '0x9571cc7fab3ada3041abcbb4d26ead1cf5757f940f1096da3713584afc4b75cb',

    DelegateStakeChanged = '0x52db726bc1b1643b24886ed6f0194a41de9abac79d1c12108aca494e5b2bda6b',

    StakingRewardsAllocated = '0x5830b366dc4564bf14d32116f14c979ac2c150a96b7c6b99bea717e6990d56ba',
}

export interface OrbsEthResrouces {
        erc20Address: string;
        erc20Contract: any;
        stakingAddress: string;
        stakingContract: any;
        delegationsAddress: string;
        delegationContract: any;
        stakingRewardsContract: any;
        stakingRewardsWalletAddress: string;
        bootstrapRewardsWalletAddress: string;
        stakingRewardsAddress: string;
        bootstrapRewardsAddress: string;
        generalFeesWalletAddress: string;
        certifiedFeesWalletAddress : string;
}

export function addressToTopic(address:string) {
    return '0x000000000000000000000000' + address.substr(2).toLowerCase();
}

export function getWeb3(ethereumEndpoint: string) {
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumEndpoint, {keepAlive: true,}));
    web3.eth.transactionBlockTimeout = 0; // to stop web3 from polling pending tx
    web3.eth.transactionPollingTimeout = 0; // to stop web3 from polling pending tx
    web3.eth.transactionConfirmationBlocks = 1; // to stop web3 from polling pending tx
    return web3;
}

export async function getWeb3Provider(ethereumEndpoints: string[]) {

  if (ethereumEndpoints.length === 0) return null;

  for (const ethereumEndpoint of ethereumEndpoints) {

  	try {

	  const web3 = getWeb3(ethereumEndpoint);
	  await web3.eth.getBlockNumber();
	  return web3

  	} catch (err) {
  	  console.log(`Failed to fetch block number from node ${ethereumEndpoint}`)
  	}
  }

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getResources(nodeData:any, web3:any) : Promise<OrbsEthResrouces>{
    if (!_.isObject(nodeData?.Payload?.CurrentContractAddress)) {
        throw new Error(`NodeData does not contain current contract addresses`);
    }

    const stakingAddress = String(nodeData.Payload.CurrentContractAddress["staking"]);
    const stakingRewardsWalletAddress = String(nodeData.Payload.CurrentContractAddress["stakingRewardsWallet"]);
    const bootstrapRewardsWalletAddress = String(nodeData.Payload.CurrentContractAddress["bootstrapRewardsWallet"]);
    const delegationsAddress = String(nodeData.Payload.CurrentContractAddress["delegations"]);
    const stakingRewardsAddress = String(nodeData.Payload.CurrentContractAddress["stakingRewards"]);
    const bootstrapRewardsAddress = String(nodeData.Payload.CurrentContractAddress["feesAndBootstrapRewards"]);
    const generalFeesWalletAddress = String(nodeData.Payload.CurrentContractAddress["generalFeesWallet"]);
    const certifiedFeesWalletAddress = String(nodeData.Payload.CurrentContractAddress["certifiedFeesWallet"]);

	const chainId = await web3.eth.getChainId();
	const erc20Address = (chainId === CHAIN_ID.ETHEREUM) ? ethereumErc20Address: maticErc20Address;

    return  {
        erc20Address: erc20Address,
        erc20Contract: getContract(web3, erc20Abi, erc20Address),
        stakingAddress,
        stakingContract: getContract(web3, stakeAbi, stakingAddress),
        delegationsAddress,
        delegationContract: getContract(web3, delegationAbi, delegationsAddress),
        stakingRewardsContract: getContract(web3, getAbiByContractRegistryKey('stakingRewards'), stakingRewardsAddress),
        stakingRewardsAddress,
        bootstrapRewardsAddress,
        stakingRewardsWalletAddress,
        bootstrapRewardsWalletAddress,
        generalFeesWalletAddress,
        certifiedFeesWalletAddress,
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

export interface BlockInfo {
    time: number;
    number: number;
}

export async function getBlockInfo(blockToFetch: string | number, web3:Web3): Promise<BlockInfo> {
    let block = await web3.eth.getBlock(blockToFetch);
    if (block === null || block === undefined || block.timestamp === null) {
        await sleep(1000);
        block = await web3.eth.getBlock(blockToFetch);
    }
    return {time: Number(block.timestamp), number: block.number }
}

export const BlockTimestamp = 'BlockTimestamp';
export function multicallToBlockInfo(multiCallRes: any): BlockInfo {
    return {
        number: multiCallRes.results.blockNumber.toNumber(),
        time: multiCallRes.results.transformed[BlockTimestamp].toNumber()
    };
}

export async function getChainName(web3: any) {
    const chainId = parseInt(await web3.eth.getChainId());
    switch (chainId) {
		case 1:
    		return 'ETHEREUM';
		case 137:
			return 'MATIC';

		default:
			return 'Unsupported Chain';
    }
}
