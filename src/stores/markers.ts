import truncateFloat from '@/composibles/truncateFloat'
import type { LatLng, LatLngExpression, PointExpression } from 'leaflet'
import { defineStore } from 'pinia'

type Marker = [number, number]

export const useMarkersStore = defineStore('markers', {
  state: () => ({
    map: undefined as L.Map | undefined,
    geoLocationGot: false,
    zoom: 2,
    mapCenter: [0, 0] as PointExpression,
    markers: [] as Marker[],
    selectedMarker: 0,
    distanceIndexses: {
      from: undefined as number | undefined,
      to: undefined as number | undefined
    }
  }),
  actions: {
    addMarker() {
      const center = this.mapCenter as LatLngExpression
      let lat: number
      let lng: number
      if (Array.isArray(center)) {
        ;[lat, lng] = center
      } else {
        lat = center.lat
        lng = center.lng
      }
      const truncatedLat = truncateFloat(lat, 5)
      const truncatedLng = truncateFloat(lng, 5)

      this.markers.push([truncatedLat, truncatedLng])
    },
    addMarkerOnMap(e: { latlng: LatLng }) {
      const { lat, lng } = e.latlng
      const truncatedLat = truncateFloat(lat, 5)
      const truncatedLng = truncateFloat(lng, 5)
      this.markers[this.selectedMarker] = [truncatedLat, truncatedLng]
    },
    updateMarkerOnDrag(e: { target: { getLatLng: () => LatLng } }, index: number) {
      const { lat, lng } = e.target.getLatLng()
      const truncatedLat = truncateFloat(lat, 5)
      const truncatedLng = truncateFloat(lng, 5)
      this.markers[index] = [truncatedLat, truncatedLng]
    },
    removeMarker(index: number) {
      const distanceIndexes = this.distanceIndexses
      this.markers.splice(index, 1)

      // Update distance indexes to undefinied if they are removed or -1 if before removed
      if (distanceIndexes.from !== undefined && distanceIndexes.from >= index) {
        distanceIndexes.from = distanceIndexes.from === index ? undefined : distanceIndexes.from - 1
      }
      if (distanceIndexes.to !== undefined && distanceIndexes.to >= index) {
        distanceIndexes.to = distanceIndexes.to === index ? undefined : distanceIndexes.to - 1
      }
    },
    setSelectedMarker(selectedMarker: number) {
      this.selectedMarker = selectedMarker
    },

    zoomToMarker(index: number) {
      if (!this.map) return
      this.map.panTo(this.markers[index])
    },

    zoomToDistance() {
      const distIndex = this.distanceIndexses
      const markers = this.markers
      if (
        !this.map ||
        distIndex.from === undefined ||
        distIndex.to === undefined ||
        markers.length < 2
      )
        return

      this.map.fitBounds([markers[distIndex.from], markers[distIndex.to]])
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
