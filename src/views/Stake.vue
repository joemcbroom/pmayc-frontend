<script setup lang="ts">
import { useCryptoStore } from '@/store/crypto';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const crypto = useCryptoStore();

const { account } = storeToRefs(crypto);
const { connectWallet } = crypto;

onMounted(async () => {
	await connectWallet();
});
</script>
<template>
	<h1>Staking Portal</h1>
	<div v-if="account">{{ account }}</div>
</template>
