// authenticationService.js
import axios from '@/services/axiosConfig'
import config from '@/config'

export async function login (username, password) {
  return await axios.post(config.BASE_AUTH_LOGIN, {
    username,
    password
  })
}

export async function checkAuthenticationStatus () {
  return await axios.get(config.BASE_AUTH_CHECK, { withCredentials: true })
}

export async function getRoundManager () {
  return await axios.get(config.BASE_REST_PRACTICEROUND, { withCredentials: true })
}
