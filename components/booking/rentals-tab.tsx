"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Users, Fuel, Settings2, CheckCircle2, X } from "lucide-react"
import { vehicles, type Vehicle } from "@/lib/mock-data"

export function RentalsTab() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>("all")
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [dates, setDates] = useState({ pickup: "", dropoff: "" })

  const categories = ["all", "sedan", "suv", "luxury", "van", "truck"]
  const filtered = filter === "all" ? vehicles : vehicles.filter((v) => v.category === filter)

  const handleReserve = () => {
    if (!selectedVehicle) return
    const params = new URLSearchParams({
      vehicle: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      price: String(selectedVehicle.pricePerDay),
      type: "Car Rental",
    })
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors capitalize ${
              filter === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filtered.map((v) => (
          <button
            key={v.id}
            disabled={!v.available}
            onClick={() => setSelectedVehicle(v)}
            className={`text-left bg-card border rounded-xl overflow-hidden transition-all duration-200 ${
              selectedVehicle?.id === v.id
                ? "border-primary ring-1 ring-primary"
                : v.available
                ? "border-border hover:border-primary/50"
                : "border-border opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="relative h-36">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute top-2 right-2 bg-background/85 backdrop-blur-sm rounded-lg px-2 py-0.5">
                <span className="text-xs font-bold text-primary">${v.pricePerDay}/day</span>
              </div>
              {selectedVehicle?.id === v.id && (
                <div className="absolute top-2 left-2">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground">{v.name}</p>
              <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{v.seats}</span>
                <span className="flex items-center gap-1"><Settings2 className="w-3 h-3" />{v.transmission}</span>
                <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{v.fuel}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Reserve panel */}
      {selectedVehicle && (
        <div className="bg-card border border-primary/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">{selectedVehicle.name} selected</p>
            <p className="text-xs text-muted-foreground mt-0.5">${selectedVehicle.pricePerDay}/day</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="date"
              value={dates.pickup}
              onChange={(e) => setDates((d) => ({ ...d, pickup: e.target.value }))}
              className="text-xs bg-input border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="Pickup date"
            />
            <input
              type="date"
              value={dates.dropoff}
              onChange={(e) => setDates((d) => ({ ...d, dropoff: e.target.value }))}
              className="text-xs bg-input border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="Return date"
            />
            <button
              onClick={handleReserve}
              className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Reserve
            </button>
          </div>
          <button onClick={() => setSelectedVehicle(null)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
