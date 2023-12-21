<template>
  <div class="landing-page">
    <h1>Speakeasy</h1>
    <button @click="showLogin = true; showUserRegistration = false">Login</button>
    <button @click="showUserRegistration = true; showLogin = false">Create Account</button>

    <Login v-if="showLogin" />
    <CreateAccount v-if="showUserRegistration" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/components/UserLogin.vue'
import CreateAccount from '@/components/UserRegistration.vue'

const showLogin = ref(false)
const showUserRegistration = ref(false)
</script>

<style scoped>

</style>
