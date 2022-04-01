<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const dialog = ref(null);

const emit = defineEmits(['close']);

const handleEvent = (e: Event) => {
	if (e.target === dialog.value) {
		// @ts-expect-error it's there bro, trust me my guy
		if (![...dialog.value.children].includes(e.target)) emit('close');
	}
};

onMounted(() => {
	// @ts-expect-error it's there bro, trust me my guy
	dialog.value.showModal();
	window.addEventListener('click', handleEvent);
});

onUnmounted(() => {
	window.removeEventListener('click', handleEvent);
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
