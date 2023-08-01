<script lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  setup() {
    const pages = ref(['About', 'Map', 'Hello'])
    return { pages }
  }
}
</script>

<template>
  <Navbar :pages="pages" />
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
