/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createMarker } from "@/utils/leaflet"
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"
import { useLeafletStore } from "@/hooks/useLeafletStore"
import * as L from 'leaflet'
import { useTrafficControl } from "@/hooks/useTrafficControl"

export function MarkersLayer() {
  const map = useLeafletStore((state) => state.map)
  const { markerData } = useTrafficControl()

  const markers = useMemo(() => {
    if (!L || !markerData) return null

    return markerData.map((data) => {
      const marker = createMarker(L, { data })
      marker.on('click', () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'marker', data })
      })
      return marker
    })
  }, [markerData])

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
