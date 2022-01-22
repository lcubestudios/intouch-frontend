import { createStore } from "vuex" 
import createPersistedState from "vuex-persistedstate"
import Cookies from "js-cookie"

const state = () => {
	return {
		token: null
	}
}

const mutations = {
	setToken(state, val) {
		state.token = val
	}
}

const actions = {
	userLogin({ commit }) {
		commit('setToken', 'test');
	},
	userLogout({ commit }) {
		commit('setToken', null)
	}
}

const getters = {
	isAuthenticated(state) {
		return !!state.token
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