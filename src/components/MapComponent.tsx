/* eslint-disable react-hooks/immutability */

"use client"

import { useEffect, useMemo, useRef, useState, } from "react"
import geojsonData from '@/data/test.json'
import 'leaflet/dist/leaflet.css'
import { bindInitMarker, createGeojsonLayer, createHeatLayer, createMarker, createPolyline } from '@/app/utils/leaflet';
import { initMap } from '@/app/utils/leaflet';
import { useLeaflet } from "./LeafletProvider";
import { useTrafficData } from "@/hooks/useTrafficData";


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
  } = useTrafficData({
    cctvStatus,
    heatRange,
    interval,
    polylineStatus,
    vdsStatus
  })
  const mapComponentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null)

  const markers = useMemo(() =>
    markerData && markerData.map((data) => createMarker(L, { data })), [L, markerData])

  const polylines = useMemo(() =>
    polylineData && polylineData.map((data) => createPolyline(window.L, data).bringToFront()), [polylineData])

  const heatLayer = useMemo(() =>
    heatData && createHeatLayer(window.L, heatData), [heatData])

  const geojsonLayer = useMemo(() => createGeojsonLayer(window.L, geojsonData), [])


  useEffect(() => {
    if (!mapComponentRef.current) return
    const map = initMap(L, mapComponentRef.current)
    map.addLayer(geojsonLayer)
    setMap(map)
    return () => { map.remove() }
  }, [mapComponentRef, L, geojsonLayer])

  useEffect(() => {
    if (!map) return
    if (heatLayer && markers && polylines) {
      map.addLayer(heatLayer)
      if (heatLayer._canvas) {
        heatLayer._canvas.style.pointerEvents = 'none'
      }

      markers.forEach(marker => marker.addTo(map))
      bindInitMarker(markers)
      polylines.forEach(polyline => map.addLayer(polyline))
    }

    // map.on('click', function (e) {
    //   const { lat, lng } = e.latlng
    //   L.popup()
    //     .setLatLng([lat, lng])
    //     .setContent(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
    //     .openOn(map)
    // })

    return () => {
      if (heatLayer && polylines && markers) {
        polylines.forEach(layer => (layer.remove()))
        heatLayer.remove()
        markers.forEach(layer => (layer.remove()))
      }
    }
  }, [map, markers, heatLayer, polylines])

  return (
    <>
      <div ref={mapComponentRef} className="w-full h-full" />
    </>
  );
}
