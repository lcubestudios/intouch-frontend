<template>
	<UiModal
		id="EditProfile"
		title="EDIT PROFILE"
	>
		<form @submit.prevent="updateProfile" class="pt-10 pb-16">
			<div class="form-field">
				<input v-model="first_name" id="first_name" name="first_name" class="my-2" type="text" :placeholder="current_first_name" />
				<input v-model="last_name" id="last_name" name="last_name" class="my-2" type="text" :placeholder="current_last_name" />
			</div>
			<button type="submit" class="btn block m-auto bg-primary text-white mt-8">SAVE</button>
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

		const first_name = ref('')
		const last_name = ref('')

		// first_name.value = profile.value.first_name
		// last_name.value = profile.value.last_name

		const current_first_name = computed(() => {
			return profile.value?.first_name || ''
		})

		const current_last_name = computed(() => {
			return profile.value?.last_name || ''
		})

		const updateProfile = () => {
			store.dispatch('updateProfile', {
				first_name: !first_name.value || !first_name.value === ''
					? current_first_name.value
					: first_name.value,
				last_name: !last_name.value || !last_name.value === ''
					? current_last_name.value
					: last_name.value
			})
			store.dispatch('hideModal', 'EditProfile')

			first_name.value = ''
			last_name.value = ''
		}

		return {
			first_name,
			last_name,
			current_first_name,
			current_last_name,
      profile,
			updateProfile,
		}
	},
}
</script>