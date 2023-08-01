<template>
  <div class="wrapper">
    <div class="sidebar"></div>
    <div class="map">
      <l-map ref="map" v-model:zoom="zoom" v-model:center="center">
        <l-control-layers position="bottomright"></l-control-layers>
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <l-marker :lat-lng="marker"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L, { LatLng, type LatLngExpression, type PointExpression } from 'leaflet'
import { LMap, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'

const zoom = ref(7)
const center = ref([54.6872, 25.2797] as PointExpression)
const marker = ref([54.6872, 25.2797] as LatLngExpression)
const tileProviders = ref([
  {
    name: 'OpenStreetMap',
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'Stadia Maps',
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
  },
  {
    name: 'CartoDB_Voyager',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  }
])
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 5rem;
}

.map {
  height: 80vh;
  width: 100%;
  padding-right: 10rem;
}

.leaflet-container {
  font-size: 1.5rem;
}
</style>
