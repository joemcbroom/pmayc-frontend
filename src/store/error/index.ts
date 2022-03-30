import { defineStore, acceptHMRUpdate } from 'pinia';

export const useErrorStore = defineStore('error', {
	state: () => ({
		error: null as Error | null,
	}),
	actions: {
		setError(error: Error | null): void {
			this.error = error;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
