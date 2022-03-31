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
		abis: {
			staking: [],
			wrap: [],
			mutants: [],
		},
		contracts: {
			staking: null as ethers.Contract | null,
			wrap: null as ethers.Contract | null,
			mutants: null as ethers.Contract | null,
		},
		isBusy: false,
	}),
	actions: {
		/**
		 *
		 * @param contractType string 'staking', 'wrap', or 'mutants'
		 */
		async getContractAbi(contractType: string): Promise<[] | undefined> {
			try {
				const address = ADDRESSES[contractType];
				if (!address) {
					throw new Error(
						`No address for contract type: ${contractType}`
					);
				}
				if (this.abis[contractType].length) {
					return this.abis[contractType];
				}
				this.isBusy = true;
				const params = {
					module: 'contract',
					action: 'getabi',
					address,
					apikey: VITE_POLYGON_API_KEY as string,
				};
				const res = await fetch(
					POLYGON_API_URL + '?' + new URLSearchParams(params)
				);
				const { result } = await res.json();
				this.abis[contractType] = result;
				return result;
			} catch (error) {
				throw error;
			} finally {
				this.isBusy = false;
			}
		},
		/**
		 *
		 * @param contractType string 'staking' or 'wrap'
		 */
		async getContractInstance(
			contractType: string
		): Promise<ethers.Contract> {
			const userStore = useUserStore();
			try {
				const address = ADDRESSES[contractType];
				if (!address) {
					throw new Error(
						`No address for contract type: ${contractType}`
					);
				}
				// @ts-expect-error it's there bro, trust me bro
				const { ethereum } = window;
				if (!ethereum) {
					throw new Error(
						'No ethereum provider detected \n Install Metamask extension or use a dapp browser'
					);
				}
				if (!userStore.account) {
					throw new Error('Connect to metamask first');
				}
				if (this.contracts[contractType]) {
					return this.contracts[contractType];
				}
				this.isBusy = true;
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();

				const contractAbi = (await this.getContractAbi(
					contractType
				)) as [];

				const contract = new ethers.Contract(
					ADDRESSES[contractType],
					contractAbi,
					signer
				);

				this.contracts[contractType] = contract;
				return contract;
			} catch (error) {
				throw error;
			} finally {
				this.isBusy = false;
			}
		},
		async getNFTs(): Promise<number[] | undefined> {
			const errorStore = useErrorStore();
			const user = useUserStore();

			try {
				this.isBusy = true;
				const nfts: number[] = [];
				const contractInstance = await this.getContractInstance(
					'mutants'
				);
				const res = await contractInstance.balanceOf(user.account);
				const count = res.toNumber();
				const arr = [...Array(count)];

				await Promise.all(
					arr.map(async (_, i) => {
						const id = await contractInstance?.tokenOfOwnerByIndex(
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
