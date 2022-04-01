<script setup lang="ts">
import DialogModal from '@/components/DialogModal.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import { useErrorStore } from '@/store/error';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const errorStore = useErrorStore();

const { highlightProfile } = storeToRefs(errorStore);

defineProps<{
	error: Error;
}>();

const closeDialog = () => {
	errorStore.setError(null);
};

onMounted(() => {
	if (errorStore.error?.type === 'NO_WALLET') {
		highlightProfile.value = true;
	}
});
</script>
<template>
	<dialog-modal @close="closeDialog">
		<h1 class="my-4 px-10 text-3xl">Error!</h1>
		<p class="mb-6 px-10">{{ error?.message }}</p>
		<div
			class="flex w-full justify-end border-0 border-t border-slate-400 p-4"
		>
			<default-button text="Close" :action="closeDialog" />
		</div>
		<img
			src="@/assets/close-icon.png"
			class="absolute top-2 right-2 cursor-pointer rounded border p-2"
			@click="closeDialog"
		/>
	</dialog-modal>
</template>
