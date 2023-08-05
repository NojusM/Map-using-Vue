<template>
  <div class="wrapper">
    <Sidebar />
    <div class="map">
      <l-map
        ref="map"
        v-model:zoom="markerStore.zoom"
        v-model:center="markerStore.mapCenter"
        @click="markerStore.addMarkerOnMap"
        @ready="getMap()"
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
import { LMap, LTileLayer, LControlLayers } from '@vue-leaflet/vue-leaflet'
import { onBeforeMount, ref } from 'vue'
import { useMarkersStore } from '@/stores/markers'
import Sidebar from './Sidebar.vue'
import Marker from './Marker.vue'
import Polyline from './Polyline.vue'
import tileProvidersData from '@/data/tileProviders.json'
import 'leaflet/dist/leaflet.css'

const markerStore = useMarkersStore()
const tileProviders = ref(tileProvidersData)
const map = ref<any>(null)

const getMap = () => {
  markerStore.map = map.value.leafletObject
}

onBeforeMount(() => {
  if (!markerStore.geoLocationGot && 'geolocation' in navigator) {
    // If geolocation is available, try to get the user's coordinates
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      markerStore.mapCenter = [latitude, longitude]
      markerStore.geoLocationGot = true
      markerStore.zoom = 7
    })
  }
})
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
