import { defineStore } from 'pinia';

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
	}),
	actions: {
		async setContractAbi() {
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
				console.log(e);
			}
		},
		// async setContractInstance() {
		// 	const web3 = new Web3(Web3.givenProvider);
		// 	try {
		// 		const contract = await new web3.eth.Contract(
		// 			this.contractAbi,
		// 			this.contractAddress
		// 		);
		// 		debugger;
		// 		this.contractInstance = contract;
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// },
	},
});
