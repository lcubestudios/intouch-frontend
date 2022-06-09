<template>
	<div 
		class="message-bubble mb-4 p-4 rounded-lg break-all" 
		:class="{
			'bg-white': isSender,
			'rounded-tr-none': isSender,
			'bg-gray-001': !isSender,
			'float-right': isSender,
			'float-left': !isSender,
			'rounded-tl-none': !isSender,
			'message-type-text': type === 'text',
			'message-type-image': type === 'image'
		}"
	>
		<template v-if="type === 'text'">{{ body }}</template>
		<template v-if="type === 'image'">
			<img :src="body" />
		</template>
	</div>
</template>

<script>
export default {
	name: 'MessageBubble',
	props: {
		body: {
			type: String
		},
		type: {
			type: String,
			default: 'text'
		},
		isSender: {
			type: Boolean
		}
	},
	setup() {
	},
}
</script>

<style scoped>
.message-type-image {
	max-width: 500px;
}
</style>