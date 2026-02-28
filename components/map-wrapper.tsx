import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map-view"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-2xl flex items-center justify-center">Loading map...</div>
})

export default MapView;
