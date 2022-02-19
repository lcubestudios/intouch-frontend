<template>
	<div class="relative w-screen h-screen overflow-scroll">
		<router-view />
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

    return {
      hasAlert,
      alertMessage
    }
  }
}
</script>
