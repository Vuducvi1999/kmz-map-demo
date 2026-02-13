import { HeatData, MarkerData, PolylineData } from '@/app/utils/leaflet'
import { heatData, markerData, polylineData } from '@/data/leaflet'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type PolylineStatus = 1 | 2 | 3
type DeviceStatus = 'active' | 'inactive' | 'repair' | 'error'

interface TrafficFilters {
  interval: number
  polylineStatus: PolylineStatus | null
  cctvStatus: DeviceStatus | null
  vdsStatus: DeviceStatus | null
  heatRange: [number, number]
}

export function useTrafficData(filters: TrafficFilters) {
  const query = useQuery({
    queryKey: ['traffic-data', filters.interval],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 300))

      return {
        markerData,
        polylineData: polylineData.map(p => ({
          ...p,
          status: Math.floor(Math.random() * 3) + 1
        }) as PolylineData),
        heatData: heatData.map(h => ({
          ...h,
          intensity: Math.floor(Math.random() * 101)
        }) as HeatData)
      }
    },
    refetchInterval: filters.interval * 1000,
  })

  const filteredData = useMemo(() => {
    if (!query.data) return null

    const {
      markerData,
      polylineData,
      heatData,
    } = query.data

    return {
      markerData: markerData.filter((m: MarkerData) => {
        if (m.type === 'cctv')
          return filters.cctvStatus ? m.status === filters.cctvStatus : true
        if (m.type === 'vds')
          return filters.vdsStatus ? m.status === filters.vdsStatus : true
      }),

      polylineData: polylineData.filter((p: PolylineData) =>
        filters.polylineStatus ? p.status === filters.polylineStatus : true
      ),

      heatData: heatData.filter((h: HeatData) =>
        h.intensity >= filters.heatRange[0] &&
        h.intensity <= filters.heatRange[1]
      ),
    }
  }, [query.data, filters])

  return {
    ...query,
    ...filteredData
  }
}
