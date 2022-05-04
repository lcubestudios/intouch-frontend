<template>
	<UiModal
		id="NewContact"
		title="ADD NEW CONTACT"
	>
		<form @submit.prevent="addNewContact" class="pt-10 pb-16">
			<div class="form-field">
				<input v-model="username" id="username" name="username" class="my-2" type="text" placeholder="Username" />
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
		const username = ref('')
		const addNewContact = () => {
			const payload = {
				username: username.value
			}
			store.dispatch('addContact', payload)
			store.dispatch('hideModal', 'NewContact')

			username.value = ''
		}

		return {
			username,
			addNewContact
		}
	},
}
</script>