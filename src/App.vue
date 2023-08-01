<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar :pages="['About', 'Map']" />
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
