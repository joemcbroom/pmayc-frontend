import { defineStore, acceptHMRUpdate } from 'pinia';

interface DarkModeStatus {
	darkMode: boolean;
}

export const useDarkModeStore = defineStore('main', {
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
