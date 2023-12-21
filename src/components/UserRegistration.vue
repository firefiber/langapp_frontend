<template>
  <div class="registration-container">
    <h2>Create an account</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username">
        <div v-if="validationError.username" class="error">{{ validationError.username }}</div>
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email">
        <div v-if="validationError.email" class="error">{{ validationError.email }}</div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password">
        <div v-if="validationError.password" class="error">{{ validationError.password }}</div>
      </div>

      <div>
        <label for="nativeLanguage">Native Language:</label>
        <select id="nativeLanguage" v-model="user.userprofile.native_language">
          <option disabled value="">Please select one</option>
          <option value="2">English</option> <!-- Hardcoded ID for English -->
        </select>
        <div v-if="validationError.nativeLanguage" class="error">{{ validationError.nativeLanguage }}</div>
      </div>

      <div>
        <label for="learningLanguage">Learning Language:</label>
        <select id="learningLanguage" v-model="user.userprofile.learning_language_id">
          <option disabled value="">Please select one</option>
          <option value="1">Spanish</option> <!-- Hardcoded ID for Spanish -->
        </select>
        <div v-if="validationError.learningLanguage" class="error">{{ validationError.learningLanguage }}</div>
      </div>

      <div v-if="badRequestError" class="error">{{ badRequestError }}</div>
      <div v-if="generalError" class="error">A general error occurred. Please try again.</div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
const validationError = ref({})

const badRequestError = computed(() => store.getters['error/requestError'])
const generalError = computed(() => store.getters['error/generalError'])

const registerUser = async () => {
  validationError.value = {} // Reset errors before validation
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
</script>

<style scoped>
.error {
  color: red;
  /* Add more styling for error messages as needed */
}
</style>
