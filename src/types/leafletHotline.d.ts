import 'leaflet'

declare module 'leaflet' {
  interface HotlineOptions extends L.PolylineOptions {
    min?: number;
    max?: number;
    palette?: Record<number, string>;
    weight?: number;
    outlineWidth?: number;
    outlineColor?: string;
  }

  class Hotline extends L.Polyline {
    options: HotlineOptions;

    setStyle(style: HotlineOptions): this;
  }

  function hotline(
    data: Array<[number, number, number] | Array<[number, number, number]>>,
    options?: HotlineOptions
  ): Hotline;
}
