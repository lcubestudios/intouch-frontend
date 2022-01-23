<template>
	<header class="relative flex flex-row flex-nowrap items-center w-full h-toolbar text-white bg-gray-500">
		<div class="w-toolbar text-center px-2">
			<slot name="left">
			</slot>
		</div>
		<div class="flex-1 px-2 text-center">
			<slot name="center">
			</slot>
		</div>
		<div class="w-toolbar text-center px-2">
			<slot name="right">
			</slot>
		</div>
	</header>
</template>

<script>
export default {
	name: 'PageHeader',
	setup() {
		
	},
}
</script>