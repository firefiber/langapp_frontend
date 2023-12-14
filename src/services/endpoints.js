import axios from '@/services/axiosConfig'
import config from '@/config'

export const login = async (username, password) => {
  try {
    const response = await axios.post(config.BASE_AUTH_LOGIN, { username, password })
    return response
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle incorrect credentials
        throw new Error('Incorrect username or password.')
      } else if (error.response.status === 404) {
        // Handle account not found
        throw new Error('Account not found.')
      } else {
        // Handle other server-related errors
        throw new Error('Error communicating with the server.')
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please try again later.')
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request.')
    }
  }
}

export const authCheck = async () => {
  try {
    const response = await axios.get(config.BASE_AUTH_CHECK, { withCredentials: true })
    return response
  } catch (error) {
    // General catch-all for server busy or unavailable
    throw new Error('Server is currently unavailable. Please try again later.')
  }
}

export const practiceSession = async () => {
  try {
    const response = await axios.get(config.BASE_REST_PRACTICEROUND, { withCredentials: true })
    return response
  } catch (error) {
    // General catch-all for server busy or unavailable
    throw new Error('Server is currently unavailable. Please try again later.')
  }
}
