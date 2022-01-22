import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index.js';
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Message from "../views/Message.vue";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth
	},
	{
		path: '/message',
		name: 'Message',
		component: Message
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
	if (!store.getters.isAuthenticated && to.name !== 'Auth') next({ name: 'Auth' })
	else if (store.getters.isAuthenticated && to.name === 'Auth') next({ name: 'Home' })
	else next()
})

export default router