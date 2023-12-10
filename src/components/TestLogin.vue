<template>
  <button @click="sendLoginRequest">Login</button>
  <button @click="sendLogOutRequest">Logout</button>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    async sendLoginRequest () {
      try {
        const response = await axios.post('http://localhost:8000/user/login/', {
          // Your login payload here
          username: 'jocko2',
          password: 'strong_password123'
        })
        console.log(response.data) // Handle the response as needed
      } catch (error) {
        console.error(error) // Handle errors
      }
    },
    async sendLogOutRequest () {
      try {
        const response = await axios.post('http://localhost:8000/user/logout/')
        console.log(response.data) // Handle the response as needed
      } catch (error) {
        console.error(error) // Handle errors
      }
    }
  }
}

</script>
