"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Fuel, Settings2, Edit3, ShieldAlert } from "lucide-react"
import { vehicles, type Vehicle } from "@/lib/mock-data"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { VehicleBookingModal } from "./vehicle-booking-modal"
import { VehicleEditModal } from "../admin/vehicle-edit-modal"

export function RentalsTab() {
  const { user, isAdmin } = useAuth()
  const [filter, setFilter] = useState<string>("all")
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [localVehicles, setLocalVehicles] = useState<Vehicle[]>(vehicles)
  const [showAuth, setShowAuth] = useState(false)

  const categories = ["all", "sedan", "suv", "luxury", "van", "truck"]
  const filtered = filter === "all" ? localVehicles : localVehicles.filter(v => v.category === filter)

  const openBooking = (v: Vehicle) => {
    if (!user) { setShowAuth(true); return }
    setBookingVehicle(v)
  }

  const handleEditSave = (updated: Vehicle) => {
    setLocalVehicles(prev => prev.map(v => v.id === updated.id ? updated : v))
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Admin Notice */}
      {isAdmin && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Admin Edit Mode Active</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium italic">Tap edit icon to modify fleet</p>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`shrink-0 text-[10px] font-bold px-4 py-2 rounded-full border uppercase tracking-widest transition-all ${filter === c ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filtered.map(v => (
          <div key={v.id} className="relative group">
            <button disabled={!v.available && !isAdmin} onClick={() => openBooking(v)}
              className={`w-full text-left bg-card border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5 ${v.available ? "border-border hover:border-primary/50" : "border-border opacity-60"}`}>
              <div className="relative h-44">
                <Image src={v.image} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw,33vw" />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md rounded-xl px-2.5 py-1.5 shadow-lg border border-border transition-transform group-hover:scale-110">
                  <span className="text-xs font-black text-primary">ZMW {v.pricePerDay}<span className="text-[10px] text-muted-foreground font-normal ml-0.5">/day</span></span>
                </div>
                {!v.available && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="text-xs font-bold border border-border rounded-full px-4 py-1 bg-card/90 shadow-xl uppercase tracking-tighter">Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-foreground leading-tight">{v.name}</p>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">{v.brand} • {v.category}</p>

                <div className="flex gap-4 mt-4 text-[10px] font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary" />{v.seats} Seats</span>
                  <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5 text-primary" />{v.transmission}</span>
                  <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5 text-primary" />{v.fuel}</span>
                </div>

                {v.available && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest group-hover:underline">Reserve Now →</span>
                  </div>
                )}
              </div>
            </button>

            {/* Admin Edit Trigger */}
            {isAdmin && (
              <button
                onClick={(e) => { e.stopPropagation(); setEditingVehicle(v); }}
                className="absolute top-3 left-3 w-9 h-9 bg-rose-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors z-10"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingVehicle && (
        <VehicleBookingModal
          vehicle={bookingVehicle}
          onClose={() => setBookingVehicle(null)}
        />
      )}

      {/* Admin Edit Modal */}
      {editingVehicle && (
        <VehicleEditModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSave={handleEditSave}
        />
      )}

      {/* Auth gate */}
      {showAuth && <AuthGateModal open={showAuth} onClose={() => setShowAuth(false)} message="Sign in to reserve a vehicle" />}
    </div>
  )
}
