<template>
  <form @submit.prevent="handleUpdateCredentials">
    <input type="email" placeholder="New Email" v-model="email" />
    <input type="password" placeholder="New Password" v-model="password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleUpdateCredentials = () => {
}
</script>
