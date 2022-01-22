<template>
	<form @submit.prevent="userLogin" class="flex flex-col p-4">
		<div class="block mx-auto w-36 h-36 bg-gray-500 rounded-full mb-4">
		</div>
		<div class="form-field">
			<input id="phone" name="phone" class="my-2 bg-gray-300" type="text" placeholder="phone number" />
		</div>
		<div class="form-field">
			<input id="password" name="password" class="my-2 bg-gray-300" type="password" placeholder="password" />
		</div>
		<button type="submit" class="btn bg-gray-500 text-white hover:bg-gray-700 mt-8">LOG IN</button>
	</form>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import postAuth from '../assets/data/post-auth.json'

export default {
	name: 'LoginForm',
	setup() {
		const router = useRouter()
		const store = useStore()
		const userLogin = () => {
			store.dispatch('userLogin')
		}

		console.log(router)
		console.log(postAuth)

		return {
			userLogin
		}
	},
}
</script>