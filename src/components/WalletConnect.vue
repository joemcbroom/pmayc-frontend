<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { storeToRefs } from 'pinia';
import { useCryptoStore } from '@/store/crypto';
import DefaultButton from './DefaultButton.vue';
import { ref } from 'vue';

const crypto = useCryptoStore();
const { account, isBusy } = storeToRefs(crypto);
const { connectWallet } = crypto;

let showUserInfo = ref(false);
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
	<default-button
		v-else
		text="Connect to Wallet"
		:disabled="isBusy"
		:action="connectWallet"
	/>
</template>
<style lang="scss"></style>
