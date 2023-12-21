<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <!-- Username Field -->
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
        <div v-if="validationError.username" class="error">{{ validationError.username }}</div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <div v-if="validationError.password" class="error">{{ validationError.password }}</div>
      </div>

      <!-- Login Error Display -->
      <div v-if="credentialError" class="error">{{ credentialError }}</div>
      <div v-if="notFoundError" class="error">{{ notFoundError }}</div>
      <div v-if="generalError" class="error">An error occurred. Please try again.</div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import validators from '@/utils/validators'
import { sendAuthorization } from '@/services/dispatcher'

const store = useStore()
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
</script>

<style scoped>
.error {
  color: red;
  /* Additional styling for error messages */
}
</style>

<!--<template>-->
<!--  <div class="login-container">-->
<!--    <h2>Login</h2>-->
<!--    <form @submit.prevent="submitLogin">-->
<!--      <div>-->
<!--        <label for="username">Username:</label>-->
<!--        <input type="text" id="username" v-model="username" required />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label for="password">Password:</label>-->
<!--        <input type="password" id="password" v-model="password" required />-->
<!--      </div>-->
<!--      <div v-if="loginError" class="error">-->
<!--        {{ loginError }}-->
<!--      </div>-->
<!--      <button type="submit">Login</button>-->
<!--    </form>-->
<!--    <a href="#" @click="forgotPassword">Forgot Password?</a>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, computed } from 'vue'-->
<!--import { useStore } from 'vuex'-->
<!--import { sendAuthorization } from '@/services/dispatcher'-->

<!--const store = useStore()-->
<!--const username = ref('')-->
<!--const password = ref('')-->

<!--const loginError = computed(() => {-->
<!--  return store.getters['error/getClientError'](401)-->
<!--})-->

<!--const submitLogin = async () => {-->
<!--  try {-->
<!--    await sendAuthorization(username.value, password.value)-->
<!--    store.dispatch('error/clearClientErrors')-->
<!--  } catch (error) {-->

<!--  }-->
<!--}-->

<!--// ...forgotPassword logic...-->
<!--</script>-->

<!--<style scoped>-->
<!--.error {-->
<!--  color: red;-->
<!--}-->
<!--</style>-->
