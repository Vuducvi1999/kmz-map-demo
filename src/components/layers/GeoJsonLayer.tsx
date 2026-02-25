import { useEffect, useMemo } from "react"
import { createGeojsonLayer } from "@/utils/leaflet"
import geojsonData from '@/data/test.json'

interface GeoJsonLayerProps {
  map: L.Map | null
  active: boolean
  L: typeof import("leaflet")
}

export function GeoJsonLayer({ map, active, L }: GeoJsonLayerProps) {
  const geojsonLayer = useMemo(() => {
    return createGeojsonLayer(L, geojsonData)
  }, [L])
  console.log('GeoJsonLayer rerender')
  useEffect(() => {
    if (!map) return

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
