<template>
  <div class="landing-page d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <h1>/Speasy</h1>
    <div v-if="!showLogin && !showUserRegistration" class="button-container">
      <button class="btn login-button mb-2" @click="toggleForms('login')">Login</button>
      <button class="btn register-button" @click="toggleForms('register')">Create Account</button>
    </div>

    <Login v-if="showLogin" @close="closeForms" />
    <CreateAccount v-if="showUserRegistration" @close="closeForms" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/components/UserLogin.vue'
import CreateAccount from '@/components/UserRegistration.vue'

const showLogin = ref(false)
const showUserRegistration = ref(false)

const toggleForms = (form) => {
  if (form === 'login') {
    showLogin.value = true
    showUserRegistration.value = false
  } else if (form === 'register') {
    showLogin.value = false
    showUserRegistration.value = true
  }
}

const closeForms = () => {
  showLogin.value = false
  showUserRegistration.value = false
}
</script>

<style scoped>
.landing-page {
  width: clamp(300px, 50vw, 500px);
  margin: 0 auto;
  background-color: #1D1D1D;
  color: #E2E2E2;
  font-family: 'Inter', sans-serif;
}

h1{
  padding-bottom: 50px;
}

.btn {
  font-family: 'Inter', sans-serif;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: none;
  width: 100%;
}

.login-button {
  background-color: #8BE0E5;
}

.register-button {
  background-color: #8BE0E5;
  margin-top: 10px;
}
</style>
