<template>
  <div class="practice-page">
    <aside class="sidebar words-list">
      <h2>WORDS</h2>
      <ul>
        <li v-for="(item, index) in recentWords" :key="index" :style="{ opacity: getOpacity(index) }">
          {{ item.word }}
        </li>
      </ul>
    </aside>

    <section class="main-content">
      <div class="sentence">
        <h2>SENTENCE</h2>
        <!-- Display the sentence from the current item -->
        <p v-if="currentItem">{{ currentItem.translation }}</p>
      </div>
      <div class="translation-input">
        <input
          type="text"
          v-model="userTranslation"
          placeholder="Type your translation here"
        />
        <button @click="handleButtonClick">{{ isNextPhase ? 'Next' : 'Submit' }}</button>
      </div>
      <div v-if="inputError" class="error">{{ inputError }}</div>
    </section>

    <aside class="sidebar results">
      <h2>RESULT</h2>
      <div v-if="comparisonResult" class="comparison-result">
        <p>{{ comparisonResult }}</p>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { sendSentenceComparison, getSession } from '@/services/dispatcher'
import validators from '@/utils/validators'

const store = useStore()

onBeforeMount(() => {
  store.dispatch('error/clearClientErrors')
})

const userTranslation = ref('')
const isNextPhase = ref(false)
const inputError = ref('')

const buffer = computed(() => store.state.session.buffer)
const currentItem = computed(() => buffer.value[0] || null)
const comparisonResult = computed(() => store.state.session.comparisonResult)
// const permissionError = computed(() => store.getters['error/permissionError'])
// const generalError = computed(() => store.getters['error/generalError'])

watch(buffer, (newBuffer) => {
  if (newBuffer.length <= 5) {
    getSession()
  }
}, { immediate: true })

const recentWords = computed(() => {
  // Reverse the buffer to get the latest words at the top and slice the last 10
  return buffer.value.slice(-10).reverse().map(item => ({
    word: item.word
  }))
})

const maxOpacity = 1
const minOpacity = 0.1

const getOpacity = (index) => {
  const totalItems = recentWords.value.length
  const opacityStep = (maxOpacity - minOpacity) / Math.max(totalItems - 1, 1)
  return Math.max(maxOpacity - index * opacityStep, minOpacity).toString()
}

const handleButtonClick = async () => {
  if (!isNextPhase.value) {
    inputError.value = validators.validateInput(userTranslation.value)
    if (inputError.value) return

    try {
      await sendSentenceComparison(userTranslation.value, currentItem.value.sentence)
      userTranslation.value = ''
      isNextPhase.value = true // Move to next phase after submission
    } catch (error) {}
  } else {
    isNextPhase.value = false // Reset for next item
    await store.dispatch('session/popCompletedBufferItem')
    await store.dispatch('session/clearComparisonResult')
  }
}

</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.practice-page {
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 1fr));
  gap: 20px;
  margin: 0 9.375rem;
  align-items: start;
  justify-content: center;
  height: calc(100vh - 9.375rem * 2);
}

.words-list, .results {
  padding: 1rem;
  min-width: 250px;
  position: relative;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-width: 500px;
}

h2 {
  font-size: clamp(1rem, 2vw, 2rem);
}

p, li {
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
}

.sentence h2, .translation-input {
  margin-bottom: 0.5rem;
}

.sentence p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.translation-input input {
  width: 100%;
  margin-bottom: 1rem;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.error {
  color: red;
}

ul {
  padding: 0;
  list-style: none;
}

li {
  margin-bottom: 0.5rem;
}

@media (max-width: 900px) {
  .practice-page {
    grid-template-columns: 1fr;
    gap: 0;
    margin: 0 3.125rem;
    height: auto;
  }

  .words-list {
    display: none;
  }

  .main-content, .results {
    width: 100%;
  }

  h2 {
    font-size: 4vw;
  }

  p, li {
    font-size: 3vw;
  }
}
</style>
