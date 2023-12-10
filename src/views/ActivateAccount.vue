<template>
  <div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    const uid = this.$route.params.uid
    const token = this.$route.params.token
    axios.post('http://localhost:8000/auth/users/activation/', { uid, token })
      .then(response => {
        this.message = 'Account activated successfully.'
        // Redirect or additional logic here
      })
      .catch(error => {
        this.message = 'Activation failed: ' + (error.response.data.detail || 'Unknown error')
        // Additional error handling here
      })
  }
}
</script>
