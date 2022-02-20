import { createStore } from 'vuex' 
import createPersistedState from 'vuex-persistedstate'
// import axios from 'axios'
import Cookies from 'js-cookie'

import dummyGetContacts from '../assets/data/get-contacts.json'
import dummyGetMessages from '../assets/data/get-messages.js'

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
		currContact: null,
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
	async userLogin({ dispatch, commit }, payload) {
		return await fetch(`http://demo-dev.lcubestudios.io/intouch-backend/auth.php?purpose=login`, {
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then(req => req.json())
			.then(res => {	
				if (res.status_code !== 200) {
					dispatch('showAlert', res.message)
					return false
				}
				else {
					commit('setProfile', res.profile)
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	async userReg({ dispatch, commit }, payload) {
		return await fetch(`http://demo-dev.lcubestudios.io/intouch-backend/auth.php?purpose=reg`, {
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then(req => req.json())
			.then(res => {	
				if (res.status_code !== 200) {
					dispatch('showAlert', res.message)
					return false
				}
				else {
					commit('setProfile', res.profile)
					return true
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch('showAlert', 'An error has occured. Please try again later.')
				return false
			})
	},
	userLogout({ commit }) {
		commit('setProfile', null)
		commit('setContacts', [])
		commit('setCurrContact', null)
		commit('setMessages', null)
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
	setCurrContact({ commit }, val) {
		commit('setCurrContact', val)
		commit('setMessages', [])
	},
	getContacts({ commit }) {
		const contacts = dummyGetContacts.contacts
		const uid = contacts[0].uid

		const messages = dummyGetMessages[uid].messages

		commit('setContacts', contacts)
		commit('setCurrContact', uid)
		commit('setMessages', messages)
	},
	setContacts({ commit }, data) {
		commit('setContacts', data)
	},
	deleteContact({ state, commit }, uid) {
		const newContacts = state.contacts.filter(contact => contact.uid !== uid)

		commit('setContacts', newContacts)
	},
	sendMessage({ state }, body) {
		const isLastSender = state.messages[state.messages.length - 1].isSender

		if (isLastSender) {
			state.messages[state.messages.length - 1].messages.push({ body })
		}
		else {
			state.messages.push({
				isSender: true,
				messages: [{
					body
				}]
			})
		}
	},
	async updateProfile({ state, commit }, payload) {
		const new_profile = Object.assign(state.profile, payload)

		await fetch('http://demo-dev.lcubestudios.io/intouch-backend/profile.php', {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + state.profile.token
			}),
			body: JSON.stringify(new_profile)
		})

		commit('setProfile', new_profile)
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
		return state.contacts.filter(contact => contact.uid === state.currContact)[0]
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