<script setup lang="ts">
import DefaultButton from '@/components/DefaultButton.vue';
import { onMounted, ref } from 'vue';
import { useErrorStore } from '@/store/error';
const errorStore = useErrorStore();

const props = defineProps<{
	error: Error;
}>();

const dialog = ref(null);

function closeDialog() {
	errorStore.setError(null);
}

onMounted(() => {
	// @ts-ignore
	dialog.value.showModal();
});
</script>
<template>
	<dialog
		class="flex flex-col justify-between gap-4 divide-solid bg-slate-50 shadow dark:shadow-white"
		ref="dialog"
	>
		<h1 class="my-4 px-10 text-3xl">Wait!</h1>
		<p class="mb-6 px-10">{{ error.message }}</p>
		<div class="flex w-full justify-end border-0 border-t border-slate-400 p-4">
			<default-button text="Close" :action="closeDialog" />
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
