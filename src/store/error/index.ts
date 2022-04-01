import { defineStore, acceptHMRUpdate } from 'pinia';

export const useErrorStore = defineStore('error', {
	state: () => ({
		error: null as Error | CryptoError | null,
	}),
	actions: {
		setError(error: Error | null | CryptoError): void {
			this.error = error;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
