import { MarkerData, PolylineData } from "@/utils/leaflet";
import { create } from "zustand";

type SelectedObject = {
  type: 'marker'
  data: MarkerData
} | {
  type: 'polyline'
  data: PolylineData
}

interface TrafficControl {
  selectedObject: SelectedObject | null
  setSelectedObject: (obj: SelectedObject | null) => void
}

export const useTrafficInfo = create<TrafficControl>((set, get) => ({
  selectedObject: null,
  setSelectedObject: (obj) => get().selectedObject !== obj && set({ selectedObject: obj })
}))


