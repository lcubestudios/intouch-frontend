<template>
  <section class="w-full h-full flex flex-col">
    <UiHeader title="xxx.xxx.xxxx">
      <template v-slot:left>
        <button @click="goToContacts" class="md:hidden">
          <mdicon name="arrow-left" />
        </button>
      </template>
      <template v-slot:dropdown>
        <button class="dropdown-menu-item border-t border-gray-200">
          DELETE MESSAGES
        </button>
        <button class="dropdown-menu-item border-t border-gray-200">
          DELETE CONTACT
        </button>
      </template>
    </UiHeader>
    <main class="relative flex-1 overflow-hidden">
      <div class="h-full overflow-scroll">
        <div class="flex flex-col p-4">
          <MessageItem
						v-for="(message, ndx) in messages"
						:key="ndx" 
						:item="message" 
					/>
        </div>
      </div>
    </main>
    <UiFooter class="justify-center">
      <NewMessageForm />
    </UiFooter>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MessageView',
	props: {
		messages: {
			type: Object,
			default: () => {}
		}
	},
  setup() {
    const store = useStore()
    const profile = computed(() => {
      return store.getters?.profile
    })
    const showNewContactModal = () => {
      store.dispatch('showModal', 'NewContact')
    }
		const goToContacts = () => {
			store.dispatch('setView', 'contacts')
		}
		const currContact = computed(() => {
			return store.getters.currContact
		})

    return {
      profile,
			currContact,
      showNewContactModal,
			goToContacts
    }
  },
}
</script>