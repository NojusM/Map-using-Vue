<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/">About</router-link> |
    <router-link to="/map">Map</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
