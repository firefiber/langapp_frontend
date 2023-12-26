import axios from 'axios'
import config from '@/config'

// Set Axios default base URL
axios.defaults.baseURL = config.BASE
// axios.defaults.withCredentials = true
console.log(axios.defaults.baseURL)

// Add a request interceptor, to send the csrftoken with each request, if it exists.
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

export default axios
