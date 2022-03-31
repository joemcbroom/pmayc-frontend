<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/store/user';

const user = useUserStore();
const { account } = storeToRefs(user);
</script>
<template>
	<h1>Staking Portal</h1>
	<div v-if="account">Account Number: {{ account }}</div>
</template>
