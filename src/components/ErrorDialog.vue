<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useErrorStore } from '@/store/error';
const errorStore = useErrorStore();

defineProps<{
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
			<button
				class="rounded border border-slate-800 bg-slate-800 px-5 py-2 text-slate-50"
				@click="closeDialog"
			>
				Close
			</button>
		</div>
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
