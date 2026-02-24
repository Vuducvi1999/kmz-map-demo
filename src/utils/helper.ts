import { DOMParser } from '@xmldom/xmldom'
import { kml } from '@tmcw/togeojson'
import JSZip from 'jszip';

interface LatLng {
  lat: number;
  lng: number;
}

export const extractKmztoGeojson = async (kmzBuffer: ArrayBuffer) => {
  const zip = await JSZip.loadAsync(kmzBuffer);

  const kmlFileName = Object.keys(zip.files).find(
    (name) => name.toLowerCase().endsWith(".kml")
  );

  if (!kmlFileName) {
    throw new Error("Không tìm thấy file KML trong KMZ");
  }

  const kmlContent = await zip.files[kmlFileName].async("string");
  const result = kml(new DOMParser().parseFromString(kmlContent, "text/xml"))
  return result
}

export const interpolateLatLng = ({
  start: [startLat, startLong],
  end: [endLat, endLong],
  N = 5
}: {
  start: [number, number],
  end: [number, number],
  N?: number
}) => {
  const result: [number, number][] = [];

  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);

    result.push([
      startLat + (endLat - startLat) * t,
      startLong + (endLong - startLong) * t,
    ]);
  }

  return result;
}