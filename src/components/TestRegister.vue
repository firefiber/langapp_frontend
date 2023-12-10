<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" required />
    </div>

    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />
    </div>

    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/users/', {
      username: username.value,
      email: email.value,
      password: password.value,
      userprofile: {
        native_language: 1, // Example value
        learning_language_id: 2 // Example value
      }
    })
    console.log('Registration successful:', response.data)
  } catch (error) {
    console.error('Registration failed:', error.response.data)
  }
}
</script>
