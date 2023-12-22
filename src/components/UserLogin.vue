<template>
  <div class="login-container">
    <h3>Sign In</h3>
    <form @submit.prevent="submitLogin" class="login-form">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username">
        <div v-if="validationError.username" class="error">{{ validationError.username }}</div>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
        <div v-if="validationError.password" class="error">{{ validationError.password }}</div>
        <button type="button" class="forgot-password">Forgot Password?</button>
      </div>
      <div v-if="credentialError" class="error">{{ credentialError }}</div>
      <div v-if="notFoundError" class="error">{{ notFoundError }}</div>
      <div v-if="generalError" class="error">{{ generalError }}</div>
      <button type="submit" class="login-button">Sign in</button>
      <div class="registration-link">
        <small>Don't have an account? <a href="#" @click.prevent="showRegistrationForm">Create one!</a></small>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import validators from '@/utils/validators'
import { sendAuthorization } from '@/services/dispatcher'

const store = useStore()

const emit = defineEmits(['showRegistrationForm'])

const username = ref('')
const password = ref('')
const validationError = ref({})

const credentialError = computed(() => store.getters['error/credentialError'])
const notFoundError = computed(() => store.getters['error/notFoundError'])
const generalError = computed(() => store.getters['error/generalError'])

const submitLogin = async () => {
  validationError.value = {}
  validationError.value.username = validators.validateUsername(username.value)
  validationError.value.password = validators.validatePassword(password.value)

  if (Object.values(validationError.value).every(err => err === '')) {
    try {
      await sendAuthorization(username.value, password.value)
    } catch (error) {
    }
  }
}

const showRegistrationForm = () => {
  emit('showRegistrationForm')
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1D1D1D;
  color: #E2E2E2;
  font-family: 'Inter', sans-serif;
}

h3 {
  font-weight: 400;
  font-size: clamp(1.5rem, 2.5vw, 3rem);
}

.login-form {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  width: clamp(300px, 50vw, 500px);
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 300;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: none;
  border-radius: 0.5rem !important;
  border: 1px solid #E2E2E2;
  color: inherit;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
}

.forgot-password {
  background: none;
  color: #8BE0E5;
  border: none;
  cursor: pointer;
  font-weight: 400;
  text-align: left;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  margin-top: 0.5rem;
}

.login-button {
  background-color: #8BE0E5;
  color: #1D1D1D;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 400;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
  width: 100%;
}

.error {
  color: red;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
}

.registration-link, .login-link {
  text-align: center;
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .input-group {
    flex-direction: column;
    align-items: flex-start;
  }

  label, input {
    width: auto;
  }
}

</style>
