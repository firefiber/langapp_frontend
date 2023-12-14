const initialState = {
  practiceSession: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || { buffer: [] },
  sessionError: null
}

const state = () => ({ ...initialState })

const mutations = {
  UPDATE_PRACTICE_SESSION_BUFFER (state, newItems) {
    state.practiceSession.buffer = state.practiceSession.buffer.concat(newItems)
    localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.practiceSession))
  },
  SET_SESSION_ERROR (state, error) {
    state.sessionError = error
  },
  RESET_SESSION (state) {
    Object.assign(state, initialState)
  }
}

const actions = {
  updatePracticeSessionBuffer ({ commit }, buffer) {
    commit('UPDATE_PRACTICE_SESSION_BUFFER', buffer)
  },
  setSessionError ({ commit }, message) {
    commit('SET_SESSION_ERROR', message)
  },
  resetSession ({ commit }) {
    commit('RESET_SESSION')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

/// ///////////////////////////////////////////////////////////// V1

// import * as endpoints from '@/services/endpoints'
//
// const initialState = {
//   practiceSession: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || { buffer: [] },
//   sessionError: null
// }
//
// const state = () => ({ ...initialState })
//
// const mutations = {
//   UPDATE_PRACTICE_SESSION_BUFFER (state, newItems) {
//     state.practiceSession.buffer = state.practiceSession.buffer.concat(newItems)
//     localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.practiceSession))
//   },
//   SET_SESSION_ERROR (state, error) {
//     state.sessionError = error
//   },
//   RESET_SESSION (state) {
//     Object.assign(state, initialState)
//   }
// }
//
// const actions = {
//   async fetchPracticeSession ({ commit }) {
//     try {
//       const response = await endpoints.practiceSession()
//       commit('UPDATE_PRACTICE_SESSION_BUFFER', response.data.buffer)
//     } catch (error) {
//       commit('SET_SESSION_ERROR', 'Failed to fetch practice session')
//     }
//   },
//   resetSession ({ commit }) {
//     commit('RESET_SESSION')
//   }
//   // Add more actions as needed
// }
//
// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
