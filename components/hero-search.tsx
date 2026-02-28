"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

const serviceOptions = [
  "Car Rental",
  "Airport Transfer",
  "City Tour",
  "Safari",
  "Corporate Transport",
  "Event Transportation",
  "Freight Forwarding",
  "Customs Clearance",
]

export function HeroSearch() {
  const [service, setService] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const tab = service.toLowerCase().includes("rental") ? "rentals"
      : service.toLowerCase().includes("tour") || service.toLowerCase().includes("safari") ? "tours"
      : service.toLowerCase().includes("transfer") ? "transfers"
      : service.toLowerCase().includes("freight") || service.toLowerCase().includes("customs") ? "freight"
      : "rentals"
    router.push(`/booking?tab=${tab}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
        {/* Service select */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-transparent pl-9 pr-8 py-2.5 text-sm text-foreground appearance-none outline-none cursor-pointer"
          >
            <option value="" disabled className="bg-card text-foreground">Where to / What service?</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-card text-foreground">{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Location */}
        <div className="hidden sm:block w-px bg-border self-stretch my-1" />
        <input
          type="text"
          placeholder="Pickup location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />

        {/* CTA */}
        <button
          onClick={handleSearch}
          className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Search
        </button>
      </div>

      {/* Quick tags */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {["Airport Pickup", "Safari Packages", "Lusaka City Tour", "Freight Quote"].map((tag) => (
          <button
            key={tag}
            onClick={() => router.push("/booking")}
            className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1 hover:border-primary hover:text-primary transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
