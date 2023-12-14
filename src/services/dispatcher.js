import store from '@/store'
import * as endpoints from '@/services/endpoints'

export const requestAuthorization = async (username, password) => {
  try {
    const response = await endpoints.login(username, password)
    if (response.status === 200) {
      await store.dispatch('auth/setAuthenticated', true)
    }
  } catch (error) {
    console.error('Login error:', error)
    await store.dispatch('auth/setAuthError', error.message)
    await store.dispatch('auth/setAuthenticated', false)
  }
}

export const requestAuthentication = async () => {
  try {
    const response = await endpoints.authCheck()
    if (response.status === 200) {
      await store.dispatch('auth/setAuthenticated', true)
    }
  } catch (error) {
    console.error('Error with auth check:', error)
    await store.dispatch('auth/setAuthError', error.message)
    await store.dispatch('auth/setAuthenticated', false)
  }
}

export const getSession = async () => {
  try {
    const response = await endpoints.practiceSession()
    if (response.status === 200 && response.data.buffer) {
      await store.dispatch('session/updatePracticeSessionBuffer', response.data.buffer)
    }
  } catch (error) {
    console.error('Error fetching practice session:', error)
    await store.dispatch('session/setSessionError', error.message)
  }
}

/// ///////////////////////////////////////////////////////////////////////// V2

// import store from '@/store'
//
// export const requestAuthorization = async (username, password) => {
//   try {
//     // Dispatch action from the 'auth' module
//     await store.dispatch('auth/login', { username, password })
//   } catch (error) {
//     console.error('Login error:', error)
//     // Error handling is now taken care of within the store's action
//   }
// }
//
// export const requestAuthentication = async () => {
//   try {
//     // Dispatch action from the 'auth' module
//     await store.dispatch('auth/checkAuth')
//   } catch (error) {
//     console.error('Error with auth check:', error)
//     // Error handling is now taken care of within the store's action
//   }
// }
//
// export const getSession = async () => {
//   try {
//     // Dispatch action from the 'session' module
//     await store.dispatch('session/fetchPracticeSession')
//   } catch (error) {
//     console.error('Error fetching practice session:', error)
//     // Error handling is now taken care of within the store's action
//   }
// }

/// ///////////////////////////////////////////////////////////////////////// V1
// import * as endpoints from '@/services/endpoints'
// import store from '@/store'
//
// export const requestAuthorization = async (username, password) => {
//   try {
//     const response = await endpoints.login(username, password)
//     if (response.status === 200) {
//       await store.dispatch('setAuthenticationStatus', true)
//     } else {
//       await store.dispatch('setAuthenticationStatus', false)
//       // Additional logic for failed login
//     }
//   } catch (error) {
//     console.error('Login error:', error)
//     await store.dispatch('setAuthenticationStatus', false)
//   }
// }
//
// export const requestAuthentication = async () => {
//   try {
//     const response = await endpoints.authCheck()
//     if (response.status === 200) {
//       await store.dispatch('setAuthenticationStatus', true)
//     } else {
//       await store.dispatch('setAuthenticationStatus', false)
//     }
//   } catch (error) {
//     console.error('Error with auth check:', error)
//     await store.dispatch('setAuthenticationStatus', false)
//   }
// }
//
// export const getSession = async () => {
//   try {
//     const response = await endpoints.practiceSession()
//     if (response.data && response.status === 200) {
//       await store.dispatch('updatePracticeSessionBuffer', response.data.buffer)
//     }
//   } catch (error) {
//     console.error('Error fetching practice session:', error)
//   }
// }
