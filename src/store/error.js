/**
 * Error logging store.
 * Manages client and server error states and handlers.
 */

const state = {
  // Holds client side error details for various HTTP status codes.
  clientErrors: {
    badRequest: null,
    unauthorized: null,
    forbidden: null,
    notFound: null,
    general: null
  },
  // Stores an array of server error messages and status codes.
  serverErrors: []
}

const mutations = {
  // Reports client-side errors based on the status code and updates the state.
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
  // Appends a new server-side error to the serverErrors array.
  REPORT_SERVER_ERROR (state, { message, statusCode }) {
    state.serverErrors.push({ message, statusCode })
  },
  // Clears all client error messages.
  CLEAR_CLIENT_ERRORS (state) {
    for (const error in state.clientErrors) {
      state.clientErrors[error] = null
    }
  },
  // Resets the server errors array to an empty state.
  CLEAR_SERVER_ERRORS (state) {
    state.serverErrors = []
  }
}

const actions = {
  // Determines the type of error and commits the appropriate mutation.
  reportError ({ commit }, { message, statusCode }) {
    if (statusCode >= 400 && statusCode < 500) {
      commit('REPORT_CLIENT_ERROR', { message, statusCode })
    } else if (statusCode >= 500) {
      commit('REPORT_SERVER_ERROR', { message, statusCode })
    }
  },
  // Commits mutation to clear all client errors.
  clearClientErrors ({ commit }) {
    commit('CLEAR_CLIENT_ERRORS')
  },
  // Commits mutation to clear all server errors.
  clearServerErrors ({ commit }) {
    commit('CLEAR_SERVER_ERRORS')
  }
}

const getters = {
  // Each getter returns a specific client error based on the type.
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
