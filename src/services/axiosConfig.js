import axios from 'axios'
import config from '@/config'
import store from '@/store'

/**
 * CustomAxios module
 * Creates an axios instance with base configuration and interceptors
 * for handling CSRF tokens and other common tasks across all axios requests.
 */

const customAxios = axios.create({
  baseURL: config.BASE, // Base URL for all axios requests
  withCredentials: true // Indicates whether cross-site Access-Control requests should be made using credentials
})

/**
 * Adds a request interceptor to the axios instance to attach CSRF token.
 * The interceptor fetches the token from the Vuex store and attaches it to the request headers.
 */
customAxios.interceptors.request.use(function (config) {
  const csrfToken = store.state.user.csrf_token // Retrieve csrf token from Vuex store
  console.log('AXIOS INSTANCE: ' + csrfToken) // Log the current csrf token
  // Attach csrf token to request header if it exists
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
}, function (error) {
  // Handle request error
  return Promise.reject(error)
})

export default customAxios
