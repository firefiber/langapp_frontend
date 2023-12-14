import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { requestAuthentication } from '@/services/dispatcher' // Import the dispatcher function

async function init () {
  await requestAuthentication() // Use the dispatcher function for authentication

  const app = createApp(App)

  watch(() => store.state.auth.isAuthenticated, (isAuthenticated) => {
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
