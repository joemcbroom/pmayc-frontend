<script setup lang="ts">
import ProfileCard from './ProfileCard.vue';
import { routes } from '@/router';
</script>

<template>
	<div
		class="mt-4 flex h-20 w-full items-center justify-center px-2 align-middle lg:px-8"
	>
		<router-link to="/" class="mr-auto w-14">
			<img
				class="aspect-1 object-contain"
				alt="Vue logo"
				src="@/assets/pmayc-transparent.png"
			/>
		</router-link>
		<h1 class="text-sm lg:text-xl">Phunky Mutant Ape Yacht Club</h1>
		<profile-card class="ml-auto" />
	</div>
	<nav
		class="flex h-10 w-full items-center justify-center gap-4 border-0 border-b align-middle dark:border-slate-50"
	>
		<router-link
			v-for="route in routes.filter((route) => route.name !== 'NotFound')"
			class="hover:underline"
			:to="route.path"
			:key="route.path"
		>
			{{ route.name }}
		</router-link>
		<!-- <router-link class="hover:underline" to="/">Home</router-link>
		<router-link class="hover:underline" to="/stake">Staking</router-link>
		<router-link class="hover:underline" to="/white-paper">
			White Paper
		</router-link> -->
	</nav>
</template>

<style scoped>
.router-link-active {
	text-decoration: underline;
}
</style>
