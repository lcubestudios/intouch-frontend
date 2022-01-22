<template>
	<main>
    Contacts
		<button @click="userLogout">LOG OUT</button>
	</main>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	name: 'Contacts',
	setup() {
		const router = useRouter()
		const store = useStore()
		const userLogout = () => {
			store.dispatch('userLogout')
			router.push('/auth')
		}

		return {
			userLogout
		}
	},
}
</script>