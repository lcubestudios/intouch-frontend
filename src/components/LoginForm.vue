<template>
	<form @submit.prevent="userLogin" class="flex flex-col p-4">
		<div class="profile-icon-xl mx-auto mb-4">
		</div>
		<div class="form-field">
			<input v-model="phone_number" id="phone_number" name="phone_number" class="my-2" type="text" placeholder="Phone number" required />
		</div>
		<div class="form-field">
			<input v-model="password" id="password" name="password" class="my-2" type="password" placeholder="Password" required />
		</div>
		<button type="submit" class="btn bg-primary text-white hover:bg-gray-700 mt-8">LOG IN</button>
		<div class="mt-4 text-center">
			<small>Don't have an account yet? <button class="text-primary" @click="toggleRegForm()">SIGN UP</button></small>
		</div>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'LoginForm',
	setup() {
		const store = useStore()
		const phone_number = ref('')
		const password = ref('')

		const toggleRegForm = () => {
			store.dispatch('setAuthForm', 'reg')
		}

		const userLogin = async () => {
			const payload = {
				phone_number: phone_number.value,
				password: password.value
			}

			const login = await store.dispatch('userLogin', payload)

			if (login) {
				store.dispatch('setRoute', 'Home')
			}
		}

		return {
			toggleRegForm,
			userLogin,
			phone_number,
			password
		}
	},
}
</script>