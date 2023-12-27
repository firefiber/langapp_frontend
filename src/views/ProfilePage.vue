<!--TODO: Update profile data-->

<template>
  <div class="profile-page-container">
    <div class="profile-page">
      <!-- Profile Section -->
      <section class="profile-section">
        <h1 class="username">@{{ username }}</h1>
        <div class="profile-details">
          <h2 class="section-heading">Profile</h2>
          <div class="detail">
            <span class="detail-title">Native Language</span>
            <span class="detail-content">{{ nativeLanguage }}</span>
          </div>
          <div class="detail">
            <span class="detail-title">Active Since</span>
            <span class="detail-content">{{ activeSince }}</span>
          </div>
        </div>
      </section>

      <!-- Training Section -->
      <section class="training-section">
        <h2 class="section-heading">{{ trainingSectionTitle }}</h2>
        <div class="detail">
          <span class="detail-title">Proficiency</span>
          <span class="detail-content">{{ proficiency }}</span>
        </div>
        <div class="detail">
          <span class="detail-title">Word Bank Size</span>
          <span class="detail-content">{{ wordBankCount }}</span>
        </div>
        <div class="detail">
          <span class="detail-title">Streak</span>
          <span class="detail-content">{{ streak }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const username = computed(() => store.state.user.username)
const nativeLanguage = computed(() => store.state.user.nativeLanguage)
const activeSince = computed(() => store.state.user.learningSince)

const trainingSectionTitle = computed(() => Object.keys(store.state.user.learningLanguages)[0] + ' (Active)')

const proficiency = computed(() => store.state.training.proficiency)
const wordBankCount = computed(() => store.state.training.wordBankCount)
const streak = computed(() => store.state.training.streak)
</script>

<style scoped>
.profile-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

.profile-page {
  width: clamp(300px, 50vw, 500px);
  text-align: center;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: #E2E2E2;
}

.username {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 4rem;
}

.section-heading {
  text-align: left;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 1.5rem 0;
}

.detail {
  display: flex;
  justify-content: space-between;

  color: #cecece;
}

.detail-title {
  font-weight: 600;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}

.detail-content {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}
</style>
