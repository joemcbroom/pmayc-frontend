<script setup lang="ts">
import { onMounted, ref } from 'vue';
const dialog = ref(null);

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
		<slot />
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
