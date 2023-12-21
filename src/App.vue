<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet">
  <div id="app">
    <Navbar v-if="showNavbar" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()

const showNavbar = computed(() => !route.meta.hideNavbar)
</script>

<style>

html,#app{
  background-color: #1D1D1D;
}

.navbar {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 2.5rem
}
</style>
