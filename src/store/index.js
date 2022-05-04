import { createStore } from 'vuex' 
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import Cookies from 'js-cookie'

const api_url = process.env.VUE_APP_API_URL

const state = () => {
	return {
		route: 'Home',
		authForm: 'login',
		profile: null,
		isNewContactModalVisible: false,
		isEditProfileModalVisible: false,
		isAlertVisible: false,
		alertMessage: null,
		currView: 'contacts',
		currContact: [],
		contacts: [],
		messages: [],
	}
}

const mutations = {
	setRoute(state, val) {
		state.route = val
	},
	setAuthForm(state, val) {
		state.authForm = val
	},
	setProfile(state, val) {
		state.profile = val
	},
	setModalVisibility(state, data) {
		state[`is${ data.id }ModalVisible`] = data.val
	},
	setAlertVisibility(state, val) {
		state.isAlertVisible = val
	},
	setAlertMessage(state, val) {
		state.alertMessage = val
	},
	setCurrView(state, val) {
		state.currView = val
	},
	setCurrContact(state, val) {
		state.currContact = val
	},
	setContacts(state, data) {
		state.contacts = data
	},
	setMessages(state, data) {
		state.messages = data
	}
}

const actions = {
	setRoute({ commit }, val) {
		commit('setRoute', val)
	},
	setAuthForm({ commit }, val) {
		commit('setAuthForm', val)
	},
	async userReg({ dispatch, commit }, payload) {
		return await axios
			.post(
				api_url + `/auth.php?purpose=reg`,
				payload,
				{
					headers: {
						'Content-Type': 'text/json'
					}
				}
			)
			.then(({ data }) => {	
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					commit('setProfile', data.results)
					dispatch('getContacts', data.results.token)

					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	async userLogin({ dispatch, commit }, payload) {
		return await axios
			.post(
				api_url + '/auth.php?purpose=login', 
				payload,
				{
					headers: {
						'Content-Type': 'text/json'
					}
				}
			)
			.then(({ data }) => {	
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					commit('setProfile', data.results)
					dispatch('getContacts', data.results.token)

					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	autoLogin({ commit }, payload) {
		commit('setProfile', payload)
	},
	userLogout({ commit }) {
		commit('setProfile', null)
		commit('setContacts', [])
		commit('setCurrContact', [])
		commit('setMessages', [])
	},
	showModal({ commit }, id) {
		commit('setModalVisibility', { id, val: true })
	},
	hideModal({ commit }, id) {
		commit('setModalVisibility', { id, val: false })
	},
	showAlert({ commit }, val) {
		commit('setAlertVisibility', true)
		commit('setAlertMessage', val || null)
	},
	hideAlert({ commit }) {
		commit('setAlertVisibility', false)
	},
	setView({ commit }, val) {
		commit('setCurrView', val)
	},
	setCurrContact({ state, commit }, username) {
		const contact = state.contacts.filter(contact => contact.username === username)[0] || []
		commit('setCurrContact', contact)
	},
	setContacts({ commit }, data) {
		commit('setContacts', data)
	},
	async getContacts({ state, dispatch, commit }) {
		await axios.get(
			api_url + '/contacts.php',
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + state.profile.token
				}
			}
		)
		.then(({ data }) => {
			if (data.status_code !== 200) {
				dispatch('showAlert', data.message)
				return false
			}
			else {
				commit('setContacts', data.contacts)

				return true
			}
		})
		.catch((err) => {
			console.log(err)
			dispatch('showAlert', 'An error has occured. Please try again later.')
			return false
		})
	},
	async deleteContact({ state, dispatch }, username) {
		await axios
			.delete(
				api_url + '/contacts.php',
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + state.profile.token
					},
					data: { username }
				}
			)
			.then(({ data }) => {
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					dispatch('getContacts')
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	async addContact({ state, dispatch }, payload) {
		return await axios
			.post(
				api_url + '/contacts.php', 
				payload,
				{
					headers: {
						'Content-Type': 'text/json',
						'Authorization': 'Bearer ' + state.profile.token
					}
				}
			)
			.then(({ data }) => {	
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					dispatch('getContacts')
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	setMessages({ commit }, val) {
		commit('setMessages', val)
	},
	async getMessages({ state, dispatch, commit }, username) {
		await axios.get(
			api_url + '/messages.php',
			{ 
				params: { username },
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + state.profile.token
				}
			}
		)
		.then(({ data }) => {
			if (data.status_code !== 200) {
				dispatch('showAlert', data.message)
				return false
			}
			else {
				commit('setMessages', data.messages)

				return true
			}
		})
		.catch((err) => {
			console.log(err)
			dispatch('showAlert', 'An error has occured. Please try again later.')
			return false
		})
	},
	async sendMessage({ state, dispatch }, payload) {
		await axios.post(
			api_url + '/messages.php',
			payload,
			{ 
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + state.profile.token
				}
			}
		)
		.then(async ({ data }) => {
			if (data.status_code !== 200) {
				await dispatch('showAlert', data.message)
				return false
			}
			else {
				await dispatch('getMessages', state.currContact.username)

				return true
			}
		})
		.catch((err) => {
			console.log(err)
			dispatch('showAlert', 'An error has occured. Please try again later.')
			return false
		})
	},
	async deleteMessages({ state, dispatch, commit }, username) {
		await axios
			.delete(
				api_url + '/messages.php',
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + state.profile.token
					},
					data: { username }
				}
			)
			.then(({ data }) => {
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					commit('setMessages', [])
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	async updateProfile({ state, dispatch, commit }, payload) {
		await axios
			.put(
				api_url + '/profile.php',
				payload,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + state.profile.token
					}
				}
			)
			.then(({ data }) => {
				if (data.status_code !== 200) {
					dispatch('showAlert', data.message)
					return false
				}
				else {
					commit('setProfile', data.profile)
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	}
}

const getters = {
	route(state) {
		return state.route
	},
	isAuthenticated(state) {
		return !!state?.profile?.token
	},
	authForm(state) {
		return state.authForm
	},
	profile(state) {
		return state.profile
	},
	currView(state) {
		return state.currView
	},
	isNewContactModalVisible(state) {
		return state.isNewContactModalVisible
	},
	isEditProfileModalVisible(state) {
		return state.isEditProfileModalVisible
	},
	isAlertVisible(state) {
		return state.isAlertVisible
	},
	alertMessage(state) {
		return state.alertMessage
	},
	currContact(state) {
		return state.currContact
	},
	contacts(state) {
		return state.contacts
	},
	messages(state) {
		return state.messages
	}
}

export default createStore({
	plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
	state,
	mutations,
	actions,
	getters
})