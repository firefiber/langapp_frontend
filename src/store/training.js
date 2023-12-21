const state = {
  proficiency: 0.0,
  wordBankCount: 0,
  streak: 0,
  wordBank: []
}

const mutations = {
  SET_TRAINING_DATA (state, trainingData) {
    state.proficiency = trainingData.proficiency
    state.wordBankCount = trainingData.word_bank_count
    state.streak = trainingData.streak
  },
  SET_WORD_BANK (state, wordBank) {
    state.wordBank = wordBank
  }
}

const actions = {
  setTrainingData ({ commit }, trainingData) {
    commit('SET_TRAINING_DATA', trainingData)
  },
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
