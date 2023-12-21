<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="navbar-brand" to="/">Speasy</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto w-100 justify-content-end">
        <li class="nav-item" v-if="currentRouteName !== 'Practice'">
          <router-link class="nav-link" to="/practice">Practice</router-link>
        </li>
        <li class="nav-item" v-if="currentRouteName !== 'Profile'">
          <router-link class="nav-link" to="/profile">Profile</router-link>
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
