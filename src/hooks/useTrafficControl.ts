import type { HeatData, MarkerData, PolylineData } from '@/utils/leaflet'
import { heatData, markerData, polylineData } from '@/data/leaflet'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTrafficInfo } from './useTrafficInfo'
import { useLeafletStore } from './useLeafletStore'

export function useTrafficControl() {
  const interval = useLeafletStore((state) => state.interval)
  const cctvStatus = useLeafletStore((state) => state.cctvStatus)
  const vdsStatus = useLeafletStore((state) => state.vdsStatus)
  const polylineStatus = useLeafletStore((state) => state.polylineStatus)
  const heatRange = useLeafletStore((state) => state.heatRange)

  const query = useQuery({
    queryKey: ['traffic-data', interval],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 300))
      useTrafficInfo.getState().setSelectedObject(null)

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
    refetchInterval: interval * 1000,
  })

  const filteredMarkerData = useMemo(() => {
    if (!query.data?.markerData) return null

    return query.data?.markerData.filter((m: MarkerData) => {
      if (m.type === 'cctv')
        return cctvStatus ? m.status === cctvStatus : true
      if (m.type === 'vds')
        return vdsStatus ? m.status === vdsStatus : true
      return true
    })
  }, [query.data?.markerData, cctvStatus, vdsStatus])

  const filteredPolylineData = useMemo(() => {
    if (!query.data?.polylineData) return null

    return query.data?.polylineData.filter((p: PolylineData) =>
      polylineStatus ? p.status === polylineStatus : true
    )
  }, [query.data?.polylineData, polylineStatus])

  const filteredHeatData = useMemo(() => {
    if (!query.data?.heatData) return null

    return query.data?.heatData.filter((h: HeatData) =>
      heatRange ?
        h.intensity >= heatRange[0] && h.intensity <= heatRange[1] :
        true
    )
  }, [query.data?.heatData, heatRange])

  return {
    ...query,
    markerData: filteredMarkerData,
    polylineData: filteredPolylineData,
    heatData: filteredHeatData,
  }
}
