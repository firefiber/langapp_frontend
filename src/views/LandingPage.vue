<template>
  <div class="landing-page d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <h1>/speasy</h1>
    <div v-if="!showLogin && !showUserRegistration" class="button-container">
      <button class="auth-button" @click="toggleForms('login')">Login</button>
      <button class="outline" @click="toggleForms('register')">Create Account</button>
    </div>

    <Login v-if="showLogin" @close="closeForms" @showRegistrationForm="handleShowRegistrationForm"/>
    <CreateAccount v-if="showUserRegistration" @close="closeForms" @showLoginForm="handleShowLoginForm" />
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

const handleShowLoginForm = () => {
  showLogin.value = true
  showUserRegistration.value = false
}

const handleShowRegistrationForm = () => {
  showLogin.value = false
  showUserRegistration.value = true
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  margin-top: 2rem;
  margin-bottom: 5rem;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.outline{
  background-color: transparent;
  color: #E2E2E2;
  border: 1px solid  #8BE0E5;
}

</style>
