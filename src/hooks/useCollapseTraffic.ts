
import { create } from "zustand"

interface Collapse {
  trafficControlCollapsed: boolean
  closeTrafficControl: () => void
  openTrafficControl: () => void
  trafficInfoCollapsed: boolean
  closeTrafficInfo: () => void
  openTrafficInfo: () => void
}

export const useCollapseTraffic = create<Collapse>((set) => ({
  trafficControlCollapsed: false,
  closeTrafficControl: () => set({ trafficControlCollapsed: false }),
  openTrafficControl: () => set({ trafficControlCollapsed: true }),
  trafficInfoCollapsed: false,
  closeTrafficInfo: () => set({ trafficInfoCollapsed: false }),
  openTrafficInfo: () => set({ trafficInfoCollapsed: true }),
}))
























