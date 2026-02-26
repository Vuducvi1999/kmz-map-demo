import { create } from 'zustand'
import { DeviceStatus, PolylineStatus } from '@/utils/leaflet'

interface LeafletState {
  map: L.Map | null
  interval: number
  geojsonActive: boolean
  cctvStatus: DeviceStatus | null
  vdsStatus: DeviceStatus | null
  polylineStatus: PolylineStatus | null
  heatRange: [number, number]

  setMap: (map: L.Map | null) => void
  setInterval: (interval: number) => void
  setGeojsonActive: (active: boolean) => void
  setCctvStatus: (status: DeviceStatus | null) => void
  setVdsStatus: (status: DeviceStatus | null) => void
  setPolylineStatus: (status: PolylineStatus | null) => void
  setHeatRange: (range: [number, number]) => void
}

export const useLeafletStore = create<LeafletState>((set) => ({
  map: null,
  interval: 5,
  geojsonActive: true,
  cctvStatus: null,
  vdsStatus: null,
  polylineStatus: null,
  heatRange: [0, 100],

  setMap: (map) => set({ map }),
  setInterval: (interval) => set({ interval }),
  setGeojsonActive: (geojsonActive) => set({ geojsonActive }),
  setCctvStatus: (cctvStatus) => set({ cctvStatus }),
  setVdsStatus: (vdsStatus) => set({ vdsStatus }),
  setPolylineStatus: (polylineStatus) => set({ polylineStatus }),
  setHeatRange: (heatRange) => set({ heatRange }),
}))
