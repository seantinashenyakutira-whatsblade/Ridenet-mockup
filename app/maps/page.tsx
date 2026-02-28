"use client"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import MapWrapper from "@/components/map-wrapper"

export default function MapsPage() {
    // Hardcoded Lusaka airport coords & city center for demo if they select it
    const preDefinedLocations = [
        { label: "Lusaka Airport (LUN)", lat: -15.3308, lng: 28.4464 },
        { label: "Lusaka City Center", lat: -15.4167, lng: 28.2833 },
        { label: "Mandahill Mall", lat: -15.3900, lng: 28.3075 },
        { label: "Levy Mall", lat: -15.4145, lng: 28.2780 }
    ]

    const [fromPos, setFromPos] = useState<any>(null)
    const [toPos, setToPos] = useState<any>(null)

    return (
        <div className="min-h-screen pb-24 bg-background flex flex-col pt-6 h-screen overflow-hidden">
            <div className="px-4 flex items-center mb-4 shrink-0">
                <Link href="/" className="mr-4">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold">Route Preview</h1>
            </div>

            <div className="px-4 shrink-0 space-y-3 mb-4">
                <div>
                    <label className="text-xs font-semibold text-muted-foreground ml-1">From</label>
                    <select
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none"
                        onChange={(e) => setFromPos(preDefinedLocations[Number(e.target.value)])}
                        defaultValue=""
                    >
                        <option value="" disabled>Select pick-up location</option>
                        {preDefinedLocations.map((loc, idx) => (
                            <option key={idx} value={idx}>{loc.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-semibold text-muted-foreground ml-1">To</label>
                    <select
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none"
                        onChange={(e) => setToPos(preDefinedLocations[Number(e.target.value)])}
                        defaultValue=""
                    >
                        <option value="" disabled>Select drop-off location</option>
                        {preDefinedLocations.map((loc, idx) => (
                            <option key={idx} value={idx}>{loc.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-1 px-4 min-h-[300px] mb-4">
                <MapWrapper
                    fromLat={fromPos?.lat} fromLng={fromPos?.lng}
                    toLat={toPos?.lat} toLng={toPos?.lng}
                />
            </div>

            <BottomNav />
        </div>
    )
}
