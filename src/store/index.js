import { createStore } from "vuex" 
import createPersistedState from "vuex-persistedstate"
import Cookies from "js-cookie"

const state = () => {
	return {
		token: null,
		isNewContactModalVisible: true
	}
}

const mutations = {
	setToken(state, val) {
		state.token = val
	},
	setModalVisibility(state, data) {
		state[`is${ data.id }ModalVisible`] = data.val
		console.log(state[`is${ data.id }ModalVisible`])
	}
}

const actions = {
	userLogin({ commit }) {
		commit('setToken', 'test');
	},
	userLogout({ commit }) {
		commit('setToken', null)
	},
	showModal({ commit }, id) {
		commit('setModalVisibility', { id, val: true })
	},
	hideModal({ commit }, id) {
		console.log(id)
		commit('setModalVisibility', { id, val: false })
	}
}

const getters = {
	isAuthenticated(state) {
		return !!state.token
	},
	isNewContactModalVisible(state) {
		return state.isNewContactModalVisible
	}
}

export default createStore({
	plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
	state,
	mutations,
	actions,
	getters
})