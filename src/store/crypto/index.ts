import { defineStore, acceptHMRUpdate } from 'pinia';
import { useErrorStore } from '@/store/error';
import { useUserStore } from '@/store/user';
import { ethers } from 'ethers';

const VITE_POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const POLYGON_API_URL = 'https://api.polygonscan.com/api/';
const WRAP_CONTRACT_ADDRESS = '0xA847d6Ef6BebEc22751a91ba9270D23b3FA2fF8C';
const STAKING_CONTRACT_ADDRESS = '0x42Ed1573EDCeA53ca0453cf6B87AeB67c3fCEbea';

const ADDRESSES = {
	staking: WRAP_CONTRACT_ADDRESS,
	wrap: STAKING_CONTRACT_ADDRESS,
};

// Pinia store for integrating with metamask, etc

export const useCryptoStore = defineStore('crypto', {
	state: () => ({
		stakingContractAbi: [],
		wrapContractAbi: [],
		stakingContractInstance: null as ethers.Contract | null,
		wrapContractInstance: null as ethers.Contract | null,
		account: '',
		isBusy: false,
		balance: '',
	}),
	actions: {
		/**
		 *
		 * @param adressType string 'staking' or 'wrap'
		 */
		async setContractAbi(adressType: string) {
			const errorStore = useErrorStore();
			this.isBusy = true;
			if (!Object.keys(ADDRESSES).includes(adressType)) {
				throw new Error(`Invalid contract type: ${adressType}`);
			}
			try {
				const params = {
					module: 'contract',
					action: 'getabi',
					address: ADDRESSES[adressType],
					apikey: VITE_POLYGON_API_KEY as string,
				};
				const res = await fetch(
					POLYGON_API_URL + '?' + new URLSearchParams(params)
				);
				const { result } = await res.json();
				switch (adressType) {
					case 'staking':
						this.stakingContractAbi = result;
						break;
					case 'wrap':
						this.wrapContractAbi = result;
						break;
				}
			} catch (error) {
				if (error instanceof Error) {
					errorStore.setError(error);
				}
			} finally {
				this.isBusy = false;
			}
		},
		/**
		 *
		 * @param contractType string 'staking' or 'wrap'
		 */
		async setContractInstance(contractType: string) {
			// const errorStore = useErrorStore();
			this.isBusy = true;
			if (!Object.keys(ADDRESSES).includes(contractType)) {
				throw new Error(`Invalid contract type: ${contractType}`);
			}
			if (!this.account) {
				throw new Error('Connect to metamask first');
			}
			try {
				// @ts-expect-error it's there bro, trust me bro
				const { ethereum } = window;
				if (!ethereum) {
					throw new Error('No ethereum provider (metamask)');
				}
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const abi =
					contractType === 'staking'
						? this.stakingContractAbi
						: this.wrapContractAbi;
				const contract = new ethers.Contract(
					STAKING_CONTRACT_ADDRESS,
					abi,
					signer
				);
				const deposits = await contract.depositsOf(this.account);
				console.log('deposits', deposits);
				switch (contractType) {
					case 'staking':
						this.stakingContractInstance = contract;
						break;
					case 'wrap':
						this.wrapContractInstance = contract;
						break;
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.isBusy = false;
			}
		},
		async connectWallet(): Promise<void> {
			const errorStore = useErrorStore();
			const userStore = useUserStore();
			this.isBusy = true;
			try {
				// @ts-expect-error it's there bro, trust me bro
				const { ethereum } = window;
				if (!ethereum) {
					throw new Error(
						'You must have the Metamask extension installed'
					);
				}
				const [account] = await ethereum.request({
					method: 'eth_requestAccounts',
				});
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const balance = await signer.getBalance();
				userStore.hydrateUser({
					account,
					balance: ethers.utils.formatEther(balance),
				});
			} catch (error) {
				if (error instanceof Error) {
					errorStore.setError(error);
				}
			} finally {
				this.isBusy = false;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
