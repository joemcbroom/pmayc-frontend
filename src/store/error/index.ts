import { defineStore, acceptHMRUpdate } from 'pinia';

export const useErrorStore = defineStore('error', {
	state: () => ({
		error: null,
		errorType: '',
	}),
	actions: {
		setError(error: any, type?: string | null): void {
			this.error = error;
			if (type) {
				this.errorType = type;
			}
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
