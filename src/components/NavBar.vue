<script setup lang="ts">
import DarkSelector from './DarkSelector.vue';
</script>

<template>
	<div
		class="justify-space-between flex h-20 w-full items-center border-0 border-b align-middle dark:border-slate-50"
	>
		<nav class="flex w-full justify-center gap-2">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<dark-selector :use-images="true" class="" />
	</div>
</template>

<style scoped></style>
