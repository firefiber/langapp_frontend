import { createApp, watch } from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import router from './router'
import store from './store'
import Navbar from '@/components/Navbar.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import { sendAuthentication } from '@/services/dispatcher'

/**
 * Initializes the Vue application.
 * It authenticates the user, watches for changes in authentication state,
 * and sets up the Vue application with global components, Vuex store, and Vue Router.
 */

async function init () {
  try {
    // Attempt to authenticate the user before initializing the app.
    await sendAuthentication()
  } catch (error) {} // Errors logged to error store

  const app = createApp(App)
  // Watch for changes in user authentication state and redirect as necessary.
  watch(() => store.state.user.isAuthenticated, (isAuthenticated) => {
    // Redirect to '/practice' if the user is authenticated and on the root path.
    // Redirect to root path if the user is not authenticated and on the '/practice' path.
    if (isAuthenticated && router.currentRoute.value.path === '/') {
      router.push('/practice')
    } else if (!isAuthenticated && router.currentRoute.value.path === '/practice') {
      router.push('/')
    }
  })
  // Register global components
  app.component('Navbar', Navbar)
  // Install plugins (store, router) and mount the application to the DOM.
  app.use(store).use(router).mount('#app')
}

init()
