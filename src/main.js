import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.js"
import store from "./store/index.js"

import './assets/css/main.css'
import './assets/css/tailwind.css'

import LoginForm from './components/LoginForm.vue'

createApp(App)
	.use(router)
	.use(store)
	.component('LoginForm', LoginForm)
	.mount("#messaging-app");