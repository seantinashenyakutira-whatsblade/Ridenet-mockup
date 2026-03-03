"use client"

import { useState, useMemo } from "react"
import { Search, X, MapPin, Navigation, History } from "lucide-react"

const LUSAKA_LOCATIONS = [
    "Kenneth Kaunda International Airport",
    "Lusaka CBD (Central Business District)",
    "Manda Hill Shopping Mall",
    "Levy Junction",
    "Intercontinental Hotel",
    "Radisson Blu Hotel",
    "Taj Pamodzi Hotel",
    "Woodlands",
    "Kabulonga",
    "Rhodes Park",
    "Fairview",
    "Longacres",
    "Olympia Park",
    "Roma",
    "Mass Media",
    "Garden City Mall",
    "Silverest",
    "Makeni Mall",
    "Chilenje",
    "Libala",
    "Chelstone",
    "Avondale",
    "Munali",
]

const RECENT_LOCATIONS = [
    "Kenneth Kaunda International Airport",
    "Manda Hill Shopping Mall",
]

interface LocationPickerProps {
    open: boolean
    onClose: () => void
    onSelect: (location: string) => void
    title?: string
}

export function LocationPicker({ open, onClose, onSelect, title = "Select Location" }: LocationPickerProps) {
    const [search, setSearch] = useState("")

    const filtered = useMemo(() => {
        if (!search) return LUSAKA_LOCATIONS
        return LUSAKA_LOCATIONS.filter(l => l.toLowerCase().includes(search.toLowerCase()))
    }, [search])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[110] bg-background flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black tracking-tight">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search areas, malls, or hotels..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-muted border border-border rounded-2xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-primary transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-20">
                {!search && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <History className="w-4 h-4 text-primary" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Destinations</h3>
                        </div>
                        <div className="space-y-2">
                            {RECENT_LOCATIONS.map(location => (
                                <button
                                    key={location}
                                    onClick={() => onSelect(location)}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted transition-colors text-left border border-border/50 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                        <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold text-foreground">{location}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Navigation className="w-4 h-4 text-primary" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            {search ? `${filtered.length} Locations Found` : "All Areas in Lusaka"}
                        </h3>
                    </div>
                    <div className="space-y-2">
                        {filtered.map(location => (
                            <button
                                key={location}
                                onClick={() => onSelect(location)}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted transition-colors text-left border border-border/50 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                    <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-foreground truncate">{location}</p>
                                    <p className="text-[10px] text-muted-foreground">Lusaka, Zambia</p>
                                </div>
                            </button>
                        ))}
                        {filtered.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-sm text-muted-foreground">No locations found for &quot;{search}&quot;</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background to-transparent pointer-events-none">
                <div className="flex justify-center">
                    <span className="text-[10px] text-muted-foreground/30 font-medium bg-background px-3 py-1 rounded-full border border-border">Powered by SeanDev</span>
                </div>
            </div>
        </div>
    )
}
