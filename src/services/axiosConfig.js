import axios from 'axios'
import config from '@/config'

// Set Axios default base URL
axios.defaults.baseURL = config.BASE
console.log(axios.defaults.baseURL)

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const csrfToken = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken'))
    ?.split('=')[1]

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Optionally export the configured Axios instance
export default axios
