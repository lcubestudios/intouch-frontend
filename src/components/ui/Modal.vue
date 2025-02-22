<template>
	<div v-show="isVisible" :id="id" class="modal absolute z-40 inset-0 w-full h-full">
		<div class="absolute w-full h-full bg-white opacity-20" @click="hideModal"></div>
		<div class="modal-content absolute bottom-0 left-0 right-0 w-full h-min-100px h-max-1/2 bg-modal-bg py-2">
			<div class="flex flex-col w-full h-full">
				<header class="flex flex-row items-center">
					<div class="w-40px h-40px"></div>
					<div class="flex-1 text-center text-sm">{{ title }}</div>
					<button class="btn-icon w-40px h-40px" @click="hideModal"><mdicon name="close" /></button>
				</header>
				<section class="flex-1 p-4">
					<slot />
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Modal',
	props: {
		id: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ''
		}
	},
	setup(props) {
		const { id } = toRefs(props)
		const store = useStore()
		const isVisible = computed(() => {
			return store.getters[`is${ id.value }ModalVisible`]
		})

		const hideModal = () => {
			store.dispatch(`hideModal`, id.value)
		}

		return {
			isVisible,
			hideModal
		}
	},
}
</script>

<style scoped>
.modal-content {
	background: var(--modal-bg);
	background: -moz-linear-gradient(0deg, var(--modal-gradient) 0%, rgba(255,255,255,0) 50%);
	background: -webkit-linear-gradient(0deg, var(--modal-gradient) 0%, rgba(255,255,255,0) 50%);
	background: linear-gradient(0deg, var(--modal-gradient) 0%, rgba(255,255,255,0) 50%);
}
</style>