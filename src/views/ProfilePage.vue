<template>
  <div class="profile-page">
    <h2>User Profile</h2>
    <p><strong>Username:</strong> {{ userProfile.username }}</p>
    <p><strong>Learning Language:</strong> {{ userProfile.learningLanguage }}</p>
    <p><strong>Native Language:</strong> {{ userProfile.nativeLanguage }}</p>
    <p><strong>Proficiency:</strong> {{ userProfile.proficiency }}</p>
    <p><strong>Words Learned:</strong> {{ userProfile.learnedWordCount }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const userProfile = computed(() => {
  const userData = store.state.user
  const trainingData = store.state.training

  // Find the learning language marked as true
  const learningLanguage = Object.keys(userData.learningLanguages).find(lang => userData.learningLanguages[lang] === true)

  return {
    username: userData.username,
    learningLanguage: learningLanguage,
    nativeLanguage: userData.nativeLanguage,
    proficiency: trainingData.proficiency,
    learnedWordCount: trainingData.wordBankCount
  }
})
</script>

<style scoped>
/* Your styles */
</style>
