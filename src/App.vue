<script setup lang="ts">
import { useCryptoStore } from '@/store/crypto';
import { useErrorStore } from './store/error';
import { storeToRefs } from 'pinia';
import NavBar from '@/components/NavBar.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';
import { onMounted } from 'vue';

const errorStore = useErrorStore();
const { error } = storeToRefs(errorStore);
const crypto = useCryptoStore();
const { _contractAbi } = storeToRefs(crypto);
const { setContractAbi } = crypto;

onMounted(async () => {
	await setContractAbi();
});
</script>

<template>
	<nav-bar />
	<main class="container text-center">
		<router-view />
		<error-dialog v-if="error" :error="error" />
	</main>
</template>

<style lang="scss"></style>
