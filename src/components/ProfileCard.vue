<script setup lang="ts">
import DefaultButton from './DefaultButton.vue';
import { useUserStore } from '@/store/user';
import { useCryptoStore } from '@/store/crypto';
import { useErrorStore } from '@/store/error';
import { computed, ref } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import userLoggedOut from '@/assets/user-outline.png';
import userLoggedIn from '@/assets/user-fill.png';
import DarkSelector from './DarkSelector.vue';
import { watch } from 'vue';
const crypto = useCryptoStore();
const user = useUserStore();
const { account, balance, profileImage } = storeToRefs(user);
const errorStore = useErrorStore();
const { isBusy } = storeToRefs(crypto);
const { highlightProfile } = storeToRefs(errorStore);
const { connectWallet } = crypto;

const profileImageUrl = computed(() => {
	if (profileImage.value) {
		return profileImage.value;
	}
	return account.value ? userLoggedIn : userLoggedOut;
});

let showDropdown = ref(false);

watch(highlightProfile, (newValue) => {
	if (newValue) {
		setTimeout(() => {
			highlightProfile.value = false;
		}, 5000);
	}
});

const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
	highlightProfile.value = false;
};
</script>
<template>
	<div class="relative">
		<div
			class="grid h-14 w-14 cursor-pointer place-items-center rounded-full"
			:class="highlightProfile ? ' animate-bounce' : ''"
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
			class="absolute top-full right-0 z-50 flex w-80 flex-col items-center justify-evenly gap-6 rounded bg-slate-100 p-6 shadow dark:bg-slate-600 dark:shadow-slate-400"
		>
			<default-button
				v-if="!user.account"
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
