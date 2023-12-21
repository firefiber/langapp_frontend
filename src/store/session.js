/**
 * Practice session store.
 * Handles session data such as the practice buffer, session counter, and comparison results.
 */

const state = () => ({
  buffer: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || [],
  counter: 0,
  comparisonResult: null
})

const mutations = {
  // Refills the practice session buffer with new items and updates localStorage.
  REFILL_PRACTICE_SESSION_BUFFER (state, newItems) {
    state.buffer = [...state.buffer, ...newItems]
    localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.buffer))
  },

  // Removes the top item from the buffer and updates localStorage.
  POP_BUFFER_TOP (state) {
    state.buffer.shift()
    localStorage.setItem('PRACTICE_SESSION', JSON.stringify(state.buffer))
  },

  // Sets the result of a sentence comparison.
  SET_COMPARISON_RESULT (state, result) {
    state.comparisonResult = result
  },

  // Clears the sentence comparison result.
  CLEAR_COMPARISON_RESULT (state) {
    state.comparisonResult = null
  },

  // Resets the session state to its initial state.
  RESET_SESSION (state) {
    state.buffer = []
    state.counter = 0
    state.comparisonResult = null
    localStorage.removeItem('PRACTICE_SESSION')
  },

  // Increments the session counter.
  INCREMENT_COUNTER (state) {
    state.counter++
  }
}

const actions = {
  refillPracticeSessionBuffer ({ commit }, buffer) {
    commit('REFILL_PRACTICE_SESSION_BUFFER', buffer)
  },

  popCompletedBufferItem ({ commit }) {
    commit('POP_BUFFER_TOP')
  },

  setComparisonResult ({ commit }, result) {
    commit('SET_COMPARISON_RESULT', result)
  },

  clearComparisonResult ({ commit }) {
    commit('CLEAR_COMPARISON_RESULT')
  },

  resetSession ({ commit }) {
    commit('RESET_SESSION')
  },

  incrementCounter ({ commit }) {
    commit('INCREMENT_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
