<script setup lang="ts">
import DarkSelector from './DarkSelector.vue';
import WalletConnect from './WalletConnect.vue';
</script>

<template>
	<div class="mt-4 flex h-20 w-full items-center justify-center px-2 align-middle lg:px-8">
		<router-link to="/" class="mr-auto w-14">
			<img
				class="aspect-1 object-contain"
				alt="Vue logo"
				src="@/assets/pmayc-transparent.png"
			/>
		</router-link>
		<wallet-connect />
		<dark-selector class="ml-auto" :use-images="true" />
	</div>
	<nav
		class="flex h-10 w-full items-center justify-center gap-4 border-0 border-b align-middle dark:border-slate-50"
	>
		<router-link class="hover:underline" to="/">Home</router-link>
		<router-link class="hover:underline" to="/stake">Staking</router-link>
		<router-link class="hover:underline" to="/white-paper">White Paper</router-link>
	</nav>
</template>

<style scoped></style>
