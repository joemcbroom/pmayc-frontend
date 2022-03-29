import { defineStore, acceptHMRUpdate } from 'pinia';

export const useDarkModeStore = defineStore('darkMode', {
	state: () => ({
		darkMode: false,
	}),
	actions: {
		setDarkMode(value: boolean): void {
			this.darkMode = value;
			localStorage.setItem('theme', this.darkMode ? 'dark' : '');
			document.documentElement.classList.toggle('dark', this.darkMode);
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useDarkModeStore, import.meta.hot));
}
