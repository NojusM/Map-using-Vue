<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="marker-info">
        <p>
          <span class="label">Marker position: </span>
          <span v-if="marker.length !== 0" class="coordinates"
            >{{ marker[0] }}° N {{ marker[1] }}° E</span
          >
          <span v-else class="coordinates">Place a Marker!</span>
        </p>
      </div>
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
        <l-marker v-if="marker.length != 0" :lat-lng="(marker as LatLngExpression)" draggable @dragend="onMarkerDragEnd"></l-marker>
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
const zoom = ref(7)
const center = ref([55.23479, 23.92822] as PointExpression)
const marker: Ref<[number, number] | []> = ref([])
const tileProviders = ref(tileProvidersData)

const onMapClick = (e: { latlng: LatLng }) => {
  const { lat, lng } = e.latlng
  const truncatedLat = truncateFloat(lat, 5)
  const truncatedLng = truncateFloat(lng, 5)
  marker.value = [truncatedLat, truncatedLng]
}

const onMarkerDragEnd = (e: { target: { getLatLng: () => LatLng } }) => {
  const { lat, lng } = e.target.getLatLng()
  const truncatedLat = truncateFloat(lat, 5)
  const truncatedLng = truncateFloat(lng, 5)
  marker.value = [truncatedLat, truncatedLng]
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
