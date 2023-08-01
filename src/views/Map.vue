<template>
  <div class="wrapper">
    <div class="sidebar"></div>
    <div class="map">
      <l-map ref="map" v-model:zoom="zoom" v-model:center="center">
        <l-control-layers position="bottomright"></l-control-layers>
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L, { type PointExpression } from 'leaflet'
import { LMap, LTileLayer, LControlLayers } from '@vue-leaflet/vue-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers
  },
  data() {
    return {
      zoom: 7,
      center: [54.6872, 25.2797] as PointExpression,
      tileProviders: [
        {
          name: 'OpenStreetMap',
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        {
          name: 'Stadia Maps',
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
        },
        {
          name: 'CartoDB_Voyager',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 5rem;
}

.map {
  height: 80vh;
  width: 100%;
  padding-right: 10rem;
}

.leaflet-container {
  font-size: 1.5rem;
}
</style>
