import axios from '@/services/axiosConfig'
import config from '@/config'

/**
 * Utility functions for making API calls. Only handles call and returns response (any response)
 * Error handling is done by the Dispatcher (services/dispatcher), and logged to the error store (store/error)
 */

/**
 * Sends a login request to the server.
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const login = async (username, password) => {
  return await axios.post(config.BASE_AUTH_LOGIN, { username, password })
}

/**
 * Sends a logout request to the server
 * @return {Promise} A promise that resolves with the server's response
 */
export const logout = async () => {
  return await axios.post(config.BASE_AUTH_LOGOUT, { withCredentials: true })
}

/**
 * Checks user authentication status with the server.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const authCheck = async () => {
  return await axios.get(config.BASE_AUTH_CHECK, { withCredentials: true })
}

/**
 * Creates a new user account.
 * @param {Object} userData - Data for the new user.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const createUser = async (userData) => {
  return await axios.post(config.BASE_REST_CREATEUSER, userData)
}

/**
 * Retrieves the current practice session data.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const practiceSession = async () => {
  return await axios.get(config.BASE_REST_SESSION, { withCredentials: true })
}

/**
 * Retrieves data about the currently authenticated user.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const userData = async () => {
  return await axios.get(config.BASE_AUTH_DATA, { withCredentials: true })
}

/**
 * Retrieves training data related to the user.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const userTrainingData = async () => {
  return await axios.get(config.BASE_AUTH_TRAININGDATA, { withCredentials: true })
}

/**
 * Compares user-submitted sentences with original sentences for validation.
 * @param {string} userSentence - The sentence submitted by the user.
 * @param {string} originalSentence - The original sentence to compare against.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const compareSentences = async (userSentence, originalSentence) => {
  return await axios.post(config.BASE_REST_COMPARE, {
    user_sentence: userSentence,
    original_sentence: originalSentence
  }, { withCredentials: true })
}

/**
 * Retrieves words related to the user.
 * @param {Object} params - Additional parameters for the request.
 * @returns {Promise} A promise that resolves with the server's response.
 */
export const userWords = async (params = {}) => {
  return await axios.get(config.BASE_REST_USERWORDS, { params, withCredentials: true })
}
