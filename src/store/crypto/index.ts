import { defineStore, acceptHMRUpdate } from 'pinia';
import { useErrorStore } from '@/store/error';
// import { ethers } from 'ethers';

const VITE_POLYGON_API_KEY: any = import.meta.env.VITE_POLYGON_API_KEY;
const POLYGON_API_URL = 'https://api.polygonscan.com/api/';
const CONTRACT_ADDRESS = '0xA847d6Ef6BebEc22751a91ba9270D23b3FA2fF8C';
// const CONTRACT_ADDRESS_ORG = '0xdFF760Ec52a498464c670B680DC81e6861f10BAd';

// Pinia store for integrating with metamask, etc

export const useCryptoStore = defineStore('crypto', {
	state: () => ({
		contractAbi: [],
		contractAddress: CONTRACT_ADDRESS,
		contractInstance: [] as any,
		account: '',
	}),
	actions: {
		async setContractAbi() {
			const errorStore = useErrorStore();
			try {
				const params = {
					module: 'contract',
					action: 'getabi',
					address: CONTRACT_ADDRESS,
					apikey: VITE_POLYGON_API_KEY,
				};
				const res = await fetch(POLYGON_API_URL + '?' + new URLSearchParams(params));
				const data = await res.json();
				this.contractAbi = data.result;
			} catch (e) {
				errorStore.setError(e);
			}
		},
		// async setContractInstance() {
		// 	try {
		// 		const { ethereum } = window;
		// 		if (!ethereum) {
		// 			throw new Error('No ethereum provider (metamask)');
		// 		}
		// 		const provider = new ethers.providers.Web3Provider(ethereum);
		// 		const signer = provider.getSigner();
		// 		const contract = new ethers.Contract(
		// 			this.contractAddress,
		// 			this.contractAbi,
		// 			signer
		// 		);
		// 		this.contractInstance = contract;
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// },
		async connectWallet() {
			const errorStore = useErrorStore();
			try {
				// @ts-expect-error
				const { ethereum } = window;
				if (!ethereum) {
					throw new Error('You must have the Metamask extension installed');
				}
				const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' });

				console.log('Connected: ', myAccounts[0]);
				this.account = myAccounts[0];
				return this.account;
			} catch (error) {
				errorStore.setError(error, 'connectWallet');
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
