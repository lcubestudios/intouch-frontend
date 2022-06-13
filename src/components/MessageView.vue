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
      <div ref="responses" class="h-full overflow-scroll">
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
      <NewMessageForm 
				v-if="currContact"
				:on-submit="scrollToBottom"
			/>
    </UiFooter>
  </section>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MessageView',
  setup() {
		const responses = ref(null)
    const store = useStore()
    const profile = computed(() => {
      return store.getters?.profile
    })

		const messages = computed(() => {
			return store.getters.messages
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
			await store.dispatch('deleteContact', currContact.value.username)
			await store.dispatch('setCurrContact', [])
			await store.dispatch('setMessages', [])
			location.reload();
		}
		
		const deleteMessages = async () => {
			await store.dispatch('deleteMessages', currContact.value.username)
		}

		const getMessages = async () => {
			console.log('reloading messages')
			await store.dispatch('getMessages', currContact.value.username)
		}

		let firstScroll = false
		let isLoading = ref(true)
		let reloadMessage

		watch(currContact, (newVal, oldVal) => {
			if (newVal?.username && newVal?.username !== oldVal?.username) {
				isLoading.value = true
				clearInterval(reloadMessage)
				reloadMessage = setInterval(getMessages, 3000)
				setTimeout(() => {
					scrollToBottom()
					isLoading.value = false
				}, 200)
			}
			else {
				console.log('stop message reload')
				clearInterval(reloadMessage)
			}
		})
		
		watch(messages, (newVal) => {
			firstScroll = false
			if (newVal.length && !firstScroll) {
				setTimeout(() => {
					scrollToBottom()
				}, 200)
				firstScroll = true
			}
		})

		const scrollToBottom = () => {
			console.log('scroll to bottom')
			console.log('responses')
			responses.value.scrollTop = responses.value.scrollHeight
		}

		onMounted(() => {
			if (currContact.value?.username) {
				reloadMessage = setInterval(getMessages, 3000)
				setTimeout(() => {
					isLoading.value = false
				}, 200)
			}
			else {
				isLoading.value = false
			}
			
			scrollToBottom()
		})

		onUnmounted(() => {
			clearInterval(reloadMessage)
			firstScroll = false
		})

    return {
      profile,
			messages,
			currContact,
      showNewContactModal,
			goToContacts,
			deleteContact,
			deleteMessages,
			scrollToBottom,
			contactName,
			responses,
			isLoading
    }
  },
}
</script>