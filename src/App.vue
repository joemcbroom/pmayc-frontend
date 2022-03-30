<script setup lang="ts">
import { useErrorStore } from './store/error';
import { storeToRefs } from 'pinia';
import NavBar from '@/components/NavBar.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';

const errorStore = useErrorStore();
const { error } = storeToRefs(errorStore);
</script>

<template>
	<nav-bar />
	<main class="container mx-auto mt-6 text-center">
		<router-view />
		<error-dialog v-if="error" :error="error" />
	</main>
</template>

<style lang="scss"></style>
