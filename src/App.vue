<template>
	<div class="relative w-screen h-screen overflow-hidden">
		<component :is="'View' + currentView"></component>
		<UiAlert 
			v-if="hasAlert"
			:message="alertMessage"
		/>
	</div>
</template>

<script>
import { computed, } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Messaging App',
  setup() {
    const store = useStore()
    const hasAlert = computed(() => {
      return store.getters.isAlertVisible
    })
    const alertMessage = computed(() => {
      return store.getters.alertMessage
    })
		const currentView = computed(() => {
			return store.getters.route
		})
		const isAuthenticated = computed(() => {
			return store.getters.isAuthenticated
		})

		const getUrlParam = (param, url) => {
			if (!url) url = window.location.href;
				const name = param.replace(/[[]]/g, "\\$&");
				var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';

			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}

		const auth_param_user = getUrlParam(process.env.VUE_APP_USERNAME_PARAM) 
		const auth_param_pass = getUrlParam(process.env.VUE_APP_PASSWORD_PARAM)
		const hasAuthParams = !!auth_param_user && !!auth_param_pass

		if (hasAuthParams) {
			store.dispatch('userLogout')
			store.dispatch('userLogin', {
				username: auth_param_user,
				password: auth_param_pass
			})

			window.history.pushState({}, '', '/');

			store.dispatch('setRoute', 'Home')
		}
		else if (!hasAuthParams && isAuthenticated.value && currentView.value === 'Auth') {
			store.dispatch('setRoute', 'Home')
		}
		else if (!hasAuthParams && !isAuthenticated.value && currentView.value !== 'Auth') {
			store.dispatch('setRoute', 'Auth')
			store.dispatch('setAuthForm', 'login')
		}

    return {
      hasAlert,
      alertMessage,
			currentView
    }
  }
}
</script>
