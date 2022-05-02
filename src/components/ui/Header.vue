<template>
  <header class="relative z-10 flex flex-row flex-nowrap items-center w-full h-toolbar min-h-toolbar text-white bg-primary overflow-visible">
    <div class="flex justify-center items-center w-toolbar text-center px-2">
      <slot name="left"> </slot>
    </div>
    <div class="flex-1 px-2 text-center">
      {{ title }}
    </div>
    <div class="flex justify-center items-center w-toolbar text-center px-2">
			<button v-if="isDropdownVisible" @click="hideDropdown">
				<mdicon name="chevron-up" />
			</button>
			<button v-else @click="showDropdown"><mdicon name="chevron-down" /></button>
    </div>
    <div
      v-if="isDropdownVisible"
      v-click-outside="hideDropdown"
      class="min-w-150px absolute right-0 bottom-0 transform translate-y-full bg-white text-black text-xs text-center
       border border-gray-200"
      >
      <slot name="dropdown"> </slot>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import vClickOutside from 'click-outside-vue3'

export default {
  name: 'PageHeader',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const isDropdownVisible = ref(false)
    const showDropdown = () => {
      isDropdownVisible.value = true
    }
    const hideDropdown = () => {
      isDropdownVisible.value = false
    }
    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value
    }

    return {
      isDropdownVisible,
      showDropdown,
      hideDropdown,
      toggleDropdown,
    }
  },
}
</script>