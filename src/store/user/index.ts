import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStorage } from '@vueuse/core';

/**
 * Pinia store for interacting with the user's account
 *
 * @property {string} account The user's account address
 * @property {string} balance The user's account balance
 * @property {string} profileImage The user's profile image url
 *
 */

export const useUserStore = defineStore('user', {
	state: () => ({
		account: useStorage('account', ''),
		balance: useStorage('balance', ''),
		profileImage: useStorage('profileImage', ''),
		unstakedMutants: [] as NftData[],
		stakedMutants: [] as NftData[],
	}),
	actions: {
		hydrateUser({ account, balance, profileImage }: UserType) {
			this.account = account;
			this.balance = balance;
			this.profileImage = profileImage || '';
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
