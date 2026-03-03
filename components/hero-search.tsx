"use client"

import { useState } from "react"
import { Search, ChevronDown, MapPin, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { LocationPicker } from "./ui/location-picker"

const serviceOptions = [
  "Car Rental",
  "Airport Transfer",
  "Meet and Greet",
  "Accommodation arrangements",
  "Tour guide",
  "Goods collection and deliveries",
  "Corporate Transport",
  "Event Transportation",
]

export function HeroSearch() {
  const [service, setService] = useState("")
  const [location, setLocation] = useState("")
  const [pickerOpen, setPickerOpen] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    const tab = service.toLowerCase().includes("rental") ? "rentals"
      : service.toLowerCase().includes("tour") || service.toLowerCase().includes("accommodation") ? "tours"
        : service.toLowerCase().includes("transfer") || service.toLowerCase().includes("meet") ? "transfers"
          : "rentals"
    router.push(`/booking?tab=${tab}&location=${encodeURIComponent(location)}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500 delay-200">
      <div className="bg-card border border-border rounded-3xl p-2 sm:p-3 flex flex-col gap-2 shadow-2xl shadow-primary/5">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Service select */}
          <div className="relative flex-[1.5]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-muted/30 hover:bg-muted/50 transition-colors pl-11 pr-10 py-4 text-sm font-bold text-foreground appearance-none outline-none cursor-pointer rounded-2xl border border-transparent focus:border-primary/30"
            >
              <option value="" disabled className="bg-card text-foreground">Select Service / Destination</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s} className="bg-card text-foreground">{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Location Picker Trigger */}
          <div className="relative flex-1 group">
            <button
              onClick={() => setPickerOpen(true)}
              className="w-full flex items-center gap-3 bg-muted/30 hover:bg-muted/50 transition-all text-left px-4 py-4 rounded-2xl border border-transparent focus:border-primary/30 active:scale-95"
            >
              <MapPin className={`w-5 h-5 transition-colors ${location ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-bold truncate ${location ? "text-foreground" : "text-muted-foreground"}`}>
                {location || "Where to?"}
              </span>
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground text-sm font-black px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
          >
            LET&apos;S GO
          </button>
        </div>
      </div>

      {/* Quick tags */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {[
          { icon: Sparkles, label: "Safaris" },
          { icon: MapPin, label: "Victoria Falls" },
          { icon: MapPin, label: "Airport Transfer" }
        ].map((tag) => (
          <button
            key={tag.label}
            onClick={() => router.push("/booking")}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-4 py-1.5 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all active:scale-95 bg-card/50"
          >
            <tag.icon className="w-3 h-3" />
            {tag.label}
          </button>
        ))}
      </div>

      {/* Location Picker Slide-up */}
      <LocationPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(loc) => {
          setLocation(loc)
          setPickerOpen(false)
        }}
      />
    </div>
  )
}
