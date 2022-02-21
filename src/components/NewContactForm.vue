<template>
	<UiModal
		id="NewContact"
		title="ADD NEW CONTACT"
	>
		<form @submit.prevent="addNewContact" class="pt-10 pb-16">
			<div class="form-field">
				<input v-model="phone_number" id="phone_number" name="phone_number" class="my-2" type="text" placeholder="Phone number..." />
			</div>
			<button type="submit" class="btn block m-auto bg-primary text-white mt-8">ADD</button>
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
			const payload = {
				phone_number: phone_number.value
			}
			store.dispatch('addContact', payload)
			store.dispatch('hideModal', 'NewContact')
		}

		return {
			phone_number,
			addNewContact
		}
	},
}
</script>