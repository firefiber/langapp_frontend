import store from '@/store'
import * as endpoints from '@/utils/endpoints'

/**
 * Service module for making API calls. Uses the Endpoints utility for the base call and adds extra params as needed.
 * Handles errors by logging to the error store (store/error). Else, handles the response and updates the relevant store.
 */

/**
 * Handles errors that occur during API requests.
 * Dispatches the error details to the Vuex store for global error management.
 * @param {Object} error - The error object caught in catch blocks.
 */
const errorHandler = (error) => {
  const statusCode = error.response ? error.response.status : 0
  const message = error.message || 'An error occurred'
  console.log(message)
  store.dispatch('error/reportError', { message, statusCode })
}

/**
 * Sends user credentials for authorization and updates Vuex store upon successful login.
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 */
export const sendAuthorization = async (username, password) => {
  try {
    const response = await endpoints.login(username, password)
    if (response.status === 200) {
      await store.dispatch('user/setAuthenticated', true)
    }
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Checks user authentication status and updates Vuex store if authenticated.
 */
export const sendAuthentication = async () => {
  try {
    const response = await endpoints.authCheck()
    if (response.status === 200) {
      await store.dispatch('user/setAuthenticated', true)
    }
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Registers a new user and updates Vuex store upon successful registration.
 * @param {Object} userData - Data for the new user.
 */
export const sendRegistration = async (userData) => {
  try {
    const response = await endpoints.createUser(userData)
    if (response.status === 201) {
      await store.dispatch('user/setAuthenticated', true)
    }
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Sends sentences for comparison and updates Vuex store with the comparison result.
 * @param {string} userSentence - The sentence submitted by the user.
 * @param {string} originalSentence - The original sentence to compare against.
 */
export const sendSentenceComparison = async (userSentence, originalSentence) => {
  try {
    const response = await endpoints.compareSentences(userSentence, originalSentence)
    await store.dispatch('session/setComparisonResult', response.data)
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Retrieves user profile data and updates the Vuex store.
 */
export const getUserProfileData = async () => {
  try {
    const response = await endpoints.userData()
    await store.dispatch('user/setUserData', response.data)
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Retrieves user training data and updates the Vuex store.
 */
export const getUserTrainingData = async () => {
  try {
    const response = await endpoints.userTrainingData()
    await store.dispatch('training/setTrainingData', response.data)
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Retrieves a list of words related to the user with optional pagination.
 * @param {Object} params - Parameters for pagination (limit, offset).
 */
export const getUserWords = async (params = { limit: 50, offset: 0 }) => {
  try {
    const response = await endpoints.userWords(params)
    await store.dispatch('training/setWordBank', response.data)
  } catch (error) {
    errorHandler(error)
  }
}

/**
 * Retrieves the current practice session data and updates the Vuex store.
 */
export const getSession = async () => {
  try {
    const response = await endpoints.practiceSession()
    if (response.status === 200) {
      await store.dispatch('session/refillPracticeSessionBuffer', response.data)
    }
  } catch (error) {
    errorHandler(error)
  }
}
