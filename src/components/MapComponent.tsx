/* eslint-disable react-hooks/immutability */

"use client"

import { useEffect, useMemo, useRef, useState, } from "react"
import geojsonData from '@/data/test.json'
import '@/app/globals.css'
import { bindInitMarker, createGeojsonLayer, createHeatLayer, createMarker, createPolyline } from '@/utils/leaflet';
import { initMap } from '@/utils/leaflet';
import { useLeaflet } from "./LeafletProvider";
import { useTrafficControl } from "@/hooks/useTrafficControl";
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic";
import { useTrafficInfo } from "@/hooks/useTrafficInfo";


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


  const mapComponentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null)

  const markers = useMemo(() =>
    markerData && markerData.map((data) => {
      const marker = createMarker(L, { data })
      marker.on('click', () => {
        useCollapseTraffic.getState().closeTrafficControl()
        useCollapseTraffic.getState().openTrafficInfo()
        useTrafficInfo.getState().setSelectedObject({ type: 'marker', data })
      })
      return marker
    }), [L, markerData])

  const polylines = useMemo(() =>
    polylineData && polylineData.map((data) => createPolyline(window.L, data, () => {
      useCollapseTraffic.getState().closeTrafficControl()
      useCollapseTraffic.getState().openTrafficInfo()
      useTrafficInfo.getState().setSelectedObject({ type: 'polyline', data })
    })), [polylineData])

  const heatLayer = useMemo(() =>
    heatData && createHeatLayer(window.L, heatData), [heatData])

  const geojsonLayer = useMemo(() => createGeojsonLayer(window.L, geojsonData), [])

  useEffect(() => {
    if (!mapComponentRef.current) return
    const map = initMap(L, mapComponentRef.current)

    setMap(map)
    return () => { map.remove() }
  }, [mapComponentRef, L])

  useEffect(() => {
    if (!map) return
    if (geojsonActive) map.addLayer(geojsonLayer)
    if (!geojsonActive) map.removeLayer(geojsonLayer)
  }, [map, geojsonActive, geojsonLayer])

  useEffect(() => {
    if (!map) return
    if (heatLayer && markers && polylines) {
      map.addLayer(heatLayer)
      if (heatLayer._canvas) {
        heatLayer._canvas.style.pointerEvents = 'none'
      }

      markers.forEach(marker => marker.addTo(map))
      // bindInitMarker(markers)
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
  }, [map, markers, heatLayer, polylines,])

  return (
    <div ref={mapComponentRef} className="w-full h-full " />
  );
}
