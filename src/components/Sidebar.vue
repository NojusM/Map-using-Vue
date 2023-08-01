<template>
  <div class="sidebar">
    <div v-for="(marker, index) in props.markers.value" :key="index" class="marker-info">
      <p>
        <span class="label">Marker position: </span>
        <span class="coordinates">{{ marker[0] }}° N {{ marker[1] }}° E</span>
      </p>
      <div class="buttons">
        <button
          :class="['btn select', { active: index === selectedMarker.value }]"
          @click="selectedMarker = index"
        >
          Select marker
        </button>
        <button class="btn delete" @click="markers.splice(index, 1)">Delete marker</button>
      </div>
    </div>
    <button class="btn add" @click="markers.push(BASE_COORDINATES)">Add marker</button>
  </div>
</template>

<script setup lang="ts"></script>

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
