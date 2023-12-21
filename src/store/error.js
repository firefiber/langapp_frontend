const state = {
  clientErrors: {
    badRequest: null,
    unauthorized: null,
    forbidden: null,
    notFound: null,
    general: null
  },
  serverErrors: []
}

const mutations = {
  REPORT_CLIENT_ERROR (state, { message, statusCode }) {
    switch (statusCode) {
      case 400 || 409:
        state.clientErrors.badRequest = message
        break
      case 401:
        state.clientErrors.unauthorized = message
        break
      case 403:
        state.clientErrors.forbidden = message
        break
      case 404:
        state.clientErrors.notFound = message
        break
      default:
        state.clientErrors.general = message
        break
    }
  },
  REPORT_SERVER_ERROR (state, { message, statusCode }) {
    state.serverErrors.push({ message, statusCode })
  },

  CLEAR_CLIENT_ERRORS (state) {
    for (const error in state.clientErrors) {
      state.clientErrors[error] = null
    }
  },

  CLEAR_SERVER_ERRORS (state) {
    state.serverErrors = []
  }
}

const actions = {
  reportError ({ commit }, { message, statusCode }) {
    if (statusCode >= 400 && statusCode < 500) {
      commit('REPORT_CLIENT_ERROR', { message, statusCode })
    } else if (statusCode >= 500) {
      commit('REPORT_SERVER_ERROR', { message, statusCode })
    }
  },
  clearClientErrors ({ commit }) {
    commit('CLEAR_CLIENT_ERRORS')
  },
  clearServerErrors ({ commit }) {
    commit('CLEAR_SERVER_ERRORS')
  }
}

const getters = {
  requestError: state => state.clientErrors.badRequest,
  credentialError: state => state.clientErrors.unauthorized,
  permissionError: state => state.clientErrors.forbidden,
  notFoundError: state => state.clientErrors.notFound,
  generalError: state => state.clientErrors.general,
  serverErrors: (state) => state.serverErrors
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
