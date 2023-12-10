import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use(function (config) {
  // Get CSRF token from the cookie
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

createApp(App).use(store).use(router, axios).mount('#app')
