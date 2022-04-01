import { ref, onMounted, computed, onBeforeUnmount, onUnmounted } from 'vue';

export const useIsMobile = () => {
	let width = ref(0);
	let isMobile = computed(() => width.value < 768);

	const handleResize = () => {
		width.value = window.innerWidth;
	};

	onMounted(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
	});
	onUnmounted(() => {
		window.removeEventListener('resize', handleResize);
	});

	return isMobile;
};
