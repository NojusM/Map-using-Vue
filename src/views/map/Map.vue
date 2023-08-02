<template>
  <div class="wrapper">
    <Sidebar />
    <div class="map">
      <l-map
        ref="map"
        v-model:zoom="zoom"
        v-model:center="markerStore.mapCenter"
        @click="markerStore.addMarkerOnMap"
      >
        <l-control-layers position="bottomright"></l-control-layers>
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <Marker />
        <Polyline />
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L, { type PointExpression } from 'leaflet'
import { LMap, LTileLayer, LControlLayers } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import { useMarkersStore } from '@/stores/markers'
import Sidebar from './Sidebar.vue'
import Marker from './Marker.vue'
import Polyline from './Polyline.vue'
import tileProvidersData from '@/data/tileProviders.json'
import 'leaflet/dist/leaflet.css'

const markerStore = useMarkersStore()
const zoom = ref(7)
const tileProviders = ref(tileProvidersData)
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 3fr 7fr;
}

.map {
  height: 80vh;
  width: 100%;
  padding-right: 5rem;
}

.leaflet-container {
  font-size: 1.5rem;
  border: 1px solid black;
}
</style>
