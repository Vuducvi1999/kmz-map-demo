// "use client"

// import * as L from 'leaflet'
// import { useEffect, useRef, useState } from "react";
// import Script from 'next/script';
// import 'leaflet/dist/leaflet.css';
// import gsap from 'gsap';
// import { LocationMarker } from '@/data/leaflet';

// export default function Map({ interval }: { interval: number }) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<L.Map>(null)
//   const [loadedPlugin, setLoadedPlugin] = useState<boolean>(false)
//   const markerRef = useRef<L.Marker>(null)
//   const marker = LocationMarker({ lat: 10.787074, lng: 106.924825 })

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
//     markerRef.current = marker.addTo(mapInstance.current)

//     const test = gsap.from(markerRef.current.getLatLng(), {
//       lat: 10.791174,   // Vị trí lat mới
//       lng: 106.925447,     // Vị trí lng mới
//       onUpdate: () => {
//         if (markerRef.current) {
//           // Cập nhật vị trí của marker trong quá trình animation
//           markerRef.current.setLatLng(markerRef.current.getLatLng());
//         }
//       },
//       duration: 2,
//       ease: "power2.inOut"
//     });

//     return () => {
//       markerRef.current?.remove();
//     };
//   }, [marker])

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
