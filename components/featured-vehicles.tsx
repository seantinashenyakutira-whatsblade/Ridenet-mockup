"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings2, ArrowRight } from "lucide-react"
import { vehicles, type Vehicle } from "@/lib/mock-data"
import { VehicleBookingModal } from "@/components/booking/vehicle-booking-modal"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"

export function FeaturedVehicles() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const { user } = useAuth()

  const featured = vehicles.slice(0, 4)

  const handleReserveClick = (v: Vehicle) => {
    if (!user) {
      setAuthOpen(true)
      return
    }
    setSelectedVehicle(v)
  }

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Featured Vehicles</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Top picks for your Zambian travels</p>
        </div>
        <Link href="/booking?tab=rentals" className="text-xs text-primary font-bold flex items-center gap-1 hover:underline group">
          View All
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((v, index) => (
          <div
            key={v.id}
            className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-sm"
          >
            {/* Vehicle image */}
            <div className="relative h-44 bg-muted overflow-hidden">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index === 0}
              />
              {!v.available && (
                <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white bg-black/40 border border-white/20 rounded-full px-3 py-1 uppercase tracking-wider">
                    Unavailable
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md rounded-xl px-2.5 py-1.5 shadow-lg border border-border">
                <span className="text-xs font-black text-primary">ZMW {v.pricePerDay}<span className="text-[10px] text-muted-foreground font-normal ml-0.5">/day</span></span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-sm font-bold text-foreground leading-tight">{v.name}</p>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">{v.brand} • {v.category}</p>

              <div className="flex items-center gap-4 mt-4 text-[10px] font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  {v.seats} Seats
                </span>
                <span className="flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-primary" />
                  {v.transmission}
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-primary" />
                  {v.fuel}
                </span>
              </div>

              <button
                disabled={!v.available}
                onClick={() => handleReserveClick(v)}
                className={`mt-5 w-full text-center text-xs font-bold py-3 rounded-xl transition-all active:scale-[0.98] ${v.available
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
              >
                {v.available ? "RESERVE NOW" : "NOT AVAILABLE"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVehicle && (
        <VehicleBookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {authOpen && (
        <AuthGateModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          message="Sign in to reserve this vehicle"
        />
      )}
    </section>
  )
}
