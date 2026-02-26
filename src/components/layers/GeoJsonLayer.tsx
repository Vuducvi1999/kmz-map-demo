import { useEffect, useMemo } from "react"
import { createGeojsonLayer } from "@/utils/leaflet"
import geojsonData from '@/data/test.json'
import { useLeafletStore } from "@/hooks/useLeafletStore"
import * as L from 'leaflet'

export function GeoJsonLayer() {
  const map = useLeafletStore((state) => state.map)
  const active = useLeafletStore(state => state.geojsonActive)

  const geojsonLayer = useMemo(() => {
    if (!L) return null
    return createGeojsonLayer(L, geojsonData)
  }, [])

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
