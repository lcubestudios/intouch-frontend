<template>
	<UiModal
		id="NewContact"
		title="ADD NEW CONTACT"
	>
		<form @submit.prevent="" class="pt-10 pb-16">
			<div class="form-field">
				<input id="phone_number" name="phone_number" class="my-2 bg-gray-300" type="text" placeholder="Phone number..." />
			</div>
			<button type="submit" class="btn block m-auto bg-gray-600 text-white hover:bg-gray-700 mt-8">ADD</button>
		</form>
	</UiModal>
</template>

<script>
export default {
	name: 'NewContactForm',
	setup() {
		
	},
}
</script>