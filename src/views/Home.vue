<template>
	<div class="w-full h-full md:flex md:flex-row">
		<ContactView 
			class="md:flex min-w-360px md:w-1/4"
			:class="{
				'hidden': currView !== 'contacts'
			}"
			:contacts="contacts"
		/>
		<MessageView 
			class="md:flex md:w-3/4" 
			:class="{
				'hidden': currView !== 'messages'
			}"
			:messages="messages"
		/>
	</div>
</template>

<script>
import { computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Contacts',
	setup() {
		const store = useStore()
		// store.dispatch('setContacts', dummyGetContacts.contacts)

		const currView = computed(() => {
			return store.getters.currView
		})
		const contacts = computed(() => {
			return store.getters.contacts
		})
		const messages = computed(() => {
			return store.getters.messages
		})

		onUnmounted(() => {
			store.dispatch('setView', 'contacts')
		})

		return {
			currView,
			contacts,
			messages,
		}
	},
	beforeMount() {

	}
}
</script>