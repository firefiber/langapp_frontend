// store/index.js
import { createStore } from 'vuex'
import * as authService from '@/services/authenticationService'
import router from '@/router'

const store = createStore({
  state () {
    return {
      isAuthenticated: false
    }
  },
  mutations: {
    setAuthentication (state, status) {
      // console.log('Setting auth status to: ', status)
      state.isAuthenticated = status
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      try {
        const response = await authService.login(username, password)
        if (response.status === 200) {
          commit('setAuthentication', true)
          router.push('/') // Redirect to the home page
        } else {
          // Handle failed login
        }
      } catch (error) {
        console.error('Login error:', error)
        // Handle errors
      }
    },
    async checkAuthStatus ({ commit }) {
      try {
        const response = await authService.checkAuthenticationStatus()
        if (response.status === 200) {
          commit('setAuthentication', true)
          router.push('/')
          // eslint-disable-next-line no-empty
        } else {

        }
      } catch (error) {
        console.log('Login error:', error)
      }
    }
  }
})

export default store
