import { DeviceStatus, PolylineStatus } from "@/utils/leaflet";
import { useLeaflet } from "./LeafletProvider";
import { useCollapseTraffic } from "@/hooks/useCollapseTraffic";

export function TrafficControl() {
  const {
    trafficControlCollapsed: collapsed,
    closeTrafficControl: closeControl,
    openTrafficControl: openControl,
    closeTrafficInfo: closeInfo
  } = useCollapseTraffic()

  const {
    interval: { setInterval, value: interval },
    cctv: { status: cctvStatus, setStatus: setCctvStatus },
    geojson: { active: geojsonActive, setActive: setGeojsonActive },
    polyline: { status: polylineStatus, setStatus: setPolylineStatus },
    heat: { range: heatRange, setHeatRange },
    vds: { status: vdsStatus, setStatus: setVdsStatus }
  } = useLeaflet()

  const open = () => { closeInfo(); openControl(); }

  return (
    <div className="bg-white border">
      {/* HEADER */}
      <div
        className="flex justify-between px-4 py-3 cursor-pointer"
        onClick={() => collapsed ? closeControl() : open()}
      >
        <h3 className="font-bold">
          Traffic Control
        </h3>

        <button
          className="text-gray-500 hover:text-black"
        >
          {collapsed ? '▼' : '▲'}
        </button>
      </div>

      {/* CONTENT */}
      {
        <div
          className={`
          transition-all duration-300 ease-in-out
          ${collapsed ? "visible max-h-full px-4 pb-4 space-y-4" : "invisible max-h-0 "}
        `}
        >

          {/* interval */}
          <div className="flex">
            <span className="" > Interval </span>
            <select
              value={interval}
              onChange={e => setInterval(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled hidden>
                Refetch after
              </option>
              <option value={1}>1 min</option>
              <option value={2}>2 min</option>
              <option value={3}>3 min</option>
            </select>
          </div>

          {/* GEOJSON */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">GeoJSON</span>
            <input
              type="checkbox"
              checked={geojsonActive}
              onChange={e => setGeojsonActive(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
          </div>

          {/* POLYLINE */}
          <div>
            <label className="block mb-1 text-gray-700">
              Polyline Status
            </label>
            <select
              value={polylineStatus || ''}
              onChange={e => setPolylineStatus(e.target.value ? Number(e.target.value) as PolylineStatus : null)}
              className="w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled hidden>
                Chọn trạng thái Polyline
              </option>
              <option value={1}>Thông thoáng</option>
              <option value={2}>Ùn tắc</option>
              <option value={3}>Nghiêm trọng</option>
            </select>
          </div>

          {/* CCTV */}
          <div>
            <label className="block mb-1 text-gray-700">
              CCTV
            </label>
            <select
              value={cctvStatus || ''}
              onChange={e => setCctvStatus(e.target.value ? e.target.value as DeviceStatus : null)}
              className="w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled hidden>
                Chọn trạng thái CCTV
              </option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
              <option value="error">Cần sửa chữa</option>
            </select>
          </div>

          {/* VDS */}
          <div>
            <label className="block mb-1 text-gray-700">
              VDS
            </label>
            <select
              value={vdsStatus ?? ''}
              onChange={e => setVdsStatus(e.target.value ? e.target.value as DeviceStatus : null)}
              className="w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white"
            >
              <option value="" disabled hidden>
                Chọn trạng thái VDS
              </option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
              <option value="error">Cần sửa chữa</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Heat Intensity
            </label>

            <div className="flex items-center gap-3">
              {/* MIN */}
              <div className="flex flex-col w-1/2">
                <span className="text-xs text-gray-500 mb-1">Min</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={heatRange[0]}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value <= heatRange[1]) setHeatRange(([, max]) => ([value, max]))
                  }}
                  className="
                  px-3 py-1.5
                  rounded-md
                  border border-gray-300
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              <span className="text-gray-400 mt-5">—</span>

              {/* MAX */}
              <div className="flex flex-col w-1/2">
                <span className="text-xs text-gray-500 mb-1">Max</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={heatRange[1]}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value >= heatRange[0]) setHeatRange(([min]) => ([min, value]))
                  }}
                  className="
                  px-3 py-1.5
                  rounded-md
                  border border-gray-300
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-red-500
                "
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Range: 0 – 100
            </p>
          </div>
        </div>
      }
    </div>
  );
}
