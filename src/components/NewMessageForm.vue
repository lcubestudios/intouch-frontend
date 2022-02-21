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
    />
    <button type="submit" class="ml-4"><mdicon name="send" /></button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "NewMessageForm",
  setup() {
    const store = useStore()
    const body = ref('')
    const sendMessage = () => {
      store.dispatch('sendMessage', {
				phone_number: store.getters.currContact.phone_number,
				body_text: body.value
			})
    }

    return {
      body,
      sendMessage
    }
  },
};
</script>