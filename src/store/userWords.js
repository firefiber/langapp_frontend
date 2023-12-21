const state = {
  userWords: []
}

const mutations = {
  SET_USER_WORDS (state, words) {
    state.userWords = words
  }
}

const actions = {
  setUserWords ({ commit }, words) {
    commit('SET_USER_WORDS', words)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
