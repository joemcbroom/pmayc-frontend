import { defineStore, acceptHMRUpdate } from 'pinia';
import { useErrorStore } from '@/store/error';
import { useUserStore } from '@/store/user';
import { ethers } from 'ethers';

const VITE_POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const POLYGON_API_URL = 'https://api.polygonscan.com/api/';
const WRAP_CONTRACT_ADDRESS = '0xA847d6Ef6BebEc22751a91ba9270D23b3FA2fF8C';
const STAKING_CONTRACT_ADDRESS = '0x42Ed1573EDCeA53ca0453cf6B87AeB67c3fCEbea';
const MUTANTS_ORG_ADDRESS = '0xdFF760Ec52a498464c670B680DC81e6861f10BAd';

const ADDRESSES = {
	staking: WRAP_CONTRACT_ADDRESS,
	wrap: STAKING_CONTRACT_ADDRESS,
	mutants: MUTANTS_ORG_ADDRESS,
};

// Pinia store for integrating with metamask, etc

export const useCryptoStore = defineStore('crypto', {
	state: () => ({
		stakingContractAbi: [],
		wrapContractAbi: [],
		mutantsContractAbi: [],
		stakingContractInstance: null as ethers.Contract | null,
		wrapContractInstance: null as ethers.Contract | null,
		mutantsContractInstance: null as ethers.Contract | null,
		isBusy: false,
	}),
	actions: {
		/**
		 *
		 * @param adressType string 'staking', 'wrap', or 'mutants'
		 */
		async setContractAbi(adressType: string): Promise<void> {
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
					case 'mutants':
						this.mutantsContractAbi = result;
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
		async setContractInstance(contractType: string): Promise<void> {
			const userStore = useUserStore();
			this.isBusy = true;
			if (!Object.keys(ADDRESSES).includes(contractType)) {
				throw new Error(`Invalid contract type: ${contractType}`);
			}
			if (!userStore.account) {
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
				let abi;
				switch (contractType) {
					case 'staking':
						abi = this.stakingContractAbi;
						break;
					case 'wrap':
						abi = this.wrapContractAbi;
						break;
					case 'mutants':
						abi = this.mutantsContractAbi;
						break;
				}
				const contract = new ethers.Contract(
					ADDRESSES[contractType],
					abi,
					signer
				);

				switch (contractType) {
					case 'staking':
						this.stakingContractInstance = contract;
						break;
					case 'wrap':
						this.wrapContractInstance = contract;
						break;
					case 'mutants':
						this.mutantsContractInstance = contract;
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.isBusy = false;
			}
		},
		async initAbiAndContracts(type): Promise<void> {
			await this.setContractAbi(type);
			await this.setContractInstance(type);
		},
		async getNFTs() {
			const errorStore = useErrorStore();
			const user = useUserStore();
			this.isBusy = true;
			const nfts: number[] = [];
			try {
				const res = await this.mutantsContractInstance?.balanceOf(
					user.account
				);
				const count = res.toNumber();
				const arr = [...Array(count)];

				await Promise.all(
					arr.map(async (_, i) => {
						const id =
							await this.mutantsContractInstance?.tokenOfOwnerByIndex(
								user.account,
								i
							);
						nfts.push(id.toNumber());
					})
				);

				return nfts;
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					errorStore.setError(error);
				}
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
		clearUserInfo() {
			const userStore = useUserStore();
			userStore.hydrateUser({
				account: '',
				balance: '',
			});
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
