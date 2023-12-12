<template>
  <div>
    <button @click="$emit('showLogin')">Login</button>
    <button @click="$emit('showSignUp')">Sign Up</button>
  </div>
</template>

<script setup>
// Emits events to parent component to toggle display of Login or SignUp
</script>
