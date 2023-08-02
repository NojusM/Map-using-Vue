<template>
  <l-polyline :lat-lngs="markerStore.getDistanceMarkers()"></l-polyline>
</template>

<script setup lang="ts">
import { useMarkersStore } from '@/stores/markers'
import { LPolyline } from '@vue-leaflet/vue-leaflet'
const markerStore = useMarkersStore()
</script>

<style scoped></style>
