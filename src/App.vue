<script setup lang="ts">
import { useErrorStore } from './store/error';
import { useCryptoStore } from './store/crypto';
import { storeToRefs } from 'pinia';
import NavBar from '@/components/NavBar.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';
import { onMounted } from 'vue';

const crypto = useCryptoStore();
const { connectWallet, clearUserInfo } = crypto;

onMounted(async () => {
	// @ts-expect-error we checkin if it's there
	const { ethereum } = window;
	if (!ethereum) {
		return;
	}
	ethereum.on('accountsChanged', ([account]) => {
		if (account) {
			connectWallet();
		} else {
			clearUserInfo();
		}
	});
});

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
