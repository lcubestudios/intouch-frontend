<template>
	<UiModal
		id="EditProfile"
		title="EDIT PROFILE"
	>
		<form @submit.prevent="updateProfile" class="pt-10 pb-16">
			<div class="form-field">
				<input v-model="first_name" id="first_name" name="first_name" class="my-2 bg-gray-300" type="text" placeholder="First Name" />
				<input v-model="last_name" id="last_name" name="last_name" class="my-2 bg-gray-300" type="text" placeholder="Last Name" />
			</div>
			<button type="submit" class="btn block m-auto bg-gray-600 text-white hover:bg-gray-700 mt-8">ADD</button>
		</form>
	</UiModal>
</template>

<script>
import { computed } from 'vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
	name: 'EditProfileForm',
	setup() {
		const store = useStore()
    const profile = computed(() => {
      return store.getters?.profile
    })

		const first_name = ref(profile.value.first_name)
		const last_name = ref(profile.value.last_name)

		// first_name.value = profile.value.first_name
		// last_name.value = profile.value.last_name

		const updateProfile = () => {
			store.dispatch('updateProfile', {
				first_name: first_name.value,
				last_name: last_name.value
			})
			store.dispatch('hideModal', 'EditProfile')
		}

		return {
			first_name,
			last_name,
      profile,
			updateProfile,
		}
	},
}
</script>