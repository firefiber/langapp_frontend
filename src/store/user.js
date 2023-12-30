import store from '@/store'

/**
 * User profile and authentication store
 * Handles user-specific data such as authentication status, user details, and language preferences.
 */

const state = {
  username: '', // User's username
  nativeLanguage: '', // User's selected native language
  learningLanguages: {}, // User's list of learning languages. Key/value pair. Key is language, value is bool for active or not.
  learningSince: '', // User's date of joining
  isAuthenticated: false, // User authenticated or not flag
  csrf_token: '' // Storing the csrf token received from backend
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

  // Sets the csrf token
  SET_CSRF_TOKEN (state, token) {
    state.csrf_token = token
    console.log('USER STORE: ' + state.csrf_token)
  },

  // Resets the user data to its initial state.
  RESET_USER_DATA (state) {
    state.username = ''
    state.nativeLanguage = ''
    state.learningLanguages = {}
    state.learningSince = ''
    state.isAuthenticated = false
    state.csrf_token = ''
  }
}

const actions = {
  // Commits to set the user's authentication status.
  setAuthenticated ({ commit }, status) {
    commit('SET_AUTHENTICATED', status)
  },

  // Commits to set the csrf token
  setCsrfToken ({ commit }, token) {
    commit('SET_CSRF_TOKEN', token)
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
