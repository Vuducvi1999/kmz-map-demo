
import type { FeatureCollection } from 'geojson'
import { Hotline } from 'leaflet'
import gsap from 'gsap';

export type DeviceStatus = 'active' | 'inactive' | 'error'
export type PolylineStatus = 1 | 2 | 3  // thông thoáng, ùn tắc, nghiêm trọng
type MarkerType = 'cctv' | 'vds'
export type LeafletType = typeof import('leaflet')

export interface MarkerData {
  type: MarkerType
  location: [number, number]
  status: DeviceStatus
}
export interface HeatData {
  location: [number, number]
  intensity: number   // mật độ phương tiện (0-100) 
}
export interface PolylineData {
  path: [number, number][]
  status: PolylineStatus
}

interface MarkerParams {
  data: MarkerData
  w?: number
  h?: number
}

export const BASE_HEAT_RADIUS = 15
export const BASE_MAP_ZOOM = 15
export const BASE_HEAT_BLUR = 8

export const createMarker = (
  L: LeafletType,
  { data: { location, status, type }, h = 30, w = 30 }: MarkerParams
) => {
  const iconUrl = `/markers/${type}-${status}.svg`
  return L.marker(location, {
    icon: L.icon({
      iconUrl,
      iconSize: [w, h],
      iconAnchor: [w / 2, h],
    })
  })
}

export const bindInitMarker = (markers: L.Marker[]) => {
  const tl = gsap.timeline({})

  markers.forEach((marker,) => {
    tl.from(marker.getElement()!, {
      duration: 1,
      scale: 0,
      opacity: 0,
      // lat: marker.getLatLng().lat + (0.005),
      // lng: marker.getLatLng().lng,
      // onUpdate: () => {
      //   marker.setLatLng(marker.getLatLng());
      // },
    }, "-=90%")
  })
}

/** 
  ý tưởng cần tìm cách sao cho hiển thị heat dựa trên cụm lưu lượng 
  đòi hỏi BE phải tự detect được khu vực đang ùn tắc có bán kính bao nhiêu 
  => không khả thi, nhiều layer sẽ làm map chậm đi 
*/
export const createHeatLayer = (
  L: LeafletType,
  data: HeatData[]
) => {
  const layer = L.heatLayer(
    data.map(({ intensity, location }) => ([...location, intensity])), {
    radius: BASE_HEAT_RADIUS,
    blur: BASE_HEAT_BLUR,
    maxZoom: 13,
    max: 100,
    pane: 'heatPane'
  })

  // const heatLayerCanvas = (heatLayer as any)._canvas as HTMLCanvasElement;
  // heatLayerCanvas.style.pointerEvents = 'none';

  return layer
}

// chỉ có 3 thể loại mật độ: thông thoáng, ùn tắc, nghiêm trọng 
// khi click thì viền ngoài đoạn đường sẽ được in đậm 
export const createPolyline = (
  L: LeafletType,
  { path, status }: PolylineData,
  onClick: () => void
) => {
  return L.hotline(
    path.map((location) => [...location, status]), {
    min: 1, max: 3, pane: 'polylinePane', smoothFactor: 0,
    lineCap: 'butt',
    lineJoin: 'miter'
  }).on('click',
    function (this: Hotline, e: L.LeafletMouseEvent) {
      // click polyline chứ không click map
      L.DomEvent.stopPropagation(e)

      // Reset các polyline khác
      this._map.eachLayer((layer: L.Layer) => {
        if (!(layer instanceof L.Hotline)) return
        if (layer.options.outlineWidth === 3)
          layer.setStyle({ outlineWidth: 1 })
      })

      // Highlight polyline được click
      this.setStyle({
        outlineWidth: (this.options.outlineWidth || 1) + 2
      })

      onClick()
    })
}

export const createGeojsonLayer = (L: LeafletType, geojson: unknown) =>
  L.geoJSON(geojson as FeatureCollection, {
    style: () => ({
      color: 'black',
      weight: 0.5
    })
  })

export const initMap = (L: LeafletType, component: HTMLDivElement) => {
  const map = L.map(component, {
    center: [10.787074, 106.924825],
    zoom: BASE_MAP_ZOOM,
    preferCanvas: true
  })

  initTileLayer(L).addTo(map)

  map.on('click', function (this: L.Map) {
    this.eachLayer((layer: L.Layer) => {
      if (layer instanceof window.L.Hotline)
        layer.setStyle({ outlineWidth: 1 })
    })
  })

  map.on('zoom', () => {
    const currentZoom = map.getZoom()
    const scale = Math.pow(2, currentZoom - BASE_MAP_ZOOM)
    const zoomRadius = BASE_HEAT_RADIUS * scale
    const zoomBlur = BASE_HEAT_BLUR * scale
    if (zoomRadius > 119) return

    map.eachLayer((layer: L.Layer) => {
      if (!(layer instanceof window.L.HeatLayer)) return
      layer.setOptions({
        radius: zoomRadius,
        blur: zoomBlur,
      })
    })
  })


  return map
}

export const initTileLayer = (L: LeafletType) => L.tileLayer(
  // '/OSM_tiles/{z}/{x}/{y}.png', {
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'ITD with <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

