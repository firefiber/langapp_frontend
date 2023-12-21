import { createStore } from 'vuex'
import user from './user'
import error from './error'
import session from './session'
import training from './training'

const store = createStore({
  modules: {
    user,
    error,
    session,
    training
  }
})

export default store
