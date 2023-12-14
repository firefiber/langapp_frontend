const state = {
  isAuthenticated: false,
  authError: null
}

const mutations = {
  SET_AUTHENTICATED (state, status) {
    state.isAuthenticated = status
  },
  SET_AUTH_ERROR (state, error) {
    state.authError = error
  }
}

const actions = {
  setAuthenticated ({ commit }, status) {
    commit('SET_AUTHENTICATED', status)
  },
  setAuthError ({ commit }, message) {
    commit('SET_AUTH_ERROR', message)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

/// ///////////////////////////////////////////////////////// V1

// const state = {
//   isAuthenticated: false,
//   authError: null
// }
//
// const mutations = {
//   SET_AUTHENTICATED (state, status) {
//     state.isAuthenticated = status
//   },
//   SET_AUTH_ERROR (state, error) {
//     state.authError = error
//   }
// }
//
// const actions = {
//   // ... existing actions
//   setAuthenticated ({ commit }, status) {
//     commit('SET_AUTHENTICATED', status)
//   },
//   setAuthError ({ commit }, error) {
//     commit('SET_AUTH_ERROR', error)
//   }
// }
//
// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
