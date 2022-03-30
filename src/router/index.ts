import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import WhitePaper from '@/views/WhitePaper.vue';
import NotFound from '@/views/NotFound.vue';
import Stake from '@/views/Stake.vue';

const routes: Array<RouteRecordRaw> = [
	{ path: '/', component: Home, meta: { title: 'Home' } },
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
