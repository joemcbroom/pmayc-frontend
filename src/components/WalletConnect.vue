<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { storeToRefs } from 'pinia';
import { useCryptoStore } from '@/store/crypto';
import { useErrorStore } from '@/store/error';
import DefaultButton from './DefaultButton.vue';
import { ref } from 'vue';

const crypto = useCryptoStore();
const { account, isBusy } = storeToRefs(crypto);
const { connectWallet } = crypto;
const errorStore = useErrorStore();

let showUserInfo = ref(false);

const connectToWallet = async () => {
	try {
		await connectWallet();
	} catch (e) {
		errorStore.setError(e);
	}
};
</script>
<template>
	<div v-if="account">
		<img
			src="@/assets/user.png"
			v-if="account"
			alt="Profile"
			@click="() => (showUserInfo = true)"
			class="cursor-pointer"
		/>
		<user-info v-if="showUserInfo" @close="() => (showUserInfo = false)" />
	</div>
	<default-button v-else text="Connect to Wallet" :disabled="isBusy" :action="connectToWallet" />
</template>
<style lang="scss"></style>
