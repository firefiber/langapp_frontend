<template>
  <div class="log-in-page">
    <h1>Log in</h1>
    <test-login></test-login>
  </div>
</template>

<script>
import TestLogin from '@/components/TestLogin.vue'

export default {
  name: 'LogIn',
  components: {
    TestLogin
  }
}

</script>
