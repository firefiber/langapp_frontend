/**
 * User training data store
 * Handles state management for user training sessions including proficiency, word bank, and streaks.
 */
const state = {
  proficiency: 0.0, // User's current proficiency level.
  wordBankCount: 0, // Number of words in the user's word bank.
  streak: 0, // Current streak of correct answers or practices.
  wordBank: [] // Array of words in the user's word bank.
}

const mutations = {
  // Updates training data with new values.
  SET_TRAINING_DATA (state, trainingData) {
    state.proficiency = trainingData.proficiency
    state.wordBankCount = trainingData.word_bank_count
    state.streak = trainingData.streak
  },
  // Updates the word bank with a new set of words.
  SET_WORD_BANK (state, wordBank) {
    state.wordBank = wordBank
  }
}

const actions = {
  // Commits mutation to update training data.
  setTrainingData ({ commit }, trainingData) {
    commit('SET_TRAINING_DATA', trainingData)
  },
  // Commits mutation to update word bank.
  setWordBank ({ commit }, wordBank) {
    commit('SET_WORD_BANK', wordBank)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
