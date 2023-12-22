<!--TODO:  Get language ID from response, it's hardcoded right now -->

<template>
  <div class="registration-container">
    <h3>Create an account</h3>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username">
        <div v-if="validationError.username" class="error">{{ validationError.username }}</div>
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email">
        <div v-if="validationError.email" class="error">{{ validationError.email }}</div>
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password">
        <div v-if="validationError.password" class="error">{{ validationError.password }}</div>
      </div>

      <div class="language-group">
        <div class="input-group">
          <label for="nativeLanguage">Native Language</label>
          <select id="nativeLanguage" v-model="user.userprofile.native_language">
            <option disabled value="">Please select one</option>
            <option value="2">English</option>
          </select>
          <div v-if="validationError.nativeLanguage" class="error">{{ validationError.nativeLanguage }}</div>
        </div>

        <div class="input-group">
          <label for="learningLanguage">Learning Language</label>
          <select id="learningLanguage" v-model="user.userprofile.learning_language_id">
            <option disabled value="">Please select one</option>
            <option value="1">Spanish</option>
          </select>
          <div v-if="validationError.learningLanguage" class="error">{{ validationError.learningLanguage }}</div>
        </div>
      </div>

      <div v-if="badRequestError" class="error">{{ badRequestError }}</div>
      <div v-if="generalError" class="error">{{ generalError }}</div>

      <button type="submit" class="register-button">Register</button>
      <div class="login-link">
        <small>Already have an account? <a href="#" @click.prevent="showLoginForm">Log in!</a></small>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import validators from '@/utils/validators'
import { sendRegistration } from '@/services/dispatcher'

const store = useStore()
const user = ref({
  username: '',
  email: '',
  password: '',
  userprofile: {
    native_language: null,
    learning_language_id: null
  }
})

const emit = defineEmits(['showLoginForm'])

const validationError = ref({})

const badRequestError = computed(() => store.getters['error/requestError'])
const generalError = computed(() => store.getters['error/generalError'])

const registerUser = async () => {
  validationError.value = {}
  validationError.value.username = validators.validateUsername(user.value.username)
  validationError.value.email = validators.validateEmail(user.value.email)
  validationError.value.password = validators.validatePassword(user.value.password)
  validationError.value.nativeLanguage = validators.validateDropdown(user.value.userprofile.native_language, 'Native Language')
  validationError.value.learningLanguage = validators.validateDropdown(user.value.userprofile.learning_language_id, 'Learning Language')

  if (Object.values(validationError.value).every(err => err === '')) {
    try {
      await sendRegistration(user.value)
    } catch (error) {
    }
  }
}

const showLoginForm = () => {
  emit('showLoginForm')
}
</script>

<style scoped>
.registration-container {
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

.registration-form {
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

input, select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: none;
  border-radius: 0.5rem !important;
  border: 1px solid #E2E2E2;
  color: inherit;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
}

select{
  background-color: #1D1D1D;;
}

.register-button {
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

.register-button:hover{
  background-color: red;
}

.error {
  color: red;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
}

.language-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-group {
  flex: 1; /* Makes each input group take up half of the language-group width */
}

@media (max-width: 900px) {
  .language-group {
    flex-direction: column;
  }

  .input-group {
    flex: none; /* Removes flex sizing for mobile view */
  }
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

</style>
