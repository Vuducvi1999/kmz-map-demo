/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createHeatLayer, HeatData } from "@/utils/leaflet"
import Script from "next/script"
import { useLeafletStore } from "@/hooks/useLeafletStore"

interface HeatLayerProps {
  map: L.Map | null
  heatData: HeatData[] | null | undefined
}

export function HeatLayerComponent({ map, heatData }: HeatLayerProps) {
  const L = useLeafletStore(store => store.L)

  const heatLayer = useMemo(() => {
    if (!window.L || !heatData) return null
    return createHeatLayer(window.L, heatData)
  }, [heatData])

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

  return (
    L && <Script
      src="/leaflet/leaflet.heat.min.js"
      strategy="afterInteractive"
    />
  )
}
