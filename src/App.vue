<script setup lang="ts">
import { useCryptoStore } from '@/store/crypto';
import { mapActions, storeToRefs } from 'pinia';
import NavBar from '@/components/NavBar.vue';
import { onMounted } from 'vue';

const crypto = useCryptoStore();

const { contractAbi } = storeToRefs(crypto);
const { setContractAbi } = crypto;

onMounted(async () => {
	await setContractAbi();
});
</script>

<template>
	<nav-bar />
	<main class="container text-center">
		<router-view />
	</main>
</template>

<style lang="scss"></style>
