/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo } from "react"
import { createPolyline } from "@/utils/leaflet"
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"
import { useLeafletStore } from "@/hooks/useLeafletStore"
import * as L from 'leaflet'
import { useTrafficControl } from "@/hooks/useTrafficControl"


export function PolylinesLayer() {
  const map = useLeafletStore((state) => state.map)
  const { polylineData } = useTrafficControl()

  const polylines = useMemo(() => {
    if (!L || !polylineData) return null

    return polylineData.map((data) =>
      createPolyline(L, data, () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'polyline', data })
      })
    )
  }, [polylineData])

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
