<template>
  <form @submit.prevent="handlePasswordReset">
    <input type="email" placeholder="Email" v-model="email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handlePasswordReset = () => {
  // Implement password reset logic here
}
</script>
