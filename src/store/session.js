/**
 * Practice session store.
 * Handles session data such as the practice buffer, session counter, and comparison results.
 */

const state = () => ({
  buffer: JSON.parse(localStorage.getItem('PRACTICE_SESSION')) || [], // Practice session buffer - retrieve from localstorage or create an empty array
  counter: 0, // Counts the number of completed practice items.
  comparisonResult: null // Holds the result of the last practice comparison.
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
  // Commits mutation to refill the practice session buffer with new items.
  refillPracticeSessionBuffer ({ commit }, buffer) {
    commit('REFILL_PRACTICE_SESSION_BUFFER', buffer)
  },
  // Commits mutation to remove the top item from the practice buffer.
  popCompletedBufferItem ({ commit }) {
    commit('POP_BUFFER_TOP')
  },
  // Commits mutation to set the result of a sentence comparison.
  setComparisonResult ({ commit }, result) {
    commit('SET_COMPARISON_RESULT', result)
  },
  // Commits mutation to clear the sentence comparison result.
  clearComparisonResult ({ commit }) {
    commit('CLEAR_COMPARISON_RESULT')
  },
  // Commits mutation to reset the session to its initial state.
  resetSession ({ commit }) {
    commit('RESET_SESSION')
  },
  // Commits mutation to increment the session counter.
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
