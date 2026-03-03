"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false)

    useEffect(() => {
        const handleOnline = () => setIsOffline(false)
        const handleOffline = () => setIsOffline(true)

        setIsOffline(!navigator.onLine)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    if (!isOffline) return null

    return (
        <div className="fixed top-16 inset-x-0 z-[100] bg-rose-500 text-white px-4 py-2 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Offline Mode — viewing cached data</span>
        </div>
    )
}
