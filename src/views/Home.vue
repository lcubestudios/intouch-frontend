<template>
	<div class="w-full h-full md:flex md:flex-row">
		<ContactView 
			class="md:flex md:min-w-360px md:w-1/4"
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
		/>
	</div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
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

		const getContacts = () => {
			store.dispatch('getContacts')
		}

		let reloadContacts

		onMounted(() => {
			reloadContacts = setInterval(getContacts, 2000)
		})

		onUnmounted(() => {
			clearInterval(reloadContacts)
			store.dispatch('setView', 'contacts')
		})

		return {
			currView,
			contacts,
		}
	},
	beforeMount() {

	}
}
</script>