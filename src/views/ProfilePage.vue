<template>
  <div class="profile-page">
    <!-- Profile Section -->
    <section class="profile-section">
      <h1>@{{ username }}</h1>
      <div class="profile-details">
        <h2>Profile</h2>
        <ul>
          <li><strong>Native Language:</strong> {{ nativeLanguage }}</li>
          <li><strong>Learning Languages:</strong> {{ learningLanguages }}</li>
          <li><strong>Active Since:</strong> {{ activeSince }}</li>
        </ul>
      </div>
    </section>

    <!-- Training Section -->
    <section class="training-section">
      <h2>{{ trainingSectionTitle }}</h2>
      <ul>
        <li><strong>Proficiency:</strong> {{ proficiency }}</li>
        <li><strong>Word Bank Size:</strong> {{ wordBankCount }}</li>
        <li><strong>Streak:</strong> {{ streak }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const username = computed(() => store.state.user.username)
const nativeLanguage = computed(() => store.state.user.nativeLanguage)
const learningLanguages = computed(() => store.state.user.learningLanguages)
const activeSince = computed(() => store.state.user.learningSince)

const trainingSectionTitle = computed(() => Object.keys(store.state.user.learningLanguages)[0] + ' (Active)')

const proficiency = computed(() => store.state.training.proficiency)
const wordBankCount = computed(() => store.state.training.wordBankCount)
const streak = computed(() => store.state.training.streak)
</script>

<style>
/* Add your base and specific CSS styles here */
/* ... */
</style>
