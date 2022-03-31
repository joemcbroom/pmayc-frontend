<script setup lang="ts">
defineProps<{
	action?: () => void;
	text: string;
	disabled?: boolean;
}>();
</script>

<template>
	<button
		class="rounded border border-slate-800 bg-slate-800 px-5 py-2 text-slate-50 disabled:opacity-30 dark:bg-slate-50 dark:text-slate-800"
		:disabled="disabled"
		@click="action ? action() : undefined"
	>
		{{ text }}
	</button>
</template>
