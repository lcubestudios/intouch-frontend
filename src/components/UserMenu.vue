<template>
  <div>
    <header class="py-4">
      <div class="profile-icon mx-auto mb-2"></div>
			<div class="mb-1"><span>{{ profile?.first_name }} {{ profile?.last_name }}</span></div>
      <div><span>{{ profile?.phone_number }}</span></div>
    </header>
    <button class="dropdown-menu-item border-t border-gray-200" @click="showEditProfileModal">EDIT PROFILE</button>
    <button class="dropdown-menu-item border-t border-gray-200" @click="userLogout">LOG OUT</button>
    <button class="dropdown-menu-item border-t border-gray-200" @click="getContacts">GET CONTACTS</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'DropdownUserMenu',
  setup() {
		const store = useStore()
    const profile = computed(() => {
      return store.getters?.profile
    })
    const userLogout = () => {
      store.dispatch('userLogout')
      store.dispatch('setRoute', 'Auth')
    }

    const showEditProfileModal = () => {
      store.dispatch('showModal', 'EditProfile')
    }

    const getContacts = () => {
      store.dispatch('getContacts')
    }

		return {
      profile,
			userLogout,
      showEditProfileModal,
			getContacts
		}
	},
}
</script>