<template>
  <div class="sidebar">
    <div class="distance-wrapper">
      <div class="label title-label">Distance between</div>
      <div class="distance-input">
        <select
          v-model="markerStore.distanceIndexses.from"
          :disabled="markerStore.markers.length <= 1"
        >
          <option v-for="(marker, index) in markerStore.markers" :key="index" :value="index">
            Marker {{ index + 1 }}
          </option>
        </select>
        -
        <select
          v-model="markerStore.distanceIndexses.to"
          :disabled="markerStore.markers.length <= 1"
        >
          <option v-for="(marker, index) in markerStore.markers" :key="index" :value="index">
            Marker {{ index + 1 }}
          </option>
        </select>
        <div class="coordinates">= {{ markerStore.getDistanceString() }}</div>
      </div>
    </div>
    <div class="label title-label">Markers</div>
    <button class="btn add" @click="markerStore.addMarker">Add marker</button>
    <div
      v-for="(marker, index) in markerStore.markers"
      :key="index"
      :class="['marker-info', { active: index === markerStore.selectedMarker }]"
    >
      <p @click="markerStore.setSelectedMarker(index)">
        <span class="label">Marker {{ index + 1 }} - </span>
        <span class="coordinates">{{ marker[0] }}° N {{ marker[1] }}° E</span>
      </p>
      <button class="btn delete" @click="markerStore.removeMarker(index)">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMarkersStore } from '@/stores/markers'

const markerStore = useMarkersStore()
</script>

<style scoped>
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

.marker-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--primary-dark);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.marker-info.active {
  color: hsl(120, 54%, 50%);
}
.btn {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem;
  border: 1px solid var(--primary-dark);
  border-radius: 1rem;
  cursor: pointer;
  background-color: white;
  color: var(--primary);
}

.btn:hover {
  border-color: var(--primary-bright);
}

.btn.delete {
  position: relative;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  color: hsl(0, 90%, 40%);
  background-color: white;
}

.btn.delete:hover {
  color: white;
  background-color: hsl(0, 90%, 40%);
}

.btn.add {
  margin-bottom: 1rem;
}

.title-label {
  text-align: center;
  margin-top: 1rem;
}
.distance-wrapper {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--primary-dark);
  padding-bottom: 1rem;
}

.distance-input {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

select {
  appearance: none;
  background-color: transparent;
  border: 1px solid var(--primary-dark);
  border-radius: 1rem;
  padding: 0.5rem;
  min-width: 10rem;
  outline: none;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s ease;
}

select:hover {
  border-color: var(--primary-bright);
}

select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-dark);
}

select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
