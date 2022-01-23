import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.js"
import store from "./store/index.js"

import './assets/css/main.css'
import './assets/css/tailwind.css'

import LoginForm from './components/LoginForm.vue'
import Dropdown from './components/Dropdown.vue'
import ContactList from './components/ContactList.vue'

createApp(App)
	.use(router)
	.use(store)
	.component('LoginForm', LoginForm)
	.component('Dropdown', Dropdown)
	.component('ContactList', ContactList)
	.mount("#messaging-app");