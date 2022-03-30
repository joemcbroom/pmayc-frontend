import { defineStore, acceptHMRUpdate } from 'pinia';

/**
 * Pinia store for interacting with the user's account
 *
 * @property {string} account The user's account address
 * @property {string} balance The user's account balance
 * @property {string} profileImage The user's profile image url
 *
 */

interface UserType {
	account: string;
	balance: string;
	profileImage?: string;
}

export const useUserStore = defineStore('user', {
	state: () => ({
		account: '',
		balance: '',
		profileImage: '',
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
