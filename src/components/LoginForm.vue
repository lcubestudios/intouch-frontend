<template>
	<form @submit.prevent="userLogin" class="flex flex-col p-4">
		<div class="profile-icon-xl mx-auto mb-4">
		</div>
		<div class="form-field">
			<input v-model="phone_number" id="phone_number" name="phone_number" class="my-2" type="text" placeholder="phone number" required />
		</div>
		<div class="form-field">
			<input v-model="password" id="password" name="password" class="my-2" type="password" placeholder="password" required />
		</div>
		<button type="submit" class="btn bg-primary text-white hover:bg-gray-700 mt-8">LOG IN</button>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'LoginForm',
	setup() {
		const router = useRouter()
		const store = useStore()
		const phone_number = ref('')
		const password = ref('')
		const userLogin = () => {
			const payload = {
				phone_number: phone_number.value,
				password: password.value
			}

			store.dispatch('userLogin', payload)
				.then(() => {
					router.push('/')
				})
				.catch((err) => {
					store.dispatch('showAlert', err.error_message)
				})
		}

		return {
			userLogin,
			phone_number,
			password
		}
	},
}
</script>