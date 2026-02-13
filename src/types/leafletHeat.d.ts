import 'leaflet'

declare module 'leaflet' {
  interface HeatOptions {
    /**
     * Dùng để tránh việc heatmap bị mất nét khi zoom xa.
     * Mặc định: 0.05
    */
    minOpacity?: number;
    /**
     * Mức zoom tối đa mà heatmap có thể hiển thị.
     * Khi zoom lớn hơn giá trị này, heatmap sẽ không tăng cường độ nữa.
    */
    maxZoom?: number;
    /**
     * Giá trị cường độ tối đa của 1 điểm nóng trên heatmap (intensity)
     */
    max?: number;
    /**
     * Bán kính ảnh hưởng của mỗi điểm nóng (pixel)
     */
    radius?: number;
    /**
     * Độ mờ của vùng heat xung quanh điểm nóng
     */
    blur?: number;
    /**
     * màu hiển thị lên heatmap
     */
    gradient?: {
      [key: number]: string
    }
    /**
     * chọn layer vẽ heat (type bên dưới đã được liệt kê theo tứ tự)
     */
    pane?:
    'popupPane' |
    'tooltipPane' |
    'markerPane' |
    'shadowPane' |
    'overlayPane' |
    'tilePane' |
    'mapPane' |
    'heatPane'
  }

  class HeatLayer extends L.Layer {
    _canvas?: HTMLCanvasElement
    options: HeatOptions
    /**
     * thay option ban đầu của layer heat map
     */
    setOptions(options: HeatOptions): this;

    /**
     * Thay toàn bộ dữ liệu heat
     */
    setLatLngs(latlngs: Array<[number, number, number?]>): this;

    /**
     * Thêm 1 điểm heat mới
     */
    addLatLng(latlng: [number, number, number?]): this;

  }

  function heatLayer(
    latlngs: ([number, number, number?])[] | L.LatLng[], // lat, long, intensity
    options?: HeatOptions
  ): HeatLayer;
};
