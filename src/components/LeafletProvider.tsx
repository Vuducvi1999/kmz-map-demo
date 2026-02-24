'use client'

import { DeviceStatus, LeafletType, PolylineStatus } from "@/utils/leaflet";
import Script from "next/script";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

interface LContext {
  L: LeafletType
  interval: {
    value: number,
    setInterval: Dispatch<SetStateAction<number>>
  }
  geojson: {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
  }
  cctv: {
    status: DeviceStatus | null
    setStatus: Dispatch<SetStateAction<DeviceStatus | null>>
  }
  vds: {
    status: DeviceStatus | null
    setStatus: Dispatch<SetStateAction<DeviceStatus | null>>
  }
  heat: {
    range: [number, number]
    setHeatRange: Dispatch<SetStateAction<[number, number]>>
  }
  polyline: {
    status: PolylineStatus | null
    setStatus: Dispatch<SetStateAction<PolylineStatus | null>>
  }
}

const LeafletContext = createContext<LContext | null>(null)
export const useLeaflet = () => useContext(LeafletContext)!

export const LeafletProvider = ({ children }: { children: ReactNode }) => {
  const [L, setL] = useState<LeafletType | null>(null)
  const [interval, setInterval] = useState<number>(5)
  const [geojsonActive, setGeoJsonActive] = useState<boolean>(true)
  const [cctvStatus, setCctvStatus] = useState<DeviceStatus | null>(null)
  const [vdsStatus, setVdsStatus] = useState<DeviceStatus | null>(null)
  const [polylineStatus, setPolylineStatus] = useState<PolylineStatus | null>(null)
  const [heatRange, setHeatRange] = useState<[number, number]>([0, 100])

  useEffect(() => {
    import('leaflet').then((L) => setL(L))
  }, [])

  return L && <
    LeafletContext.Provider value={{
      L,
      interval: { value: interval, setInterval },
      geojson: { active: geojsonActive, setActive: setGeoJsonActive },
      heat: { range: heatRange, setHeatRange },
      cctv: { status: cctvStatus, setStatus: setCctvStatus },
      vds: { status: vdsStatus, setStatus: setVdsStatus },
      polyline: { status: polylineStatus, setStatus: setPolylineStatus }
    }}
  >
    {children}
    <Script
      src="/leaflet/leaflet.hotline.min.js"
      strategy="afterInteractive"
    />
    <Script
      src="/leaflet/leaflet.heat.min.js"
      strategy="afterInteractive"
    />
  </LeafletContext.Provider>

}