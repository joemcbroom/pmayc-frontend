<script setup lang="ts">
import DarkSelector from './DarkSelector.vue';
</script>

<template>
	<div
		class="flex h-20 w-full items-center justify-center border-0 border-b align-middle dark:border-slate-50"
	>
		<nav class="flex justify-center gap-2">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<dark-selector class="absolute right-10" />
	</div>
</template>

<style scoped></style>
