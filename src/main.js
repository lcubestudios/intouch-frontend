import { createApp } from "vue"
import App from "./App.vue"
// import router from "./router/index.js"
import store from "./store/index.js"

import './assets/css/main.css'
import './assets/css/tailwind.css'

import vClickOutside from 'click-outside-vue3'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import ViewHome from './views/Home.vue'
import ViewAuth from './views/Auth.vue'

import UiHeader from './components/ui/Header.vue'
import UiFooter from './components/ui/Footer.vue'
import UiAlert from './components/ui/Alert.vue'
import UiModal from './components/ui/Modal.vue'
import LoginForm from './components/LoginForm.vue'
import RegForm from './components/RegForm.vue'
import NewContactForm from './components/NewContactForm.vue'
import NewMessageForm from './components/NewMessageForm.vue'
import UserMenu from './components/UserMenu.vue'
import ContactView from './components/ContactView.vue'
import MessageView from './components/MessageView.vue'
import ContactListItem from './components/ContactListItem.vue'
import MessageItem from './components/MessageItem.vue'
import MessageBubble from './components/MessageBubble.vue'
import EditProfileForm from './components/EditProfileForm.vue'

createApp(App)
	// .use(router)
	.use(store)
	.use(vClickOutside)
	.use(mdiVue, {
		icons: mdijs
	})
	.component('ViewHome', ViewHome)
	.component('ViewAuth', ViewAuth)
	.component('UiHeader', UiHeader)
	.component('UiFooter', UiFooter)
	.component('UiAlert', UiAlert)
	.component('UiModal', UiModal)
	.component('LoginForm', LoginForm)
	.component('RegForm', RegForm)
	.component('NewContactForm', NewContactForm)
	.component('NewMessageForm', NewMessageForm)
	.component('UserMenu', UserMenu)
	.component('ContactView', ContactView)
	.component('MessageView', MessageView)
	.component('ContactListItem', ContactListItem)
	.component('MessageItem', MessageItem)
	.component('MessageBubble', MessageBubble)
	.component('EditProfileForm', EditProfileForm)
	.mount("#messaging-app");