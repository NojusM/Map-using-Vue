<script setup lang="ts"></script>

<template>
  <nav>
    <div class="title">VueMap</div>
    <div class="links">
      <router-link to="/">About</router-link>
      <router-link to="/map">Map</router-link>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.title {
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.links a {
  color: black;
  font-size: 2rem;
  font-weight: 400;
  text-decoration: none;
  margin-right: 1rem;
}

.links a:hover {
  color: var(--primary);
}
.links a.router-link-exact-active {
  color: var(--primary-bright);
}
</style>
