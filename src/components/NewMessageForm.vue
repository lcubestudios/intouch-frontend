<template>
  <form
    @submit.prevent="sendMessage"
    class="flex flex-row flex-nowrap w-full h-full py-3 px-4"
  >
    <input
      v-model="body"
      id="body"
      name="body"
      type="text"
      class="flex-1 h-full rounded-full border border-gray-200 px-4 text-sm text-black"
      placeholder="Send a message..."
			required
    />
    <button type="submit" class="ml-4"><mdicon name="send" /></button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "NewMessageForm",
	props: {
		onSubmit: {
			type: Function,
			default: () => {}
		}
	},
  setup(props) {
    const store = useStore()
    const body = ref('')
    const sendMessage = async () => {
      await store.dispatch('sendMessage', {
				username: store.getters.currContact.username,
				body_text: body.value
			})

      props.onSubmit()

			body.value = ''
    }

    return {
      body,
      sendMessage
    }
  },
};
</script>