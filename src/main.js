import { createApp, watch } from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import router from './router'
import store from './store'
import { getUserProfileData, getUserTrainingData, sendAuthentication } from '@/services/dispatcher'
import Navbar from '@/components/Navbar.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

async function init () {
  // Check for the existence of CSRF or session cookies before sending auth check
  if (document.cookie.includes('csrftoken') || document.cookie.includes('sessionid')) {
    try {
      await sendAuthentication()
      getUserProfileData()
      getUserTrainingData()
    } catch (error) {}
  }
  const app = createApp(App)

  watch(() => store.state.user.isAuthenticated, (isAuthenticated) => {
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

  app.component('Navbar', Navbar)

  app.use(store).use(router).mount('#app')
}

init()
