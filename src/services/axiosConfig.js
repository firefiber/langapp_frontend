import axios from 'axios'
import config from '@/config'
import store from '@/store'

const customAxios = axios.create({
  baseURL: config.BASE,
  withCredentials: true
})

// Add a request interceptor to attach CSRF token
customAxios.interceptors.request.use(function (config) {
  // Get the csrf token from Vuex store
  const csrfToken = store.state.user.csrf_token
  console.log('AXIOS INSTANCE: ' + csrfToken)
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default customAxios

// import axios from 'axios'
// import appConfig from '@/config'
//
// // Create a custom instance of Axios
// const customAxios = axios.create({
//   baseURL: appConfig.BASE
// })
//
// // Add a request interceptor to attach CSRF token
// customAxios.interceptors.request.use(function (config) {
//   const csrfToken = document.cookie.split('; ')
//     .find(row => row.startsWith('csrftoken'))
//     ?.split('=')[1]
//
//   if (csrfToken) {
//     config.headers['X-CSRFToken'] = csrfToken
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })
//
// export default customAxios
