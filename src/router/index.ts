import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Map from '../views/Map.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
