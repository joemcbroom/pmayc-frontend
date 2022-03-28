<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
	<div>
		<nav-bar />
		<main class="container text-center">
			<router-view />
		</main>
		<img class="m-auto aspect-1 w-2/12" alt="Vue logo" src="./assets/pmayc-transparent.png" />
	</div>
</template>

<style lang="scss"></style>
