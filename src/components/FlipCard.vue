<template>
	<div class="perspective-600 group aspect-1 w-full">
		<div
			class="preserve-3d group-hover:rotate-y-180 h-full w-full transform transition-transform duration-500"
		>
			<div class="absolute h-full w-full">
				<slot name="front" />
			</div>
			<div
				class="backface-hidden rotate-y-180 absolute h-full w-full overflow-hidden rounded-xl bg-slate-800 p-6 text-slate-50 dark:bg-slate-50 dark:text-slate-800"
			>
				<slot name="back" />
			</div>
		</div>
	</div>
</template>
