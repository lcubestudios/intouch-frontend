<template>
	<div 
		class="mb-4 p-4 rounded-lg" 
		:class="{
			'bg-gray-200': isSender,
			'rounded-tr-none': isSender,
			'bg-gray-400': !isSender,
			'rounded-tl-none': !isSender,
		}"
	>
		{{ body }}
	</div>
</template>

<script>
export default {
	name: 'MessageBubble',
	props: {
		body: {
			type: String
		},
		isSender: {
			type: Boolean
		}
	},
	setup() {
	},
}
</script>