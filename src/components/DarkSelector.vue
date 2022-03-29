<script setup lang="ts">
import { onMounted, computed, ref, watchEffect } from 'vue';
import { useDarkModeStore } from '@/store/darkmode';
import { mapActions, storeToRefs } from 'pinia';
import sunUrl from '@/assets/sun.svg';
import moonUrl from '@/assets/moon.svg';

defineProps<{
	useImages?: boolean;
}>();

const darkModeStore = useDarkModeStore();

const { darkMode } = storeToRefs(darkModeStore);
const { setDarkMode } = darkModeStore;

let imagePath = computed(() => {
	return darkMode ? sunUrl : moonUrl;
});

onMounted(() => {
	// Check localstorage for theme and set it in store
	const isDark =
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
	if (isDark) {
		setDarkMode(isDark);
	}
});
</script>

<template>
	<div
		class="w-14 cursor-pointer overflow-hidden rounded-full bg-slate-800 p-1 outline-none focus:outline-none dark:bg-slate-50"
		@click="setDarkMode(!darkMode)"
	>
		<div
			class="ease relative z-0 h-6 w-6 transform rounded-full bg-yellow-500 transition-transform duration-500"
			:class="darkMode ? 'translate-x-full' : 'translate-x-0'"
		>
			<img
				id="toggle"
				v-if="imagePath && useImages"
				:src="darkMode ? sunUrl : moonUrl"
				class="h-6 w-6"
			/>
			<div
				v-if="!useImages"
				class="z-10 h-6 w-6 overflow-hidden rounded-full bg-yellow-500"
			/>
			<div
				v-if="!useImages"
				class="absolute left-0 top-0 z-20 h-6 w-6 transform rounded-full transition-transform duration-500"
				:class="
					darkMode
						? 'translate-x-full -translate-y-full bg-slate-50'
						: 'translate-x-2 -translate-y-1 bg-slate-800'
				"
			/>
		</div>
	</div>
</template>
