<template>
	<div class="relative w-screen h-screen">
		<component :is="'View' + currentView"></component>
		<UiAlert 
			v-if="hasAlert"
			:message="alertMessage"
		/>
	</div>
</template>

<script>
import { computed } from 'vue'
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

		store.dispatch('setRoute', 'Home')

		if (isAuthenticated.value && currentView.value === 'Auth') store.dispatch('setRoute', 'Home')
		else if (!isAuthenticated.value && currentView.value !== 'Auth') store.dispatch('setRoute', 'Auth')

    return {
      hasAlert,
      alertMessage,
			currentView
    }
  }
}
</script>
