<template>
  <section class="w-full h-full flex flex-col">
    <UiHeader :title="contactName">
      <template v-slot:left>
        <button @click="goToContacts" class="md:hidden">
          <mdicon name="arrow-left" />
        </button>
      </template>
      <template v-slot:dropdown>
				<button class="dropdown-menu-item border-t border-gray-200" @click="deleteMessages">
					DELETE MESSAGES
				</button>
				<button class="dropdown-menu-item border-t border-gray-200" @click="deleteContact">
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
      <NewMessageForm v-if="currContact"/>
    </UiFooter>
  </section>
</template>

<script>
import { computed, watch, onMounted } from 'vue'
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
			store.dispatch('setCurrContact', null)
			store.dispatch('setMessages', [])
		}
		const currContact = computed(() => {
			return store.getters.currContact
		})

		const contactName = computed(() => {
			return currContact.value.first_name && currContact.value.last_name
				? currContact.value.first_name + ' ' + currContact.value.last_name
				: 'SELECT CONTACT TO VIEW MESSAGES'
		})
		
		const deleteContact = async () => {
			await store.dispatch('deleteContact', currContact.value.phone_number)
			await store.dispatch('setCurrContact', [])
			await store.dispatch('setMessages', [])
			location.reload();
		}
		
		const deleteMessages = async () => {
			await store.dispatch('deleteMessages', currContact.value.phone_number)
		}

		const getMessages = () => {
			console.log('reloading messages')
			store.dispatch('getMessages', currContact.value.phone_number)
		}

		let reloadMessage

		watch(currContact, (newVal) => {
			if (newVal?.phone_number) {
				reloadMessage = setInterval(getMessages, 3000)
			}
			else {
				console.log('stop message reload')
				clearInterval(reloadMessage)
			}
		})

		onMounted(() => {
			if (currContact.value?.phone_number) {
				reloadMessage = setInterval(getMessages, 3000)
			}
		})

    return {
      profile,
			currContact,
      showNewContactModal,
			goToContacts,
			deleteContact,
			deleteMessages,
			contactName
    }
  },
}
</script>