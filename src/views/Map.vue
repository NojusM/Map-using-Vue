<template>
  <div class="wrapper">
    <div class="sidebar">
      <div v-for="(marker, index) in markers" :key="index" class="marker-info">
        <p>
          <span class="label">Marker position: </span>
          <span class="coordinates">{{ marker[0] }}° N {{ marker[1] }}° E</span>
        </p>
        <button class="btn-delete" @click="markers.splice(index, 1)">Delete marker</button>
      </div>
      <button class="btn-add" @click="markers.push(BASE_COORDINATES)">Add marker</button>
    </div>
    <div class="map">
      <l-map ref="map" v-model:zoom="zoom" v-model:center="center" @click="onMapClick">
        <l-control-layers position="bottomright"></l-control-layers>
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <!-- prettier-ignore -->
        <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="(marker as LatLngExpression)" draggable @dragend="onMarkerDragEnd"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import tileProvidersData from '@/data/tileProviders.json'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L, { LatLng, type LatLngExpression, type PointExpression } from 'leaflet'
import { LMap, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref, type Ref } from 'vue'
import truncateFloat from '@/composibles/truncateFloat'
const BASE_COORDINATES: [number, number] = [55.23479, 23.92822]
const zoom = ref(7)
const center = ref(BASE_COORDINATES as PointExpression)
const tileProviders = ref(tileProvidersData)
const markers: Ref<[number, number][]> = ref([])
const selectedMarker = ref(0)

const onMapClick = (e: { latlng: LatLng }) => {
  const { lat, lng } = e.latlng
  const truncatedLat = truncateFloat(lat, 5)
  const truncatedLng = truncateFloat(lng, 5)
  markers.value[selectedMarker.value] = [truncatedLat, truncatedLng]
}

const onMarkerDragEnd = (e: { target: { getLatLng: () => LatLng } }) => {
  const { lat, lng } = e.target.getLatLng()
  const truncatedLat = truncateFloat(lat, 5)
  const truncatedLng = truncateFloat(lng, 5)
  markers.value[selectedMarker.value] = [truncatedLat, truncatedLng]
}
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

.sidebar {
  font-size: 2rem;
  padding: 1rem;
}

.label {
  font-weight: 700;
}

.coordinates {
  font-style: italic;
}
</style>
