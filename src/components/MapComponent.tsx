/* eslint-disable react-hooks/immutability */

"use client"

import { useEffect, useRef, useState } from "react"
import '@/app/globals.css'
import { initMap } from '@/utils/leaflet';
import { useLeafletStore } from "@/hooks/useLeafletStore";
import { useTrafficControl } from "@/hooks/useTrafficControl";
import { MarkersLayer } from "./layers/MarkersLayer";
import { PolylinesLayer } from "./layers/PolylinesLayer";
import { GeoJsonLayer } from "./layers/GeoJsonLayer";
import { HeatLayerComponent } from "./layers/HeatLayer";
import * as L from 'leaflet'

export default function Map() {
  const setL = useLeafletStore((state) => state.setL)
  const interval = useLeafletStore((state) => state.interval)
  const geojsonActive = useLeafletStore((state) => state.geojsonActive)
  const cctvStatus = useLeafletStore((state) => state.cctvStatus)
  const vdsStatus = useLeafletStore((state) => state.vdsStatus)
  const polylineStatus = useLeafletStore((state) => state.polylineStatus)
  const heatRange = useLeafletStore((state) => state.heatRange)

  const {
    markerData,
    polylineData,
    heatData,
  } = useTrafficControl({
    cctvStatus,
    heatRange,
    interval,
    polylineStatus,
    vdsStatus
  })

  const mapComponentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    setL(L)
    if (!mapComponentRef.current) return
    const map = initMap(L, mapComponentRef.current)
    setMap(map)

    return () => {
      map.remove()
    }
  }, [setL])

  return (
    <div ref={mapComponentRef} className="w-full h-full ">
      <MarkersLayer map={map} markerData={markerData} />
      <PolylinesLayer map={map} polylineData={polylineData} />
      <HeatLayerComponent map={map} heatData={heatData} />
      <GeoJsonLayer map={map} active={geojsonActive} />
    </div>
  );
}
