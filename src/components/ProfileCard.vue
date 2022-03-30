<script setup lang="ts">
import DefaultButton from './DefaultButton.vue';
import { useUserStore } from '@/store/user';
import { useCryptoStore } from '@/store/crypto';
import { computed, ref } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import userLoggedOut from '@/assets/user-outline.png';
import userLoggedIn from '@/assets/user-fill.png';
import DarkSelector from './DarkSelector.vue';
const crypto = useCryptoStore();
const user = useUserStore();
const { account, balance, profileImage } = storeToRefs(user);
const { isBusy } = storeToRefs(crypto);
const { connectWallet } = crypto;

const profileImageUrl = computed(() => {
	if (profileImage.value) {
		return profileImage.value;
	}
	return account.value ? userLoggedIn : userLoggedOut;
});

let showDropdown = ref(false);

const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
};
</script>
<template>
	<div class="relative">
		<div
			class="grid h-14 w-14 cursor-pointer place-items-center rounded-full"
			@click="toggleDropdown"
		>
			<img
				v-if="!profileImage"
				class="rounded-full dark:invert"
				:src="profileImageUrl"
			/>
		</div>
		<div
			v-show="showDropdown"
			class="absolute top-full right-0 flex min-w-max flex-col items-center justify-evenly gap-6 rounded bg-slate-100 p-6 shadow dark:bg-slate-600 dark:shadow-slate-400"
		>
			<default-button
				v-if="!account"
				text="Connect to Wallet"
				:disabled="isBusy"
				:action="connectWallet"
			/>
			<div
				v-else
				class="flex flex-col items-center justify-between text-sm"
			>
				<div>Wallet Id:</div>
				<div class="mb-4 text-xs">{{ account }}</div>
				<div>Balance: {{ balance }}</div>
			</div>
			<dark-selector class="ml-auto" :use-images="true" />
		</div>
	</div>
</template>
<style lang="scss"></style>
