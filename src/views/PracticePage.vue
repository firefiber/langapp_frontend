<!--TODO: Logout triggering the watch on session wipe. -->

<template>
  <div class="practice-container">
    <aside class="sidebar words-list">
      <h2>WORD</h2>
      <transition-group name="slide" class="sidebar words-list" tag="ul">
        <li v-if="showPlaceholder" class="placeholder" :key="'placeholder'" :style="{ opacity: 0 }"></li>
        <li v-else :key="'displayedWord'" :style="{ opacity: getOpacity(0) }">
          {{ displayedWord }}
        </li>
        <li v-for="(word, index) in recentWords" :key="index" :style="{ opacity: getOpacity(index + 1) }">
          {{ word }}
        </li>
      </transition-group>
    </aside>

    <section class="main-content">
      <div class="sentence">
        <h2>SENTENCE</h2>
        <p v-if="currentItem" class="sentence-content">{{ currentItem.translation }}</p>
      </div>
      <div class="translation-input">
        <h2>TRANSLATION</h2>
        <textarea
          id="translation"
          type="text"
          v-model="userTranslation"
          :disabled="isNextPhase"
          placeholder="Type your translation here"
          class="translation-field"
        />
        <div v-if="inputError" class="error">{{ inputError }}</div>
        <button @click="handleButtonClick" class="submit-button" :disabled="isNextPhase && !comparisonResult">{{ isNextPhase ? 'Next' : 'Submit' }}</button>
        <div v-if="permissionError" class="error">{{ permissionError }}</div>
        <div v-if="generalError" class="error">{{ generalError }}</div>
      </div>
    </section>

    <aside class="sidebar results">
      <h2>RESULT</h2>
      <div v-if="comparisonResult">
        <h3>Score: {{ comparisonResult.similarity}}</h3>
        <h3>Words</h3>
        <transition-group name="list" tag="ul">
          <li v-for="(wordScore, index) in comparisonResult.word_scores" :key="index">
            {{ wordScore[0] }}: {{ wordScore[1] }}
          </li>
        </transition-group>
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
const displayedWord = ref('')
const recentWords = ref([])
const showPlaceholder = ref(true)

const buffer = computed(() => store.state.session.buffer)
const currentItem = computed(() => buffer.value[0] || null)
const comparisonResult = computed(() => store.state.session.comparisonResult)
const permissionError = computed(() => store.getters['error/permissionError'])
const generalError = computed(() => store.getters['error/generalError'])

watch(() => buffer.value.length, (newBuffer) => {
  if (newBuffer <= 5) {
    getSession()
  }
}, { immediate: true })

const maxOpacity = 1
const minOpacity = 0.1

const getOpacity = (index) => {
  const totalItems = recentWords.value.length + (displayedWord.value ? 1 : 0)
  const opacityStep = (maxOpacity - minOpacity) / Math.max(totalItems - 1, 1)
  return Math.max(maxOpacity - index * opacityStep, minOpacity).toString()
}

const handleButtonClick = async () => {
  if (!isNextPhase.value) {
    inputError.value = validators.validateInput(userTranslation.value)
    if (inputError.value) return
    try {
      displayedWord.value = currentItem.value ? currentItem.value.word : ''
      showPlaceholder.value = false
      isNextPhase.value = true
      await sendSentenceComparison(userTranslation.value, currentItem.value.sentence)
    } catch (error) {
    }
  } else {
    if (displayedWord.value) {
      if (displayedWord.value) {
        recentWords.value.unshift(displayedWord.value)
        if (recentWords.value.length > 10) {
          recentWords.value.pop()
        }
      }
      userTranslation.value = ''
      displayedWord.value = ''
      showPlaceholder.value = true
      isNextPhase.value = false
      await store.dispatch('session/popCompletedBufferItem')
      await store.dispatch('session/clearComparisonResult')
    }
  }
}
</script>

<style scoped>

.practice-container {
  color: #E2E2E2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  gap: 2rem;
  padding-top: 10%;
}

.sidebar {
  width: 25%;
  box-sizing: border-box;
}

.slide-move{
  transition: transform 0.25s
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: left;
}

.sentence{
  margin-bottom: 5rem;
}

.list-enter-active, .list-leave-active {
  transition: all 0.2s ease;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.translation-input {
  width: 100%;
  margin: 1rem 0;
}

.translation-field {
  width: 100%;
  min-height: 100px;
  padding: 0.4rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #E2E2E2;
  background-color: #E2E2E2;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  background-color: #8BE0E5;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

.submit-button:disabled{
  background-color: rgba(157, 178, 180, 0.42);
}

ul{
  list-style: none;
  padding: 0;
}

li{
  margin: 0.2rem 0;
}

h2{
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  color: #DADADA;
  margin-bottom: 2rem;
  font-weight: lighter;
}

.sidebar>li, p{
  font-size: clamp(2.2rem, 2.625vw, 2.625rem);
}

.sidebar>li:not(:first-child) {
  font-size: clamp(1.1rem, 1.5rem, 1.5rem);
}

.error {
  color: red;
}

label {
  display: block;
  color: #E2E2E2;
  margin-bottom: 0.5rem;
}

@media (max-width: 900px) {
  .practice-container {
    flex-direction: column;
  }

  .words-list {
    display: none;
  }

  .main-content, .results {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
