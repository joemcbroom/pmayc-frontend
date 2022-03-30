<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCryptoStore } from '@/store/crypto';
import { useErrorStore } from '@/store/error';
import DefaultButton from './DefaultButton.vue';

const crypto = useCryptoStore();
const { account, isBusy } = storeToRefs(crypto);
const { connectWallet } = crypto;
const errorStore = useErrorStore();

const connectToWallet = async () => {
	try {
		await connectWallet();
	} catch (e) {
		errorStore.setError(e);
	}
};
</script>
<template>
	<div v-if="account">{{ account }}</div>
	<default-button v-else text="Connect to Wallet" :disabled="isBusy" :action="connectToWallet" />
</template>
<style lang="scss"></style>
