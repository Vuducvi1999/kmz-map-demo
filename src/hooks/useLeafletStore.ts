import { create } from 'zustand'
import { DeviceStatus, LeafletType, PolylineStatus } from '@/utils/leaflet'

interface LeafletState {
  L: LeafletType | null
  interval: number
  geojsonActive: boolean
  cctvStatus: DeviceStatus | null
  vdsStatus: DeviceStatus | null
  polylineStatus: PolylineStatus | null
  heatRange: [number, number]

  setL: (L: LeafletType) => void
  setInterval: (interval: number) => void
  setGeojsonActive: (active: boolean) => void
  setCctvStatus: (status: DeviceStatus | null) => void
  setVdsStatus: (status: DeviceStatus | null) => void
  setPolylineStatus: (status: PolylineStatus | null) => void
  setHeatRange: (range: [number, number]) => void
}

export const useLeafletStore = create<LeafletState>((set) => ({
  L: null,
  interval: 5,
  geojsonActive: true,
  cctvStatus: null,
  vdsStatus: null,
  polylineStatus: null,
  heatRange: [0, 100],

  setL: (L) => set({ L }),
  setInterval: (interval) => set({ interval }),
  setGeojsonActive: (geojsonActive) => set({ geojsonActive }),
  setCctvStatus: (cctvStatus) => set({ cctvStatus }),
  setVdsStatus: (vdsStatus) => set({ vdsStatus }),
  setPolylineStatus: (polylineStatus) => set({ polylineStatus }),
  setHeatRange: (heatRange) => set({ heatRange }),
}))
