<template>
	<div class="w-full">
		<div v-if="item.is_sender" class="flex flex-row flex-nowrap mb-2">
			<div class="invisible profile-icon mr-4"></div>
			<div class="flex-1">
				<MessageBubble 
					:isSender="item.is_sender"
					:body="item.body_text"
					:type="item.message_type"
				/>
			</div>
		</div>
		<div v-else class="flex flex-row flex-nowrap mb-2">
			<div class="profile-icon bg-primary mr-4"></div>
			<div class="flex-1">
				<MessageBubble 
					:isSender="item.is_sender"
					:body="item.body_text"
					:type="item.message_type"
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