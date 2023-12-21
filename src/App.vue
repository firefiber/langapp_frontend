<template>
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

*{
  background-color: #1D1D1D;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 2.5rem
}
</style>
