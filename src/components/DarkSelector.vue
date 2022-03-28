<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import store from '@/store';

import sunUrl from '@/assets/sun.svg';
import moonUrl from '@/assets/moon.svg';

const imagePath = computed(() => {
	return store.getters.darkMode() ? sunUrl : moonUrl;
});

const updateDarkMode = () => {
	const darkMode = store.getters.darkMode();
	store.methods.setDarkMode(!darkMode);
};

onMounted(() => {
	// Check localstorage for theme and set it in store
	const localStorageTheme =
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
	if (localStorageTheme) {
		store.methods.setDarkMode(true);
	}
});
</script>
<template>
	<div
		class="w-14 cursor-pointer overflow-hidden rounded-full bg-slate-800 p-1 outline-none focus:outline-none dark:bg-slate-50"
		@click="updateDarkMode"
	>
		<div
			class="relative z-10 h-6 w-6 transform overflow-hidden rounded-full bg-yellow-500 transition-transform duration-500 ease-linear"
			:class="store.getters.darkMode() ? 'translate-x-full overflow-hidden' : 'translate-x-0'"
		>
			<img :src="imagePath" alt="sun/moon" class="h-6 w-6" />
		</div>
	</div>
</template>
