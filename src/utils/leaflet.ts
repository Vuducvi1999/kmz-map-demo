
import type { FeatureCollection } from 'geojson'
import type { HeatLayer, Hotline } from 'leaflet'
import gsap from 'gsap';
import { convertPolylineStatus } from './helper';

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

export const BASE_HEAT_RADIUS = 10
export const BASE_MAP_ZOOM = 15
export const BASE_HEAT_BLUR = 8
export const BASE_ICON_WIDTH = 10
export const BASE_ICON_HEIGH = 10
export const BASE_POLYLINE_WEIGHT = 5

export const createMarker = (
  L: LeafletType,
  { data: { location, status, type }, h = BASE_ICON_WIDTH, w = BASE_ICON_HEIGH }: MarkerParams
) => {
  const iconUrl = `/markers/${type}-${status}.svg`
  const layer = L.marker(location, {
    icon: L.icon({
      iconUrl,
      iconSize: [w, h],
      iconAnchor: [w / 2, h]
    }),
  })

  layer.on('add', function (this: L.Marker) {
    scaleMarkerLayer(L)(this._map, this)
  })

  return layer
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
    minOpacity: 0.0,
    pane: 'heatPane',
  })

  layer.on('add', function (this: HeatLayer) {
    scaleHeatLayer(this._map, this)
  })

  return layer
}

// chỉ có 3 thể loại mật độ: thông thoáng, ùn tắc, nghiêm trọng 
// khi click thì viền ngoài đoạn đường sẽ được in đậm 
export const createPolyline_ = (
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

export const createPolyline = (
  L: LeafletType,
  data: PolylineData,
  onClick: (currentLayer: L.Polyline) => void
) => {
  const polyline = L.polyline(
    data.path, {
    weight: BASE_POLYLINE_WEIGHT,
    color: convertPolylineStatus(data.status),
    lineCap: 'butt',
    lineJoin: 'miter',
  })

  polyline.on('add', function (this: L.Polyline) {
    scalePolylineLayer(this._map, this)
  })

  polyline.on('click', function (this: L.Polyline, e: L.LeafletMouseEvent) {
    // click polyline chứ không click map
    L.DomEvent.stopPropagation(e)

    // // Reset các polyline khác
    // this._map.eachLayer((layer: L.Layer) => {
    //   if (layer instanceof L.Polyline && layer.options.className === 'polyline-border')
    //     layer.setStyle({ className: '' })
    // })

    // this.setStyle({
    //   className: 'polyline-border'
    // })

    onClick(this)
  })

  return polyline
}

export const createGeojsonLayer = (L: LeafletType, geojson: unknown) =>
  L.geoJSON(geojson as FeatureCollection, {
    style: () => ({
      color: 'black',
      weight: 0.5
    })
  }).on('add', function (this: L.GeoJSON) {
    const layers = this.getLayers();
    if (!layers.length) return;

    const firstLayer = layers[0];

    // Nếu là Point
    if (firstLayer instanceof L.Marker) {
      this._map.setView(firstLayer.getLatLng(), BASE_MAP_ZOOM);
    }

    // Nếu là LineString hoặc Polygon
    else if (firstLayer instanceof L.Polyline) {
      this._map.setView(firstLayer.getBounds().getCenter(), BASE_MAP_ZOOM);
    }
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
    map.eachLayer((layer: L.Layer) => {
      if (layer instanceof window.L.HeatLayer)
        return scaleHeatLayer(map, layer)
      if (layer instanceof L.Polyline)
        return scalePolylineLayer(map, layer)
      if (layer instanceof L.Marker)
        return scaleMarkerLayer(L)(map, layer)
    })
  })

  return map
}

const scaleHeatLayer = (map: L.Map, layer: HeatLayer) => {
  const currentZoom = map.getZoom()
  const scale = Math.pow(1.8, currentZoom - BASE_MAP_ZOOM)
  const zoomRadius = BASE_HEAT_RADIUS * scale
  const zoomBlur = BASE_HEAT_BLUR * scale

  if (zoomRadius < 119)
    return layer.setOptions({
      radius: zoomRadius,
      blur: zoomBlur,
    })
}

const scalePolylineLayer = (map: L.Map, layer: L.Polyline) => {
  const currentZoom = map.getZoom()
  const scale = Math.pow(1.3, currentZoom - BASE_MAP_ZOOM)

  if (layer.options.className === 'polyline')
    return layer.setStyle({
      weight: BASE_POLYLINE_WEIGHT * scale
    })
}

const scaleMarkerLayer = (L: LeafletType) => (map: L.Map, layer: L.Marker) => {
  const currentZoom = map.getZoom()
  const scale = Math.pow(1.8, currentZoom - BASE_MAP_ZOOM)
  const currentOptions = layer.getIcon().options as L.IconOptions
  const scaledWidth = BASE_ICON_WIDTH * scale
  const scaledHeigh = BASE_ICON_HEIGH * scale

  return layer.setIcon(L.icon({
    ...currentOptions,
    iconSize: [scaledWidth, scaledHeigh],
    iconAnchor: [scaledWidth / 2, scaledHeigh],
  }))
}

export const initTileLayer = (L: LeafletType) => L.tileLayer(
  // '/OSM_tiles/{z}/{x}/{y}.png', {
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'ITD with <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

