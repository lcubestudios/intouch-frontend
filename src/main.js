import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.js"
import store from "./store/index.js"

import './assets/css/main.css'
import './assets/css/tailwind.css'

import UiHeader from './components/ui/Header.vue'
import UiFooter from './components/ui/Footer.vue'
import UiModal from './components/ui/Modal.vue'
import LoginForm from './components/LoginForm.vue'
import NewContactForm from './components/NewContactForm.vue'
import Dropdown from './components/Dropdown.vue'
import ContactListItem from './components/ContactListItem.vue'

createApp(App)
	.use(router)
	.use(store)
	.component('UiHeader', UiHeader)
	.component('UiFooter', UiFooter)
	.component('UiModal', UiModal)
	.component('LoginForm', LoginForm)
	.component('NewContactForm', NewContactForm)
	.component('Dropdown', Dropdown)
	.component('ContactListItem', ContactListItem)
	.mount("#messaging-app");