import { createStore } from 'vuex' 
import createPersistedState from 'vuex-persistedstate'
// import axios from 'axios'
import Cookies from 'js-cookie'

import dummyPostAuth from '../assets/data/post-auth.json'
import dummyGetContacts from '../assets/data/get-contacts.json'
import dummyGetMessages from '../assets/data/get-messages.js'

const state = () => {
	return {
		token: null,
		profile: null,
		isNewContactModalVisible: true,
		isAlertVisible: false,
		alertMessage: null,
		currView: 'contacts',
		currContact: null,
		contacts: [],
		messages: [],
	}
}

const mutations = {
	setToken(state, val) {
		state.token = val
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
	userLogin({ dispatch, commit }) {
		return new Promise((resolve, reject) => {
			const {
				token,
				profile
			} = dummyPostAuth

			console.log(resolve)
			console.log(reject)
			
			dispatch('getContacts')

			commit('setToken', token)
			commit('setProfile', profile)
			resolve(dummyPostAuth)
			// reject({ error_message: 'test error' })
		})

		// commit('setToken', 'test');
	},
	userLogout({ commit }) {
		commit('setToken', null)
		commit('setProfile', null)
		commit('contacts', [])
		commit('currContact', null)
		commit('messages', null)
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
	}
}

const getters = {
	isAuthenticated(state) {
		return !!state.token
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
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
	state,
	mutations,
	actions,
	getters
})