<script setup lang="ts">
import { useCryptoStore } from '@/store/crypto';
import { storeToRefs } from 'pinia';

const main = useCryptoStore();
const { contractAbi } = storeToRefs(main);
</script>

<template>
	<h1>Home</h1>
	<code class="max-w-screen" v-if="contractAbi">{{ contractAbi }}</code>
</template>
