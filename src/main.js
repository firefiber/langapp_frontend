import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
