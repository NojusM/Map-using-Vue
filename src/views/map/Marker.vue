<template>
  <l-marker
    v-for="(marker, index) in markerStore.markers"
    :key="index"
    :lat-lng="marker as LatLngExpression"
    :icon="index === markerStore.selectedMarker ? SELECT_MARKER : DEFAULT_ICON"
    draggable
    @dragend="markerStore.updateMarkerOnDrag($event, index)"
    @click="markerStore.setSelectedMarker(index)"
  ></l-marker>
</template>

<script setup lang="ts">
import L, { type LatLngExpression } from 'leaflet'
import { LMarker } from '@vue-leaflet/vue-leaflet'
import { useMarkersStore } from '@/stores/markers'
import CUSTOM_MARKER_ICON from '@/assets/custom-marker.png'
import DEFAULT_MARKER_ICON from '@/assets/marker-icon.png'

const SELECT_MARKER = L.icon({
  iconUrl: CUSTOM_MARKER_ICON,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
})
const DEFAULT_ICON = L.icon({
  iconUrl: DEFAULT_MARKER_ICON,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
})

const markerStore = useMarkersStore()
</script>
<style scoped></style>
