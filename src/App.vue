<template>
  <router-view />
  <UiAlert 
    v-if="hasAlert"
    :message="alertMessage"
  />
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
