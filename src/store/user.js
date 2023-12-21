/**
 * User profile and authentication store
 * Handles user-specific data such as authentication status, user details, and language preferences.
 */
import store from '@/store'

const state = {
  username: '',
  nativeLanguage: '',
  learningLanguages: {},
  learningSince: '',
  isAuthenticated: false
}

const mutations = {
  // Sets the user's data.
  SET_USER_DATA (state, userData) {
    state.username = userData.username
    state.nativeLanguage = userData.native_language
    state.learningLanguages = userData.learning_languages
    state.learningSince = userData.learning_since
  },

  // Sets the user's authentication status.
  SET_AUTHENTICATED (state, status) {
    store.dispatch('error/clearClientErrors')
    state.isAuthenticated = status
  },

  // Resets the user data to its initial state.
  RESET_USER_DATA (state) {
    state.username = ''
    state.nativeLanguage = ''
    state.learningLanguages = {}
    state.learningSince = ''
    state.isAuthenticated = false
  }
}

const actions = {
  // Commits to set the user's authentication status.
  setAuthenticated ({ commit }, status) {
    commit('SET_AUTHENTICATED', status)
  },

  // Commits to set the user's data.
  setUserData ({ commit }, userData) {
    commit('SET_USER_DATA', userData)
  },

  // Commits to reset the user's data.
  resetUserData ({ commit }) {
    commit('RESET_USER_DATA')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
