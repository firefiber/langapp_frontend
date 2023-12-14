<template>
  <div>
    <button @click="fetchOrSubmit">Fetch/Submit</button>

    <div v-if="bufferItem">
      <p>{{ bufferItem.sentence }}</p>
    </div>

    <button @click="sendTestRequest">Send Test Request</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/services/axiosConfig'
import config from '@/config'

export default {
  computed: {
    ...mapState('session', {
      bufferItem: state => state.practiceSession.buffer && state.practiceSession.buffer[0]
    })
  },
  methods: {
    fetchOrSubmit () {
      if (this.bufferItem) {
        // Replace with the appropriate action for submitting translation
      } else {
        this.$store.dispatch('session/fetchPracticeSession')
      }
    },
    async sendTestRequest () {
      if (this.bufferItem) {
        try {
          const userSentence = '¿Dónde estudio?' // Replace with a test sentence in Spanish
          const correctSentence = '¿Dónde estudio?' // Sentence from the buffer

          const response = await axios.post(config.BASE_REST_COMPARE, {
            user_sentence: userSentence,
            original_sentence: correctSentence
          }, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            withCredentials: true // If your API requires authentication
          })

          console.log('Test Request Response:', response.data)
        } catch (error) {
          console.error('Error sending test request:', error)
        }
      }
    }
  }
}
</script>

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; Existing button for fetching or submitting &ndash;&gt;-->
<!--    <button @click="fetchOrSubmit">Fetch/Submit</button>-->

<!--    &lt;!&ndash; Display the first item of the buffer if it exists &ndash;&gt;-->
<!--    <div v-if="bufferItem">-->
<!--      &lt;!&ndash; Translation item display logic &ndash;&gt;-->
<!--      <p>{{ bufferItem.sentence }}</p>-->
<!--    </div>-->

<!--    &lt;!&ndash; New button for sending test request &ndash;&gt;-->
<!--    <button @click="sendTestRequest">Send Test Request</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from '@/services/axiosConfig' // Import axios for making HTTP requests-->
<!--import { mapState } from 'vuex'-->
<!--import config from '@/config'-->

<!--export default {-->
<!--  computed: {-->
<!--    ...mapState({-->
<!--      bufferItem: state => state.PRACTICE_SESSION.buffer && state.PRACTICE_SESSION.buffer[0]-->
<!--    })-->
<!--  },-->
<!--  methods: {-->
<!--    fetchOrSubmit () {-->
<!--      if (this.bufferItem) {-->
<!--        this.$store.dispatch('submitTranslation')-->
<!--      } else {-->
<!--        this.$store.dispatch('getPracticeSession')-->
<!--      }-->
<!--    },-->
<!--    async sendTestRequest () {-->
<!--      if (this.bufferItem) {-->
<!--        try {-->
<!--          const userSentence = '¿Dónde estudio?' // Replace with a test sentence in Spanish-->
<!--          const correctSentence = '¿Dónde estudio?' // Sentence from the buffer-->

<!--          const response = await axios.post(config.BASE_REST_COMPARE, {-->
<!--            user_sentence: userSentence,-->
<!--            original_sentence: correctSentence-->
<!--          }, {-->
<!--            headers: {-->
<!--              'Content-Type': 'application/json; charset=utf-8'-->
<!--            },-->
<!--            withCredentials: true // If your API requires authentication-->
<!--          })-->

<!--          console.log('Test Request Response:', response.data)-->
<!--        } catch (error) {-->
<!--          console.error('Error sending test request:', error)-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; Always display the button &ndash;&gt;-->
<!--    <button @click="fetchOrSubmit">Fetch/Submit</button>-->

<!--    &lt;!&ndash; Display the first item of the buffer if it exists &ndash;&gt;-->
<!--    <div v-if="bufferItem">-->
<!--      &lt;!&ndash; Translation item display logic &ndash;&gt;-->
<!--      <p>{{ bufferItem.sentence }}</p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapState } from 'vuex'-->

<!--export default {-->
<!--  computed: {-->
<!--    ...mapState({-->
<!--      bufferItem: state => state.PRACTICE_SESSION.buffer && state.PRACTICE_SESSION.buffer[0]-->
<!--    })-->
<!--  },-->
<!--  methods: {-->
<!--    fetchOrSubmit () {-->
<!--      // Check if there is data in the buffer-->
<!--      if (this.bufferItem) {-->
<!--        // If there is, submit the current item-->
<!--        this.$store.dispatch('submitTranslation')-->
<!--      } else {-->
<!--        // If not, fetch the practice session-->
<!--        this.$store.dispatch('getPracticeSession')-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
