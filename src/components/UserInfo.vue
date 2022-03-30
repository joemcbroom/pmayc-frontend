<script setup lang="ts">
import DefaultButton from '@/components/DefaultButton.vue';
import { onMounted, ref } from 'vue';
import { useCryptoStore } from '@/store/crypto';
import { storeToRefs } from 'pinia';

const crypto = useCryptoStore();
const { account, balance } = storeToRefs(crypto);

const dialog = ref(null);

// @ts-expect-error
const { ethereum } = window;

function closeDialog() {
	// @ts-ignore
	dialog.value.close();
}

onMounted(() => {
	// @ts-ignore
	dialog.value.showModal();
});
</script>
<template>
	<dialog
		class="relative flex flex-col justify-between gap-4 divide-solid bg-slate-50 shadow dark:shadow-white"
		ref="dialog"
	>
		<h1 class="my-4 px-10 text-3xl">User Info</h1>
		<p class="mb-6 px-10">Account #: {{ account }}</p>
		<p class="mb-6 px-10">Balance: {{ balance }}</p>
		<div
			class="m-auto mb-6 flex flex-col items-center justify-center gap-2 px-10"
			v-if="ethereum && ethereum.isMetaMask"
		>
			<p>Connected with MetaMask!</p>
			<img class="aspect-1 w-10" src="@/assets/Metamask-icon.png" />
		</div>
		<div class="flex w-full justify-end border-0 border-t border-slate-400 p-4">
			<default-button text="Close" @click="$emit('close')" />
		</div>
		<img
			src="@/assets/close-icon.png"
			class="absolute top-2 right-2 cursor-pointer rounded border p-2"
			@click="$emit('close')"
		/>
	</dialog>
</template>
<style lang="scss" scoped>
dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.1);
	.dark & {
		background-color: rgba(100, 100, 100, 0.2);
	}
}
</style>
