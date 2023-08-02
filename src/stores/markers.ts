import truncateFloat from '@/composibles/truncateFloat'
import type { LatLng, LatLngExpression } from 'leaflet'
import { defineStore } from 'pinia'

type Marker = [number, number]

const BASE_COORDINATES: Marker = [55.23479, 23.92822]

export const useMarkersStore = defineStore('markers', {
  state: () => ({
    markers: [] as Marker[],
    selectedMarker: 0,
    distanceIndexses: {
      from: undefined as number | undefined,
      to: undefined as number | undefined
    }
  }),
  actions: {
    addMarker() {
      this.markers.push(BASE_COORDINATES)
    },
    addMarkerOnMap(e: { latlng: LatLng }) {
      const { lat, lng } = e.latlng
      const truncatedLat = truncateFloat(lat, 5)
      const truncatedLng = truncateFloat(lng, 5)
      this.markers[this.selectedMarker] = [truncatedLat, truncatedLng]
    },
    updateMarkerOnDrag(e: { target: { getLatLng: () => LatLng } }) {
      const { lat, lng } = e.target.getLatLng()
      const truncatedLat = truncateFloat(lat, 5)
      const truncatedLng = truncateFloat(lng, 5)
      this.markers[this.selectedMarker] = [truncatedLat, truncatedLng]
    },
    removeMarker(index: number) {
      this.markers.splice(index, 1)
    },
    setSelectedMarker(selectedMarker: number) {
      this.selectedMarker = selectedMarker
    },

    getDistanceMarkers() {
      const fromIndex = this.distanceIndexses.from
      const toIndex = this.distanceIndexses.to
      if (
        fromIndex === undefined ||
        toIndex === undefined ||
        fromIndex < 0 ||
        fromIndex >= this.markers.length ||
        toIndex < 0 ||
        toIndex >= this.markers.length
      ) {
        return []
      }

      const distanceMarkers = [this.markers[fromIndex], this.markers[toIndex]]
      return distanceMarkers as LatLngExpression[]
    },

    getDistanceString() {
      const fromIndex = this.distanceIndexses.from
      const toIndex = this.distanceIndexses.to

      if (
        fromIndex === undefined ||
        toIndex === undefined ||
        fromIndex < 0 ||
        fromIndex >= this.markers.length ||
        toIndex < 0 ||
        toIndex >= this.markers.length ||
        this.markers.length < 2
      ) {
        return 0
      }

      const lat1 = toRadian(this.markers[fromIndex][0])
      const lon1 = toRadian(this.markers[fromIndex][1])
      const lat2 = toRadian(this.markers[toIndex][0])
      const lon2 = toRadian(this.markers[toIndex][1])

      const deltaLat = lat2 - lat1
      const deltaLon = lon2 - lon1
      const a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2)
      const c = 2 * Math.asin(Math.sqrt(a))
      const EARTH_RADIUS = 6371
      const distance = c * EARTH_RADIUS

      return distance > 1
        ? `${truncateFloat(distance, 2)} km`
        : `${truncateFloat(distance * 1000, 0)} m`
    }
  }
})

function toRadian(degree: number) {
  return (degree * Math.PI) / 180
}
