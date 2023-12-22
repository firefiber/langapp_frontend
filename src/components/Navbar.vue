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
          <router-link class="nav-link" to="/practice">
            <i class="bi bi-journal-check"></i>
          </router-link>
        </li>
        <li class="nav-item" v-if="currentRouteName !== 'Profile'">
          <router-link class="nav-link" to="/profile">
            <i class="bi bi-person-circle"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteName = computed(() => route.name)
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

.navbar-toggler {
  border-color: #E2E2E2;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (max-width: 900px) {
  .navbar-brand {
    padding-left: 45px; /* Fixed padding on smaller screens */
  }
}

@media (min-width: 900px) {
  .navbar-nav {
    padding-right: min(45px, 5%);
  }
}
</style>

<!--<template>-->
<!--  <nav class="navbar navbar-expand-lg navbar-light fixed-top">-->
<!--    <router-link class="navbar-brand" to="/">Speasy</router-link>-->
<!--    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">-->
<!--      <span class="navbar-toggler-icon"></span>-->
<!--    </button>-->
<!--    <div class="collapse navbar-collapse" id="navbarNav">-->
<!--      <ul class="navbar-nav ml-auto w-100 justify-content-end">-->
<!--        <li class="nav-item" v-if="currentRouteName !== 'Practice'">-->
<!--          <router-link class="nav-link" to="/practice">Practice</router-link>-->
<!--        </li>-->
<!--        <li class="nav-item" v-if="currentRouteName !== 'Profile'">-->
<!--          <router-link class="nav-link" to="/profile">Profile</router-link>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </nav>-->
<!--</template>-->

<!--<script setup>-->
<!--import { computed } from 'vue'-->
<!--import { useRoute } from 'vue-router'-->

<!--const route = useRoute()-->
<!--const currentRouteName = computed(() => route.name)-->
<!--</script>-->
