<template>
  <div>
    <h1>LandingPage</h1>
    <AuthOptions
      @showLogin="toggleForms('login')"
      @showSignUp="toggleForms('signup')"
    />
    <transition name="fade">
      <LogIn v-if="showLogin" @closeForm="toggleForms('close')" />
    </transition>
    <transition name="fade">
      <SignUp v-if="showSignUp" @closeForm="toggleForms('close')" />
    </transition>
  </div>
</template>

<script setup>
import AuthOptions from '@/components/AuthOptions.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import { ref } from 'vue'

const showLogin = ref(false)
const showSignUp = ref(false)

const toggleForms = (form) => {
  if (form === 'login') {
    showLogin.value = true
    showSignUp.value = false
  } else if (form === 'signup') {
    showSignUp.value = true
    showLogin.value = false
  } else if (form === 'close') {
    showLogin.value = false
    showSignUp.value = false
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
