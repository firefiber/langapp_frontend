
import { createStore } from 'vuex'
import user from './user'
import error from './error'
import session from './session'
import training from './training'

/**
 *  Root store
 * Initializes Vuex store with modularized state management for user, error handling, sessions, and training.
 */

const store = createStore({
  modules: {
    user,
    error,
    session,
    training
  }
})

export default store
