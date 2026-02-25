/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createMarker, MarkerData } from "@/utils/leaflet"
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"
import { useLeafletStore } from "@/hooks/useLeafletStore"

interface MarkersLayerProps {
  map: L.Map | null
  markerData: MarkerData[] | null | undefined
}

export function MarkersLayer({ map, markerData }: MarkersLayerProps) {
  const L = useLeafletStore((state) => state.L)

  const markers = useMemo(() => {
    if (!L || !markerData) return null

    return markerData.map((data) => {
      const marker = createMarker(window.L, { data })
      marker.on('click', () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'marker', data })
      })
      return marker
    })
  }, [L, markerData])

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
