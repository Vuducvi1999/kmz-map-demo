'use client'

import { TrafficInfo } from "@/components/TrafficInfo"
import { TrafficControl } from "@/components/TrafficControl"
import dynamic from "next/dynamic"

const Map = dynamic(() => import('../components/MapComponent'), { ssr: false })

const HomePage = () => {
  return <>
    <div className='relative w-screen h-screen'>
      <Map />
      <div className="  absolute top-3 right-3 z-2000 max-w-70 ">
        <TrafficControl />
        <TrafficInfo />
      </div>
    </div>
  </>
}

export default HomePage
