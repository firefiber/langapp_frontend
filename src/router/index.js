import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import PracticePage from '@/views/PracticePage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import NotFound from '@/views/NotFound.vue'
import ActivateAccount from '@/views/ActivateAccount.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    beforeEnter: (to, from, next) => {
      // console.log(store.state.isAuthenticated)// Dispatch Vuex action
      if (store.state.auth.isAuthenticated) {
        next('/practice') // If authenticated, redirect to PracticePage
      } else {
        next() // Otherwise, show LandingPage
      }
    }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: PracticePage,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.isAuthenticated) {
        next('/') // If not authenticated, redirect to LandingPage
      } else {
        next() // Otherwise, show PracticePage
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.isAuthenticated) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/activate/:uid/:token',
    name: 'ActivateAccount',
    component: ActivateAccount
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
