import { NextRequest, NextResponse } from 'next/server';
// import { extractKmztoGeojson } from '@/app/utils/helper';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log({ formData })
    const file = formData.get('kmz') as File;

    if (!file) {
      return NextResponse.json({ error: 'No KMZ file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const geojson = await extractKmztoGeojson(arrayBuffer)

    console.log({ geojson })

    return NextResponse.json({
      success: true,
      geoJSON: geojson
    });

  } catch (error) {
    console.error('Error processing KMZ:', error);
    return NextResponse.json({ error: 'Failed to process KMZ file' }, { status: 500 });
  }
}

import { DOMParser } from '@xmldom/xmldom'
import { kml } from '@tmcw/togeojson'
import JSZip from 'jszip';
import fs from 'fs/promises'
import path from 'path'

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
  await fs.writeFile(path.join(process.cwd(), 'public', 'test.geojson'), JSON.stringify(result))
  return result
}
