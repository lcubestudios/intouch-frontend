<template>
  <div class="flex flex-row flex-nowrap w-full bg-white h-80px border-b border-gray-200 cursor-pointer">
    <div class="w-full flex items-center justify-between px-4">
      <div class="relative" @click="goToMessages(item.phone_number)">
        <div class="profile-icon"></div>
        <span 
          v-if="item.unread_count && item.unread !== '0'"
          class="absolute top-0 right-0 flex justify-center items-center w-5 h-5 rounded-full text-xs bg-alert text-white"
        >
          {{ item.unread_count }}
        </span>
      </div>
      <div class="flex-1 text-left px-4" @click="goToMessages(item.phone_number)">
        {{ item.phone_number }}
      </div>
      <div v-if="!isToolbarVisible" class="flex items-center justify-center">
        <button class="relative btn-icon" @click="showToolbar">
          <mdicon name="dots-vertical" />
        </button>
      </div>
    </div>
    <div v-if="isToolbarVisible" class="flex items-center justify-center">
      <button
        class="relative btn-icon bg-alert text-white flex items-center justify-center w-80px h-80px"
        @click="deleteContact(item.phone_number)"
        v-click-outside="hideToolbar"
      >
        <mdicon name="delete" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import vClickOutside from 'click-outside-vue3'

export default {
  name: 'ContactListItem',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    item: {
      type: [Object],
    },
  },
  setup() {
    const store = useStore()
    const isToolbarVisible = ref(false)
    const showToolbar = () => {
      isToolbarVisible.value = true
    }
    const hideToolbar = () => {
      isToolbarVisible.value = false
    }
    const goToMessages = (phone_number) => {
      store.dispatch('setView', 'messages')
      store.dispatch('setCurrContact', phone_number)
      store.dispatch('getMessages', phone_number)
    }
    const deleteContact = (phone_number) => {
      store.dispatch('deleteContact', phone_number)
    }

    return {
      isToolbarVisible,
      showToolbar,
      hideToolbar,
      goToMessages,
      deleteContact,
    }
  },
}
</script>