/* eslint-disable react-hooks/immutability */

"use client"

import { useEffect, useRef, useState } from "react"
import '@/app/globals.css'
import { initMap } from '@/utils/leaflet';
import { useLeaflet } from "./LeafletProvider";
import { useTrafficControl } from "@/hooks/useTrafficControl";
import { MarkersLayer } from "./layers/MarkersLayer";
import { PolylinesLayer } from "./layers/PolylinesLayer";
import { HeatLayerComponent } from "./layers/HeatLayer";
import { GeoJsonLayer } from "./layers/GeoJsonLayer";


export default function Map() {
  const {
    L,
    interval: { value: interval },
    geojson: { active: geojsonActive },
    cctv: { status: cctvStatus },
    heat: { range: heatRange },
    polyline: { status: polylineStatus },
    vds: { status: vdsStatus },
  } = useLeaflet()

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


  console.log('bi rerender')

  const mapComponentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    if (!mapComponentRef.current) return
    const map = initMap(L, mapComponentRef.current)
    setMap(map)

    return () => {

      map.remove()
    }
  }, [L])

  return (
    <div ref={mapComponentRef} className="w-full h-full ">
      <MarkersLayer map={map} markerData={markerData} L={L} />
      <PolylinesLayer map={map} polylineData={polylineData} L={L} />
      <HeatLayerComponent map={map} heatData={heatData} L={window.L} />
      <GeoJsonLayer map={map} active={geojsonActive} L={L} />
    </div>
  );
}
