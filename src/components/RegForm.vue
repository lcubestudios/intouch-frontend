<template>
	<form @submit.prevent="userReg" class="flex flex-col">
		<div class="form-field">
			<input v-model="first_name" id="first_name" name="first_name" class="my-2" type="text" placeholder="First Name" required />
		</div>
		<div class="form-field">
			<input v-model="last_name" id="last_name" name="last_name" class="my-2" type="text" placeholder="Last Name" required />
		</div>
		<div class="form-field">
			<input v-model="username" id="username" name="username" class="my-2" type="text" placeholder="Username" required />
		</div>
		<div class="form-field">
			<input v-model="password" id="password" name="password" class="my-2" type="password" placeholder="Password" autocomplete="on" required />
		</div>
		<div class="form-field">
			<input v-model="confirm_password" id="confirm_password" name="confirm_password" class="my-2" type="password" placeholder="Confirm Password" autocomplete="on" required />
		</div>
		<button type="submit" class="btn bg-primary text-white hover:bg-gray-700 mt-8">SIGN UP</button>
		<div class="mt-4 text-center">
			<small>Already have an account? <button class="text-primary" @click="toggleLoginForm()">LOG IN</button></small>
		</div>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'RegForm',
	setup() {
		const store = useStore()
		const first_name = ref('')
		const last_name = ref('')
		const username = ref('')
		const password = ref('')
		const confirm_password = ref('')

		const toggleLoginForm = () => {
			store.dispatch('setAuthForm', 'login')
		}

		const userReg = async () => {
			const payload = {
				first_name: first_name.value,
				last_name: last_name.value,
				username: username.value,
				password: password.value,
			}

			if (password.value !== confirm_password.value) {
				await store.dispatch('showAlert', 'passwords do not match.')
			}
			else {
				const reg = await store.dispatch('userReg', payload)

				if (reg) {
					store.dispatch('setRoute', 'Home')
				}
			}
		}

		return {
			toggleLoginForm,
			userReg,
			first_name,
			last_name,
			username,
			password,
			confirm_password
		}
	},
}
</script>