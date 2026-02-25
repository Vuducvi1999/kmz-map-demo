import { useEffect, useMemo } from "react"
import { createGeojsonLayer } from "@/utils/leaflet"
import geojsonData from '@/data/test.json'
import { useLeafletStore } from "@/hooks/useLeafletStore"

interface GeoJsonLayerProps {
  map: L.Map | null
  active: boolean
}

export function GeoJsonLayer({ map, active }: GeoJsonLayerProps) {
  const L = useLeafletStore((state) => state.L)

  const geojsonLayer = useMemo(() => {
    if (!L) return null
    return createGeojsonLayer(window.L, geojsonData)
  }, [L])

  useEffect(() => {
    if (!map || !geojsonLayer) return

    if (active && !map.hasLayer(geojsonLayer)) {
      map.addLayer(geojsonLayer)
    }
    if (!active && map.hasLayer(geojsonLayer)) {
      map.removeLayer(geojsonLayer)
    }

    return () => {
      if (map.hasLayer(geojsonLayer)) {
        map.removeLayer(geojsonLayer)
      }
    }
  }, [map, active, geojsonLayer])

  return null
}
