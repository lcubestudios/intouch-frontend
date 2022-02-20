import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index.js';
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			authRequired: true
		}
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth
	}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
	if (to.matched.some(route => route.meta.authRequired)) {
		if (!store.getters.isAuthenticated) next({ path: '/auth' })
		else next()
	} 
	else {
		next()
	}
})

export default router