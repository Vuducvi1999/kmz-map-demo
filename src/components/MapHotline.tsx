// "use client"

// import * as L from 'leaflet'
// import { useEffect, useRef, useState } from "react";
// import Script from 'next/script';
// import { LocationMarker } from '@/app/utils/markers';
// import 'leaflet/dist/leaflet.css';
// import { interpolateLatLng } from '@/app/utils/helper';

// export default function Map({ interval }: { interval: number }) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<L.Map>(null)
//   const [loadedPlugin, setLoadedPlugin] = useState<boolean>(false)
//   const markerRef = useRef<L.Marker>(null)

//   const marker = LocationMarker({ lat: 10.787074, lng: 106.924825 }).bindPopup('rerendered', { autoClose: true })

//   useEffect(() => {
//     if (!mapRef.current) return

//     const map = L.map(mapRef.current, {
//       center: [10.787074, 106.924825],
//       zoom: 15,
//       preferCanvas: false
//     })

//     L.tileLayer('/OSM_tiles/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap with love</a>'
//     }).addTo(map);
//     mapInstance.current = map

//     const effect = async (map: L.Map) => {
//       // const res = await fetch('/2019-410 ha mp LANDUSE_BK.kmz')
//       // const arrayBuffer = await res.arrayBuffer();
//       // const geoJsonData = await extractKmztoGeojson(
//       //   arrayBuffer
//       // )
//       const geoJson = await fetch('/test.geojson')
//       const geoJsonData = await geoJson.json()

//       L.geoJSON(geoJsonData, {
//         style: () => ({
//           color: 'black',
//           weight: 0.5
//         })
//       }).addTo(map)
//     }

//     effect(map)

//     return () => {
//       map.remove()
//     }
//   }, [mapRef])

//   useEffect(() => {
//     if (!mapInstance.current || !window.L.hotline) return
//     const map = mapInstance.current

//     markerRef.current = marker.addTo(map)

//     window.L.hotline([
//       interpolateLatLng({ start: [10.791174, 106.925447], end: [10.791002, 106.925442] }).map<[number, number, number]>(i => [...i, 1])
//     ], {
//       min: 1, max: 3
//     }).addTo(map)

//     return () => {
//       marker.togglePopup()
//     }
//   }, [interval, loadedPlugin, marker])

//   return (
//     <>
//       <div
//         ref={mapRef}
//         className="w-full h-full"
//       />
//       <Script
//         src="/leaflet/leaflet.hotline.min.js"
//         strategy="afterInteractive" // Chạy sau khi trang được tải xong
//         onLoad={() => setLoadedPlugin(true)}
//       />
//     </>
//   );
// }
