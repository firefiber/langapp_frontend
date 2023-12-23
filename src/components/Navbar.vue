<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link class="navbar-brand" to="/">
      <span class="brand-title">/speasy</span>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-if="currentRouteName !== 'Practice'">
          <router-link class="nav-link" to="/practice">Practice
<!--            <i class="bi bi-journal-check"></i>-->
          </router-link>
        </li>
        <li class="nav-item" v-if="currentRouteName !== 'Profile'">
          <router-link class="nav-link" to="/profile">Profile
<!--            <i class="bi bi-person-circle"></i>-->
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { revokeAuthorization } from '@/services/dispatcher'

const route = useRoute()
const currentRouteName = computed(() => route.name)

const logout = () => {
  revokeAuthorization()
}
</script>

<style scoped>
.navbar {
  background-color: #1D1D1D;
  font-family: 'Inter', sans-serif;
}

.navbar-brand {
  padding-left: min(45px, 5%);
}

.brand-title {
  font-size: clamp(2rem, 5vw, 2rem);
  color: #E2E2E2;
}

.navbar-nav .nav-link {
  color: #E2E2E2;
  display: flex;
  align-items: center;
}

.navbar-nav .nav-link i {
  margin-right: 0.5rem;
}

@media (max-width: 900px) {
  .navbar-brand {
    padding-left: 45px;
  }
}

@media (min-width: 900px) {
  .navbar-nav {
    padding-right: min(45px, 5%);
  }
}
</style>
