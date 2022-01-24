<template>
	<UiModal
		id="NewContact"
		title="ADD NEW CONTACT"
	>
		<form @submit.prevent="addNewContact" class="pt-10 pb-16">
			<div class="form-field">
				<input v-model="phone_number" id="phone_number" name="phone_number" class="my-2 bg-gray-300" type="text" placeholder="Phone number..." />
			</div>
			<button type="submit" class="btn block m-auto bg-gray-600 text-white hover:bg-gray-700 mt-8">ADD</button>
		</form>
	</UiModal>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
	name: 'NewContactForm',
	setup() {
		const store = useStore()
		const phone_number = ref('')
		const addNewContact = () => {
			store.dispatch('getContacts')
			store.dispatch('hideModal', 'NewContact')
		}

		return {
			phone_number,
			addNewContact
		}
	},
}
</script>