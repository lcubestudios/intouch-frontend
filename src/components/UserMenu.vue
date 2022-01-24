<template>
  <div>
    <header class="py-4">
      <div class="profile-icon mx-auto mb-2"></div>
      <span>{{ profile?.phone_number }}</span>
    </header>
    <button class="dropdown-menu-item border-t border-gray-200" @click="userLogout">LOG OUT</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'DropdownUserMenu',
  setup() {
		const router = useRouter()
		const store = useStore()
    const profile = computed(() => {
      return store.getters?.profile
    })
    const userLogout = () => {
      store.dispatch("userLogout")
      router.push("/auth")
    }

		return {
      profile,
			userLogout,
		}
	},
}
</script>