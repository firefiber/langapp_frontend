<template>
  <div class="landing-page d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <h1>/speasy</h1>
    <div v-if="!showLogin && !showUserRegistration" class="button-container">
      <button class="btn btn-primary login-button" @click="toggleForms('login')">Login</button>
      <button class="btn btn-outline-primary register-button" @click="toggleForms('register')">Create Account</button>
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
  width: clamp(300px, 50vw, 500px);
  margin: 0 auto;
  background-color: #1D1D1D;
  color: #E2E2E2;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-weight: 400;
  font-size: clamp(1.5rem, 2.5vw, 3rem);
  padding-top: 50px;
  padding-bottom: 20px;
}

.btn {
  font-family: 'Inter', sans-serif;
  padding: 0.75rem;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
  border-radius: 0.5rem;
  border: 1px solid #E2E2E2;
  margin-bottom: 1rem;
  width: 100%;
  cursor: pointer;
  background-color: #8BE0E5;
  color: #1D1D1D;
}

.login-button:active, .register-button:active {
  background-color: red;
}

@media (max-width: 900px) {
  .landing-page {
    width: auto;
  }
}

</style>
