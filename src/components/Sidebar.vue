<template>
  <div class="sidebar">
    <div class="marker-distance">
      <div class="label">Distance between</div>
      <select v-model="selectedMarkerIndexFrom">
        <option v-for="(marker, index) in markerStore.markers" :key="index" :value="index">
          Marker {{ index + 1 }}
        </option>
      </select>
      and
      <select v-model="selectedMarkerIndexTo">
        <option v-for="(marker, index) in markerStore.markers" :key="index" :value="index">
          Marker {{ index + 1 }}
        </option>
      </select>
      <div class="coordinates">
        {{ markerStore.getDistanceString(selectedMarkerIndexFrom, selectedMarkerIndexTo) }}
      </div>
    </div>
    <button class="btn add" @click="markerStore.addMarker">Add marker</button>
    <div v-for="(marker, index) in markerStore.markers" :key="index" class="marker-info">
      <p>
        <span class="label">Marker position: </span>
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
import { ref } from 'vue'

const markerStore = useMarkersStore()
const selectedMarkerIndexFrom = ref()
const selectedMarkerIndexTo = ref()
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
  margin-top: 2rem;
}
</style>
