import { defineStore, acceptHMRUpdate } from 'pinia';

export const useErrorStore = defineStore('error', {
	state: () => ({
		error: null,
	}),
	actions: {
		setError(error: any): void {
			this.error = error;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
