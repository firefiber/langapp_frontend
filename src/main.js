import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
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

// Check authentication status before creating the app
async function init () {
  await store.dispatch('checkAuthStatus')

  const app = createApp(App)

  watch(() => store.state.isAuthenticated, (isAuthenticated) => {
    if (isAuthenticated) {
      if (router.currentRoute.value.path === '/') {
        router.push('/practice')
      }
    } else {
      if (router.currentRoute.value.path === '/practice') {
        router.push('/')
      }
    }
  })

  app.use(store).use(router).mount('#app')
}

init()
