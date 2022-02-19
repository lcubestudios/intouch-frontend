<template>
	<div id="alert" class="absolute z-[999999] inset-0 w-full h-full" @click="hideAlert">
		<div class="absolute w-full h-full bg-black opacity-30"></div>
		<div class="absolute bottom-0 h-min-100px h-max-1/2 bg-gray-200 px-6 pt-6 pb-24 rounded-t-lg left-1/2 transform -translate-x-1/2">
			<div class="flex flex-col w-full h-full">
				<header>
					<h1 class="text-7xl md:text-8xl text-center">WHOOPS</h1>
					<h2 class="text- font-medium mt-2">SOMETHING WENT WRONG</h2>
				</header>
				<section class="flex-1 mt-12 text-alert">
					{{ message || 'An error has occured! Please try again later.' }}
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'

export default {
	name: 'alert',
	props: {
		message: {
			type: String,
			default: 'An error has occured! Please try again later.'
		}
	},
	setup() {
		const store = useStore();
		const hideAlert = () => {
			store.dispatch('hideAlert')
		}

		return {
			hideAlert
		}
	},
}
</script>