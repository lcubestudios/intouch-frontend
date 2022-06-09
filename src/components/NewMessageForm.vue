<template>
  <form
    @submit.prevent="sendMessage"
    class="flex flex-row flex-nowrap justify-end w-full h-full py-2 px-4"
  >
		<div class="preview-overlay absolute bg-white p-4" v-show="hasPreviewImage && previewImageSrc">
			<button
				type="button"
				class="absolute top-0 right-0 text-primary m-2"
				@click="clearImage"
			><mdicon name="close" /></button>
			<img
				v-if="hasPreviewImage"
				class="preview-image"
				:alt="previewImageAlt"
				:src="previewImageSrc"
			/>
		</div>
    <input
			v-if="!hasPreviewImage"
      v-model="body"
      id="body"
      name="body"
      type="text"
      class="flex-1 h-full rounded-full border border-gray-200 px-4 text-sm text-black"
      placeholder="Send a message..."
			required
    />
		<input 	
			class="hidden"
			type="file"
			ref="inputUpload" 
			@change="checkPreviewImage"
			accept="image/*"
		>
		<button v-if="!hasPreviewImage" type="button" class="ml-4" @click="selectUpload"><mdicon name="image" /></button>
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
		const inputUpload = ref(null)

		const selectUpload = () => {
			inputUpload.value.click()
		}
		
		const hasPreviewImage = ref(false)
		const previewImageAlt = ref(null)
		const previewImageSrc = ref(null)

		const checkPreviewImage = () => {
			const [file] = inputUpload.value.files
			if (file) {
				hasPreviewImage.value = true
				previewImageAlt.value = file.name
				// previewImageSrc.value = URL.createObjectURL(file)
				const reader = new FileReader
				reader.readAsDataURL(file)
				reader.onload = (e) => {
					previewImageSrc.value = e.target.result
				}
			}
		}

		const clearImage = () => {
			hasPreviewImage.value = false
			inputUpload.value.value = ''
			previewImageAlt.value = null
			previewImageSrc.value = null
		}
		
    const sendMessage = async () => {
			let payload;
			if (hasPreviewImage.value) {
				payload = {
					username: store.getters.currContact.username,
					raw_data: previewImageSrc.value,
					message_type: 'image'
				}

				clearImage()
			}
			else {
				payload = {
					username: store.getters.currContact.username,
					body_text: body.value,
					message_type: 'text'
				}

				body.value = ''
			}


			await store.dispatch('sendMessage', payload)

      props.onSubmit()
    }

    return {
      body,
			inputUpload,
      sendMessage,
			selectUpload,
			hasPreviewImage,
			checkPreviewImage,
			previewImageAlt,
			previewImageSrc,
			clearImage
    }
  },
};
</script>

<style scoped>
.preview-overlay {
	bottom: var(--toolbar-height);
	left: 0;
	width: 100%;
	z-index: 999;
}

.preview-image {
	margin: 0 auto;
	max-height: 160px !important;
	max-width: 240px !important;
}
</style>