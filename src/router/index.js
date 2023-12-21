import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import PracticePage from '@/views/PracticePage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import NotFound from '@/views/NotFound.vue'
import ActivateAccount from '@/views/ActivateAccount.vue'
import store from '@/store'

/**
 * Route definitions for the Vue application.
 * Each route is mapped to a component and has optional navigation guards for access control.
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    meta: { hideNavbar: true },
    /**
     * Navigation guard for the home route.
     * Redirects authenticated users to the PracticePage.
     */
    beforeEnter: (to, from, next) => {
      if (store.state.user.isAuthenticated) {
        next('/practice')
      } else {
        next()
      }
    }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: PracticePage,
    /**
     * Navigation guard for the practice route.
     * Redirects unauthenticated users to the LandingPage.
     */
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    /**
     * Navigation guard for the profile route.
     * Redirects unauthenticated users to the LandingPage.
     */
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isAuthenticated) {
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
    // This route is used for account activation.
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
    // This route catches all undefined routes and shows a 'NotFound' page.
  }
]

/**
 * Creates the Vue Router instance with the defined routes.
 * Uses the HTML5 history mode for cleaner URLs.
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import LandingPage from '@/views/LandingPage.vue'
// import PracticePage from '@/views/PracticePage.vue'
// import ProfilePage from '@/views/ProfilePage.vue'
// import NotFound from '@/views/NotFound.vue'
// import ActivateAccount from '@/views/ActivateAccount.vue'
// import store from '@/store'
//
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: LandingPage,
//     beforeEnter: (to, from, next) => {
//       // console.log(store.state.isAuthenticated)// Dispatch Vuex action
//       if (store.state.user.isAuthenticated) {
//         next('/practice') // If authenticated, redirect to PracticePage
//       } else {
//         next() // Otherwise, show LandingPage
//       }
//     }
//   },
//   {
//     path: '/practice',
//     name: 'Practice',
//     component: PracticePage,
//     beforeEnter: (to, from, next) => {
//       if (!store.state.user.isAuthenticated) {
//         next('/') // If not authenticated, redirect to LandingPage
//       } else {
//         next() // Otherwise, show PracticePage
//       }
//     }
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: ProfilePage,
//     beforeEnter: (to, from, next) => {
//       if (!store.state.user.isAuthenticated) {
//         next('/')
//       } else {
//         next()
//       }
//     }
//   },
//   {
//     path: '/activate/:uid/:token',
//     name: 'ActivateAccount',
//     component: ActivateAccount
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: NotFound
//   }
// ]
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
//
// export default router
