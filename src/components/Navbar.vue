<template>
  <nav>
    <div class="title">VueMap</div>
    <div :class="{ links: true, 'show-dropdown': showDropdown }">
      <router-link
        v-for="page in existingPages"
        :key="page"
        :to="{ name: page }"
        @click="toggleDropdown"
        >{{ page }}</router-link
      >
    </div>
    <div class="hamburger" @click="toggleDropdown">&#9776;</div>
  </nav>
</template>

<script setup lang="ts">
//Script to toggle the hamburger menu
import { ref, computed } from 'vue'
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'

const props = defineProps<{ pages: string[] }>()
const router = useRouter()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Check if the route with the given name exists
const routeExists = (routeName: string) => {
  try {
    const route = router.resolve({ name: routeName }) as RouteLocationNormalizedLoaded
    return !!route.matched.length
  } catch (error) {
    return false
  }
}

const existingPages = computed(() => {
  return props.pages?.filter((page: string) => routeExists(page))
})
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 5rem;
  z-index: 1000;
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
  z-index: 9999;
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
    opacity: 90%;
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
  }

  .links a {
    width: 100%;
    text-align: center;
    color: var(--primary);
  }

  .links a:hover {
    color: var(--primary-bright);
  }

  .links a.router-link-exact-active {
    color: white;
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
