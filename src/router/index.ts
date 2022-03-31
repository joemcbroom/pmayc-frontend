import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import WhitePaper from '@/views/WhitePapers.vue';
import NotFound from '@/views/NotFound.vue';
import Stake from '@/views/Stake.vue';
import ViewMutants from '@/views/ViewMutants.vue';

export const routes: Array<RouteRecordRaw> = [
	{ path: '/', component: HomePage, meta: { title: 'Home' }, name: 'Home' },
	{
		path: '/white-paper',
		meta: { title: 'White Paper' },
		name: 'White Paper',
		component: WhitePaper,
	},
	{
		path: '/stake',
		component: Stake,
		meta: { title: 'Staking' },
		name: 'Stake',
	},
	{
		path: '/mutants',
		component: ViewMutants,
		meta: { title: 'View Mutants' },
		name: 'Mutants',
	},
	{ path: '/:path(.*)', component: NotFound, name: 'NotFound' },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
