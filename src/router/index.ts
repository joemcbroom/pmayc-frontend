import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import WhitePaper from '@/views/WhitePapers.vue';
import NotFound from '@/views/NotFound.vue';
import Stake from '@/views/Stake.vue';

const routes: Array<RouteRecordRaw> = [
	{ path: '/', component: HomePage, meta: { title: 'Home' } },
	{
		path: '/white-paper',
		meta: { title: 'White Paper' },
		component: WhitePaper,
	},
	{ path: '/stake', component: Stake, meta: { title: 'Staking' } },
	{ path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
