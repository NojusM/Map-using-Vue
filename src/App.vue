<script setup lang="ts">
//Script to toggle the hamburger menu
import { ref } from 'vue'

const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>

<template>
  <nav>
    <div class="title">VueMap</div>
    <div :class="{ links: true, 'show-dropdown': showDropdown }">
      <router-link to="/" @click="toggleDropdown">About</router-link>
      <router-link to="/map" @click="toggleDropdown">Map</router-link>
    </div>
    <div class="hamburger" @click="toggleDropdown">&#9776;</div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  box-sizing: border-box;
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

.hamburger {
  display: none;
}

@media (max-width: 1000px) {
  /* Change navbar links to hamburger */
  nav {
    display: flex;
    justify-content: space-between;
    margin: 0 2rem 0 2rem;
    gap: 1rem;
  }
  .links {
    display: none;
    flex-direction: column;
    align-items: center;
  }

  .show-dropdown {
    display: flex;
    position: absolute;
    top: 7rem;
    left: 0;
    width: 100%;
    padding: 1rem;
    color: white;
    background-color: var(--primary-dark);
    opacity: 80%;
  }

  .links a {
    width: 100%;
    text-align: center;
    color: inherit;
  }

  .links a:hover {
    color: var(--primary-bright);
  }

  .links a.router-link-exact-active {
    color: var(--primary-bright);
  }

  .hamburger {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: var(--primary);
  }
}
</style>
