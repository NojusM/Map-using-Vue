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
    <div v-for="(marker, index) in markerStore.markers" :key="index" class="marker-info">
      <p>
        <span class="label">Marker {{ index + 1 }} - </span>
        <span class="coordinates">{{ marker[0] }}° N {{ marker[1] }}° E</span>
      </p>
      <div class="buttons">
        <button
          :class="['btn select', { active: index === markerStore.selectedMarker }]"
          @click="markerStore.setSelectedMarker(index)"
        >
          Select marker
        </button>
        <button class="btn delete" @click="markerStore.removeMarker(index)">Delete marker</button>
      </div>
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

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.btn {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem;
  border: 2px solid black;
  border-radius: 1rem;
  cursor: pointer;
  background-color: var(--primary-dark);
  color: white;
}

.btn:hover {
  background-color: var(--primary);
}

.btn.select.active {
  background-color: hsl(120, 47%, 55%);
  color: black;
}

.btn.delete {
  background-color: hsl(0, 90%, 20%);
}

.btn.delete:hover {
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
