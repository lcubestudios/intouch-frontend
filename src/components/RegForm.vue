<template>
	<form @submit.prevent="userLogin" class="flex flex-col p-4">
		<div class="profile-icon-xl mx-auto mb-4">
		</div>
		<div class="form-field">
			<input v-model="first_name" id="first_name" name="first_name" class="my-2" type="text" placeholder="First Name" required />
		</div>
		<div class="form-field">
			<input v-model="phone_number" id="Last Name" name="Last Name" class="my-2" type="text" placeholder="Last Name" required />
		</div>
		<div class="form-field">
			<input v-model="phone_number" id="phone_number" name="phone_number" class="my-2" type="text" placeholder="phone number" required />
		</div>
		<div class="form-field">
			<input v-model="password" id="password" name="password" class="my-2" type="password" placeholder="password" required />
		</div>
		<div class="form-field">
			<input v-model="confirm_password" id="confirm_password" name="confirm_password" class="my-2" type="password" placeholder="password" required />
		</div>
		<button type="submit" class="btn bg-primary text-white hover:bg-gray-700 mt-8">LOG IN</button>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'RegForm',
	setup() {
		const router = useRouter()
		const store = useStore()
		const first_name = ref('')
		const last_name = ref('')
		const phone_number = ref('')
		const password = ref('')
		const confirm_password = ref('')
		const userLogin = () => {
			const payload = {
				first_name: first_name.value,
				last_name: last_name.value,
				phone_number: phone_number.value,
				password: password.value,
				confirm_password: confirm_password.value,
			}

			store.dispatch('userReg', payload)
				.then(() => {
					router.push('/')
				})
				.catch((err) => {
					store.dispatch('showAlert', err.error_message)
				})
		}

		return {
			userLogin,
			first_name,
			last_name,
			phone_number,
			password,
			confirm_password
		}
	},
}
</script>