<template>
	<div class="w-full h-full flex flex-col">
		<UiHeader>
			<template v-slot:center>
				Header
			</template>
			<template v-slot:right>
				<button @click="toggleDropdown">Y</button>
			</template>
		</UiHeader>
		<main class="relative flex-1 bg-pink-100 overflow-hidden">
			<div class="h-full overflow-scroll">
				<ContactListItem
					v-for="(contact, ndx) in contacts"
					:key="ndx"
				/>
			</div>
		</main>
		<UiFooter class="justify-center top-round">
			<button class="relative btn-icon" @click="showNewContactModal">ADD</button>
		</UiFooter>
	</div>
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
		const toggleDropdown = () => {
			console.log('dropdown');
		}
		const showNewContactModal = () => {
			store.dispatch(`showModal`, 'NewContact')
		}

		return {
			userLogout,
			toggleDropdown,
			showNewContactModal,
			contacts: [{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1},{val:1}]
		}
	},
}
</script>