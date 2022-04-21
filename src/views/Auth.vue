<template>
	<div class="block relative container w-full max-w-360px h-full mr-auto ml-auto pt-10">
		<div class="p-4">
			<div class="mb-8">
				<img v-if="logo" class="mx-auto w-9/12" :src="logo" alt="{{ title || fallback_title }}"/>
				<h1 v-else-if="title" class="title text-5xl text-primary">{{ title }}</h1>
				<h1 v-else class="title text-7xl w-240px mx-auto break-all text-primary">{{ fallback_title }}</h1>
			</div>
			<LoginForm v-if="authForm === 'login'" />
			<RegForm v-else-if="authForm === 'reg'" />
		</div>
	</div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const fallback_title = 'MESSAGING APP'
const title = process.env.VUE_APP_PROJECT_TITLE
const logo = process.env.VUE_APP_LOGO

const authForm = computed(() => {
	return store.getters.authForm
})
</script>

<style scoped>
.title {
	text-align: left;
	font-weight: 700;
	text-transform: uppercase;
	line-height: 1;
}
</style>