import { HeatData, MarkerData, PolylineData } from "@/utils/leaflet";

// export const cctvMarkers: ReturnType<typeof createMarker>[] = [
//  ...markerData.cctv
// ].map(([lat, lng]) => createMarker({ lat, lng, iconPath: cctvIconPath }))

// export const vdsMarkers: ReturnType<typeof createMarker>[] = [
//   ...markerData.vds
// ].map(([lat, lng]) => createMarker({ lat, lng, iconPath: vdsIconPath }))

export const markerData: MarkerData[] = [
  { type: 'cctv', location: [10.785651, 106.915019], status: 'active' },
  { type: 'cctv', location: [10.785124, 106.91577], status: 'error' },
  { type: 'cctv', location: [10.784534, 106.917036], status: 'inactive' },
  { type: 'cctv', location: [10.781182, 106.915727], status: 'active' },
  { type: 'cctv', location: [10.787063, 106.918924], status: 'active' },
  { type: 'cctv', location: [10.786747, 106.919718], status: 'active' },
  { type: 'cctv', location: [10.783248, 106.9171], status: 'active' },
  { type: 'cctv', location: [10.782679, 106.916842], status: 'active' },
  { type: 'cctv', location: [10.782004, 106.916564], status: 'active' },
  { type: 'cctv', location: [10.781098, 106.916134], status: 'active' },
  { type: 'cctv', location: [10.785588, 106.923194], status: 'active' },
  { type: 'cctv', location: [10.785103, 106.923108], status: 'active' },
  { type: 'cctv', location: [10.783859, 106.923022], status: 'active' },
  { type: 'vds', location: [10.782342, 106.922904], status: 'active' },
  { type: 'vds', location: [10.782321, 106.92328], status: 'inactive' },
  { type: 'vds', location: [10.780171, 106.922625], status: 'error' },
  { type: 'vds', location: [10.780149, 106.922979], status: 'active' },
]


export const heatData: HeatData[] = [
  { location: [10.784365, 106.917717], intensity: 40 },
  { location: [10.784236, 106.918130], intensity: 40 },
  { location: [10.783996, 106.918409], intensity: 60 },
  { location: [10.784039, 106.918961], intensity: 65 },
  { location: [10.783801, 106.919326], intensity: 50 },
  { location: [10.783693, 106.919771], intensity: 55 },
  { location: [10.783591, 106.920230], intensity: 50 },
  { location: [10.783427, 106.920796], intensity: 40 },
  { location: [10.783306, 106.921316], intensity: 30 },
  { location: [10.783245, 106.921697], intensity: 30 },
  { location: [10.783164, 106.922124], intensity: 30 },
  { location: [10.783135, 106.922472], intensity: 20 },
]

export const polylineData: PolylineData[] = [
  { path: [[10.789709, 106.919739], [10.787401, 106.918709]], status: 1 },
  { path: [[10.787401, 106.918709], [10.784953, 106.917615]], status: 1 },
  {
    path: [
      [10.784953, 106.917615],
      [10.784386, 106.918892],
      [10.783954, 106.920329],
      [10.783659, 106.921778],
      [10.783512, 106.923645],
    ], status: 1
  },
  {
    path: [
      [10.784953, 106.917615],
      [10.784560, 106.917449],
    ], status: 2
  },
  {
    path: [
      [10.784953, 106.917615],
      [10.785609, 106.916167],
      [10.786304, 106.914965],
      [10.787242, 106.913726],
    ], status: 2
  },
  {
    path: [
      [10.784560, 106.917449],
      [10.779844, 106.915416],
    ], status: 3
  },
  {
    path: [
      [10.786863, 106.913495],
      [10.785999, 106.914675],
      [10.785208, 106.916027],
      [10.784560, 106.917449],
    ], status: 2
  },
  {
    path: [
      [10.784560, 106.917449],
      [10.783965, 106.918902],
      [10.783248, 106.921928],
      [10.783069, 106.923655],
    ], status: 2
  }
]

// export const polylineData: PolylineData[][] = [
//   [
//     {
//       path: [
//         [10.789709, 106.919739],
//         [10.784953, 106.917615],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.784953, 106.917615],
//         [10.784563, 106.917441],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.784563, 106.917441],
//         [10.779875, 106.915389]
//       ],
//       status: 1
//     },
//   ],
//   [
//     {
//       path: [
//         [10.787237, 106.913715],
//         [10.786853, 106.914219],
//         [10.786484, 106.914756],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.786484, 106.914756],
//         [10.786052, 106.915437],
//         [10.785725, 106.915979],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.785725, 106.915979],
//         [10.785382, 106.916612],
//         [10.785011, 106.917433],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.785011, 106.917433],
//         [10.784805, 106.917972],
//         [10.784652, 106.918347],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.784652, 106.918347],
//         [10.784457, 106.918835],
//         [10.784170, 106.919739],
//         [10.783978, 106.920442],
//         [10.783696, 106.921729],
//         [10.783556, 106.923186],
//       ],
//       status: 1
//     },
//   ],
//   [
//     {
//       path: [
//         [10.786908, 106.913484],
//         [10.786402, 106.914166],
//         [10.786146, 106.914536],
//         [10.785820, 106.915032],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.785820, 106.915032],
//         [10.785485, 106.915598],
//         [10.785111, 106.916274],
//         [10.784824, 106.916864],
//         [10.784626, 106.917301],
//       ],
//       status: 1
//     },
//     {
//       path: [
//         [10.784626, 106.917301],
//         [10.784123, 106.918570],
//         [10.783957, 106.919047],
//         [10.783704, 106.919922],
//       ],
//       status: 1
//     }, {
//       path: [
//         [10.783704, 106.919922],
//         [10.783454, 106.921000],
//         [10.783288, 106.921928],
//         [10.783148, 106.923148],
//       ],
//       status: 1
//     },
//   ],

// ]
