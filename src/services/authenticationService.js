// authenticationService.js
import axios from 'axios'

export async function login (username, password) {
  return await axios.post('/user/login/', {
    username,
    password
  })
}

export async function checkAuthenticationStatus () {
  return await axios.get('/user/session/', { withCredentials: true })
}

// ... other functions like logout, etc.
