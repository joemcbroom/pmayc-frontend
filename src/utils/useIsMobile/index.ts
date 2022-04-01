import { ref, onMounted, computed, onUnmounted } from 'vue';

export const useIsMobile = () => {
	const width = ref(0);
	const isMobile = computed(() => width.value < 768);

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
