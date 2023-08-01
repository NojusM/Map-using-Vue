<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

const pages = ref(['About', 'Map', 'Hello'])
</script>

<template>
  <Navbar :pages="pages" />
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
