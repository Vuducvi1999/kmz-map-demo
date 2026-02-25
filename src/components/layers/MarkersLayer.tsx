import { useEffect, useMemo } from "react"
import { createMarker, MarkerData } from "@/utils/leaflet"
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"

interface MarkersLayerProps {
  map: L.Map | null
  markerData: MarkerData[] | null | undefined
  L: typeof import("leaflet")
}

export function MarkersLayer({ map, markerData, L }: MarkersLayerProps) {
  const markers = useMemo(() => {
    if (!markerData) return null

    return markerData.map((data) => {
      const marker = createMarker(L, { data })
      marker.on('click', () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'marker', data })
      })
      return marker
    })
  }, [L, markerData])

  console.log('MarkersLayer rerender')

  useEffect(() => {
    if (!map || !markers) return

    markers.forEach((marker) => {
      if (!map.hasLayer(marker)) {
        marker.addTo(map)
      }
    })

    return () => {
      markers.forEach((marker) => {
        if (map.hasLayer(marker)) {
          marker.remove()
        }
      })
    }
  }, [map, markers])

  return null
}
