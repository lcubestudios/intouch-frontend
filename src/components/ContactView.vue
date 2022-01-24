<template>
  <section
    class="relative w-full h-full flex flex-col md:border-r md:border-gray-200"
  >
    <UiHeader title="CONTACTS">
      <template v-slot:dropdown>
        <UserMenu />
      </template>
    </UiHeader>
    <main class="relative flex-1 overflow-hidden">
      <div class="h-full overflow-scroll">
        <ContactListItem 
					v-for="(contact) in contacts" 
					:key="contact.uid" 
					:item="contact"
				/>
      </div>
    </main>
    <UiFooter class="justify-center top-round">
      <button class="relative btn-icon" @click="showNewContactModal">
        <mdicon name="plus" />
      </button>
    </UiFooter>
    <NewContactForm />
  </section>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'ContactView',
	props: {
		contacts: {
			type: Array,
			default: () => []
		}
	},
  setup() {
    const store = useStore()
    const showNewContactModal = () => {
      store.dispatch('showModal', 'NewContact')
    }

    return {
      showNewContactModal,
    }
  },
}
</script>