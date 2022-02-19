<template>
	<div class="block relative container w-full max-w-360px h-full mr-auto ml-auto pt-20">
		<LoginForm v-if="authForm === 'login'" />
		<RegForm v-else-if="authForm === 'reg'" />
	</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
	name: 'Contacts',
	setup() {
		const store = useStore()
		const authForm = computed(() => {
			return store.getters.authForm
		})

		return {
			authForm
		}
	},
}
</script>