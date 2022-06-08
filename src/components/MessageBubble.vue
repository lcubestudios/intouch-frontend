<template>
	<div 
		class="mb-4 p-4 rounded-lg break-all" 
		:class="{
			'bg-white': isSender,
			'rounded-tr-none': isSender,
			'bg-gray-001': !isSender,
			'rounded-tl-none': !isSender,
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