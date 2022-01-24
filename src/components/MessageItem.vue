<template>
	<div class="w-full">
		<div v-if="item.isSender" class="flex flex-row flex-nowrap mb-2">
			<div class="invisible profile-icon mr-4"></div>
			<div class="flex-1">
				<MessageBubble 
					v-for="(message, ndx) in item.messages"
					:key="ndx"
					:isSender="item.isSender"
					:body="message.body"
				/>
			</div>
		</div>
		<div v-else class="flex flex-row flex-nowrap mb-2">
			<div class="profile-icon mr-4"></div>
			<div class="flex-1">
				<MessageBubble 
					v-for="(message, ndx) in item.messages"
					:key="ndx"
					:isSender="item.isSender"
					:body="message.body"
				/>
			</div>
			<div class="invisible profile-icon ml-4"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MessageItem',
	props: {
		item: {
			type: Object,
		}
	},
	setup() {
	},
}
</script>