<template>
  <div class="log-in-page">
    <h1>Sign Up</h1>
    <test-register></test-register>
  </div>
</template>

<script>
import TestRegister from '@/components/TestRegister.vue'

export default {
  name: 'SignUp',
  components: {
    TestRegister
  }
}

</script>
