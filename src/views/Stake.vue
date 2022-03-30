<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { useCryptoStore } from '@/store/crypto';
import { useErrorStore } from '@/store/error';

const crypto = useCryptoStore();
const { account, stakingContractInstance } = storeToRefs(crypto);
const { connectWallet, setContractInstance } = crypto;

const errorStore = useErrorStore();
const { error } = storeToRefs(errorStore);
</script>
<template>
	<h1>Staking Portal</h1>
	<div v-if="account">Account Number: {{ account }}</div>
</template>
