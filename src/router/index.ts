import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';
import Stake from '@/views/Stake.vue';

const routes: Array<RouteRecordRaw> = [
	{ path: '/', component: Home, meta: { title: 'Home' } },
	{
		path: '/about',
		meta: { title: 'About' },
		component: About,
	},
	{ path: '/stake', component: Stake, meta: { title: 'Staking' } },
	{ path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
