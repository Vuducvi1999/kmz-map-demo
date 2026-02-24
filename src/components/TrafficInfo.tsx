import { useCollapseTraffic } from "@/hooks/useCollapseTraffic"
import { useTrafficInfo } from "@/hooks/useTrafficInfo"

export const TrafficInfo = () => {
  const {
    trafficInfoCollapsed: collapsed,
    closeTrafficInfo: close,
    openTrafficInfo: open
  } = useCollapseTraffic()

  const selectedObject = useTrafficInfo((state) => state.selectedObject)

  // console.log({ selectedObject })

  return <div className="bg-white border mt-1">
    <div
      className="flex justify-between px-4 py-3 cursor-pointer"
      onClick={() => collapsed ? close() : open()}
    >
      <h3 className="font-bold">
        Traffic Info
      </h3>

      <button
        className="
        text-gray-500 hover:text-black
          "
      >
        {collapsed ? '▼' : '▲'}
      </button>
    </div>

    <div className={`
        transition-all duration-300 ease-in-out
        ${collapsed ? "max-h-full opacity-100 px-4 pb-4 space-y-4" : "max-h-0 opacity-0"}
    `}>
      {JSON.stringify(selectedObject)}
    </div>
  </div>
}