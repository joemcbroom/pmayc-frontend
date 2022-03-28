<script setup lang="ts">
let isDark = true;
</script>
<template>
	<div class="w-14 overflow-hidden rounded-full bg-slate-50 p-1">
		<div
			class="h-6 w-6 rounded-full bg-slate-800 shadow-sm transition-transform"
			:class="isDark ? 'translate-x-0' : 'translate-x-full'"
		></div>
	</div>
</template>
