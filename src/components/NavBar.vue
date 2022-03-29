<script setup lang="ts">
import DarkSelector from './DarkSelector.vue';
</script>

<template>
	<div
		class="flex h-20 w-full items-center justify-center border-0 border-b align-middle dark:border-slate-50"
	>
		<img
			class="absolute left-3 aspect-1 w-20"
			alt="Vue logo"
			src="@/assets/pmayc-transparent.png"
		/>
		<nav class="flex w-full justify-center gap-2">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/stake">Staking</router-link>
		</nav>
		<dark-selector :use-images="true" class="absolute right-3" />
	</div>
</template>

<style scoped></style>
