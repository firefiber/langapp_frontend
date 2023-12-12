<template>
  <h1>Login</h1>
  <form @submit.prevent="handleLogin">
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Submit</button>
    <button type="button" @click="$emit('closeForm')">Close</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const username = ref('')
const password = ref('')
const store = useStore()

const handleLogin = () => {
  store.dispatch('login', { username: username.value, password: password.value })
}
</script>
