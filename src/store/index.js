import { createStore } from 'vuex'
import user from './user'
import error from './error'
import session from './session'
import training from './training'

const store = createStore({
  modules: {
    user,
    error,
    session,
    training
  }
})

export default store

// // store/index.js
// import { createStore } from 'vuex'
// import * as authService from '@/services/authenticationService'
// // import router from '@/router'
//
// const store = createStore({
//   state () {
//     return {
//       isAuthenticated: false,
//       PRACTICE_SESSION: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || { buffer: [] }
//     }
//   },
//
//   mutations: {
//     setAuthentication (state, status) {
//       state.isAuthenticated = status
//     },
//
//     setPracticeSession (state, data) {
//       state.PRACTICE_SESSION = { ...state.PRACTICE_SESSION, ...data } // Merge new data with existing state
//       localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.PRACTICE_SESSION))
//     },
//
//     appendToBuffer (state, newItems) {
//       state.PRACTICE_SESSION.buffer = state.PRACTICE_SESSION.buffer.concat(newItems) // Use concat for appending
//       localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.PRACTICE_SESSION))
//     },
//
//     popBufferItem (state) {
//       if (state.PRACTICE_SESSION.buffer.length > 0) {
//         state.PRACTICE_SESSION.buffer.shift()
//         localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.PRACTICE_SESSION))
//       }
//     }
//   },
//
//   actions: {
//     async login ({ commit }, { username, password }) {
//       try {
//         const response = await authService.login(username, password)
//         if (response.status === 200) {
//           commit('setAuthentication', true)
//         } else {
//           // Handle failed login
//         }
//       } catch (error) {
//         console.error('Login error:', error)
//         // Handle errors
//       }
//     },
//
//     async checkAuthStatus ({ commit }) {
//       try {
//         const response = await authService.checkAuthenticationStatus()
//         if (response.status === 200) {
//           commit('setAuthentication', true)
//           // eslint-disable-next-line no-empty
//         } else {
//
//         }
//       } catch (error) {
//         console.log('Login error:', error)
//       }
//     },
//
//     async getPracticeSession ({ commit, state }) {
//       // Only fetch new data if the buffer has 5 or fewer items
//       if (state.PRACTICE_SESSION.buffer.length <= 5) {
//         try {
//           const response = await authService.getRoundManager()
//           if (response.data && response.status === 200) {
//             commit('appendToBuffer', response.data.buffer)
//           }
//         } catch (error) {
//           console.error('Error getting a new practice session: ', error)
//         }
//       }
//     },
//
//     submitTranslation ({ commit }) {
//       commit('popBufferItem')
//
//       if (this.state.PRACTICE_SESSION.buffer.length <= 5) {
//         this.dispatch('getPracticeSession')
//       }
//     }
//   }
// })
//
// export default store

// store/index.js
// import { createStore } from 'vuex'
//
// const store = createStore({
//   state () {
//     return {
//       isAuthenticated: false,
//       PRACTICE_SESSION: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || { buffer: [] }
//     }
//   },
//
//   mutations: {
//     SET_AUTHENTICATION_STATUS (state, status) {
//       state.isAuthenticated = status
//     },
//
//     REFILL_PRACTICE_SESSION_BUFFER (state, newItems) {
//       state.PRACTICE_SESSION.buffer = state.PRACTICE_SESSION.buffer.concat(newItems)
//       localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.PRACTICE_SESSION))
//     }
//   },
//
//   actions: {
//     setAuthenticationStatus ({ commit }, status) {
//       commit('SET_AUTHENTICATION_STATUS', status)
//     },
//
//     refillPracticeSessionBuffer ({ commit }, newItems) {
//       commit('REFILL_PRACTICE_SESSION_BUFFER', newItems)
//     }
//   }
// })
//
// export default store
