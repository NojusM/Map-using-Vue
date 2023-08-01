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
  grid-template-columns: 5fr 1fr;
  border-bottom: 2px solid black;
  padding: 1rem;
}
.title {
  font-size: 4rem;
}

.links {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.links a {
  color: black;
  font-size: 2rem;
  font-weight: 600;
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
