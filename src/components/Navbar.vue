<template>
  <nav>
    <div class="title">VueMap</div>
    <div :class="{ links: true, 'show-dropdown': showDropdown }">
      <router-link to="/" @click="toggleDropdown">About</router-link>
      <router-link :to="{ name: 'Map' }" @click="toggleDropdown">Map</router-link>
    </div>
    <div class="hamburger" @click="toggleDropdown">&#9776;</div>
  </nav>
</template>

<script lang="ts">
//Script to toggle the hamburger menu
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showDropdown = ref(false)
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    return { showDropdown, toggleDropdown }
  }
})
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 5rem;
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
