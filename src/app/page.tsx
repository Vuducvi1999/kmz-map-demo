'use client'

import { TrafficControlPanel } from "@/components/TrafficPanel"
import dynamic from "next/dynamic"

const Map = dynamic(() => import('../components/MapComponent'), { ssr: false })

const HomePage = () => {
  return <>
    <div className='relative w-screen h-screen'>
      <Map />
      <TrafficControlPanel />
    </div>
  </>
}

export default HomePage