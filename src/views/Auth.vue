<template>
	<div class="block relative container w-full h-full mr-auto ml-auto pt-10">
		<div class="flex flex-col justify-start items-center p-4">
			<div class="mb-8 text-center">
				<img v-if="logo" class="mx-auto w-9/12" :src="logo" alt="{{ title || fallback_title }}"/>
				<h1 v-else-if="title" class="title text-5xl text-primary text-center">{{ title }}</h1>
			</div>
			<div class="w-full max-w-360px">
				<LoginForm v-if="authForm === 'login'" />
				<RegForm v-else-if="authForm === 'reg'" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const title = process.env.VUE_APP_PROJECT_TITLE || 'MESSAGING APP'
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