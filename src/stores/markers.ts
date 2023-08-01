import truncateFloat from '@/composibles/truncateFloat'
import type { LatLng } from 'leaflet'
import {defineStore} from 'pinia'

type Marker = [number, number]

const BASE_COORDINATES: Marker = [55.23479, 23.92822]

export const useMarkersStore = defineStore("markers", {
state: () => ({
    markers: [] as Marker[],
    selectedMarker: 0,
}),
actions: {
    addMarker() {
        this.markers.push(BASE_COORDINATES)
    },
    addMarkerOnMap(e: { latlng: LatLng }, selectedMarker: number) {
                const { lat, lng } = e.latlng
        const truncatedLat = truncateFloat(lat, 5)
        const truncatedLng = truncateFloat(lng, 5)
        this.markers[selectedMarker] = [truncatedLat, truncatedLng]
    },
    addMarkerOnDrag(e: { target: { getLatLng: () => LatLng } }, selectedMarker: number) {
        const { lat, lng } = e.target.getLatLng()
        const truncatedLat = truncateFloat(lat, 5)
        const truncatedLng = truncateFloat(lng, 5)
        this.markers[selectedMarker] = [truncatedLat, truncatedLng]
    },
    setSelectedMarker(selectedMarker: number) {
        this.selectedMarker = selectedMarker
    }
}
})