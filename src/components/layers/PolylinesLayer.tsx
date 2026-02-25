/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createPolyline, PolylineData } from "@/utils/leaflet"
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"
import { useLeafletStore } from "@/hooks/useLeafletStore"

interface PolylinesLayerProps {
  map: L.Map | null
  polylineData: PolylineData[] | null | undefined
}

export function PolylinesLayer({ map, polylineData }: PolylinesLayerProps) {
  const L = useLeafletStore((state) => state.L)
  const polylines = useMemo(() => {
    if (!L || !polylineData) return null

    return polylineData.map((data) =>
      createPolyline(L, data, () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'polyline', data })
      })
    )
  }, [L, polylineData])

  useEffect(() => {
    if (!map || !polylines) return

    polylines.forEach((polyline) => {
      if (!map.hasLayer(polyline)) {
        polyline.addTo(map)
      }
    })

    return () => {
      polylines.forEach((polyline) => {
        if (map.hasLayer(polyline)) {
          polyline.remove()
        }
      })
    }
  }, [map, polylines])

  return null
}
