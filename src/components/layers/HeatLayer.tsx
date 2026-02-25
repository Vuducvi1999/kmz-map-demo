/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createHeatLayer, HeatData } from "@/utils/leaflet"

interface HeatLayerProps {
  map: L.Map | null
  heatData: HeatData[] | null | undefined
  L: typeof import("leaflet")
}

export function HeatLayerComponent({ map, heatData, L }: HeatLayerProps) {
  const heatLayer = useMemo(() => {
    if (!heatData) return null
    return createHeatLayer(L, heatData)
  }, [L, heatData])

  useEffect(() => {
    if (!map || !heatLayer) return

    if (!map.hasLayer(heatLayer)) {
      heatLayer.addTo(map)
      if (heatLayer._canvas) {
        heatLayer._canvas.style.pointerEvents = 'none'
      }
    }

    return () => {
      if (map.hasLayer(heatLayer)) {
        heatLayer.remove()
      }
    }
  }, [map, heatLayer])

  return null
}
