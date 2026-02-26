/* eslint-disable react-hooks/immutability */

"use client"

import { useEffect, useRef } from "react"
import '@/app/globals.css'
import { initMap } from '@/utils/leaflet';
import { useLeafletStore } from "@/hooks/useLeafletStore";
import { MarkersLayer } from "./layers/MarkersLayer";
import { PolylinesLayer } from "./layers/PolylinesLayer";
import { GeoJsonLayer } from "./layers/GeoJsonLayer";
import { HeatLayer } from "./layers/HeatLayer";
import * as L from 'leaflet'

export default function Map() {
  const setMap = useLeafletStore((state) => state.setMap)
  const mapComponentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapComponentRef.current) return
    const map = initMap(L, mapComponentRef.current)
    setMap(map)

    return () => {
      map.remove()
    }
  }, [setMap])

  return (
    <div ref={mapComponentRef} className="w-full h-full ">
      <MarkersLayer />
      <PolylinesLayer />
      <HeatLayer />
      <GeoJsonLayer />
    </div>
  );
}
