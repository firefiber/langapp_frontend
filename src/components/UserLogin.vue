<template>
  <div class="auth-container">
    <h3>Sign In</h3>
    <form @submit.prevent="submitLogin" class="auth-form">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" class="auth-input">
        <div v-if="validationError.username" class="error">{{ validationError.username }}</div>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="auth-input">
        <div v-if="validationError.password" class="error">{{ validationError.password }}</div>
        <small class="forgot-password"><a href="#">Forgot Password?</a></small>
      </div>
      <div v-if="credentialError" class="error">{{ credentialError }}</div>
      <div v-if="notFoundError" class="error">{{ notFoundError }}</div>
      <div v-if="generalError" class="error">{{ generalError }}</div>
      <button type="submit" class="auth-button">Sign in</button>
      <div class="auth-link">
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
