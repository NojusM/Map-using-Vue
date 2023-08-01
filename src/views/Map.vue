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
import tileProvidersData from '@/data/tileProviders.json'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L, { type LatLngExpression, type PointExpression } from 'leaflet'
import { LMap, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
const zoom = ref(7)
const center = ref([54.6872, 25.2797] as PointExpression)
const marker = ref([54.6872, 25.2797] as LatLngExpression)
const tileProviders = ref(tileProvidersData)
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
