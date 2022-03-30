<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCryptoStore } from '@/store/crypto';

const crypto = useCryptoStore();
const { account } = storeToRefs(crypto);
</script>
<template>
	<h1>Staking Portal</h1>
	<div v-if="account">Account Number: {{ account }}</div>
</template>
