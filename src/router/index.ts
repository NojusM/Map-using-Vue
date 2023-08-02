import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Map from '../views/Map.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Map-using-Vue/',
      name: 'About',
      component: About
    },
    {
      path: '/Map-using-Vue/map',
      name: 'Map',
      component: Map
    }
  ]
})
