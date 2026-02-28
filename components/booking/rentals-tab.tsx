"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Users, Fuel, Settings2, CheckCircle2, X, MapPin, Calendar, Star, ChevronDown } from "lucide-react"
import { vehicles, type Vehicle } from "@/lib/mock-data"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0
  const diff = new Date(b).getTime() - new Date(a).getTime()
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function RentalsTab() {
  const router = useRouter()
  const { user, userData } = useAuth()
  const [filter, setFilter] = useState<string>("all")
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [form, setForm] = useState({
    name: "", phone: "", pickup: "", dropoffDate: "", pickupDate: "", pickupLocation: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const categories = ["all", "sedan", "suv", "luxury", "van", "truck"]
  const filtered = filter === "all" ? vehicles : vehicles.filter(v => v.category === filter)

  const days = daysBetween(form.pickupDate, form.dropoffDate)
  const total = bookingVehicle ? bookingVehicle.pricePerDay * days : 0

  const openBooking = (v: Vehicle) => {
    if (!user) { setShowAuth(true); return }
    setForm({
      name: userData?.name || "",
      phone: userData?.phone || "",
      pickup: "",
      dropoffDate: "",
      pickupDate: "",
      pickupLocation: "",
    })
    setSubmitted(false)
    setBookingVehicle(v)
  }

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingVehicle) return
    const params = new URLSearchParams({
      type: "Car Rental",
      detail: `${bookingVehicle.name} – ${days} day${days > 1 ? "s" : ""}`,
      date: form.pickupDate,
      name: form.name,
      vehicle: bookingVehicle.id,
    })
    setBookingVehicle(null)
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border capitalize transition-colors ${filter === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filtered.map(v => (
          <button key={v.id} disabled={!v.available} onClick={() => openBooking(v)}
            className={`text-left bg-card border rounded-xl overflow-hidden transition-all duration-200 ${v.available ? "border-border hover:border-primary/60 hover:shadow-md" : "border-border opacity-50 cursor-not-allowed"}`}>
            <div className="relative h-36">
              <Image src={v.image} alt={v.name} fill className="object-cover" sizes="(max-width:640px) 100vw,33vw" />
              <div className="absolute top-2 right-2 bg-background/85 backdrop-blur-sm rounded-lg px-2 py-0.5">
                <span className="text-xs font-bold text-primary">ZMW {v.pricePerDay}/day</span>
              </div>
              {!v.available && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xs font-semibold border border-border rounded-full px-3 py-1 bg-card">Unavailable</span>
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
              {v.available && (
                <div className="mt-2 text-xs text-primary font-semibold">Tap to book →</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── BOOKING MODAL ─────────────────────────────────── */}
      {bookingVehicle && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setBookingVehicle(null)} />
          <div className="relative w-full max-w-md bg-card border border-border rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button onClick={() => setBookingVehicle(null)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-muted/80 rounded-full flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>

            {/* Vehicle hero */}
            <div className="relative h-44">
              <Image src={bookingVehicle.image} alt={bookingVehicle.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="text-lg font-bold text-white">{bookingVehicle.name}</p>
                <p className="text-sm text-white/80">{bookingVehicle.brand} • {bookingVehicle.category}</p>
              </div>
            </div>

            {/* Specs + pricing */}
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{bookingVehicle.seats} seats</span>
                  <span className="flex items-center gap-1"><Settings2 className="w-3.5 h-3.5" />{bookingVehicle.transmission}</span>
                  <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{bookingVehicle.fuel}</span>
                </div>
                <span className="text-sm font-bold text-primary">ZMW {bookingVehicle.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span></span>
              </div>
              <div className="flex flex-wrap gap-1">
                {bookingVehicle.features.map(f => (
                  <span key={f} className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5">{f}</span>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleReserve} className="p-4 space-y-3">
              <p className="text-sm font-bold text-foreground">Your Details</p>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Full name" className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Phone / WhatsApp</label>
                <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+260 97 000 0000" className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input required value={form.pickupLocation} onChange={e => setForm(f => ({ ...f, pickupLocation: e.target.value }))}
                    placeholder="e.g. Lusaka CBD, Airport, Hotel..." className="w-full bg-input border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input required type="date" value={form.pickupDate} min={new Date().toISOString().split("T")[0]}
                      onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))}
                      className="w-full bg-input border border-border rounded-xl pl-9 pr-2 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input required type="date" value={form.dropoffDate} min={form.pickupDate || new Date().toISOString().split("T")[0]}
                      onChange={e => setForm(f => ({ ...f, dropoffDate: e.target.value }))}
                      className="w-full bg-input border border-border rounded-xl pl-9 pr-2 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Price summary */}
              {days > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>ZMW {bookingVehicle.pricePerDay} × {days} day{days > 1 ? "s" : ""}</span>
                    <span className="font-bold text-foreground">ZMW {total}</span>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
                {days > 0 ? `Reserve – ZMW ${total}` : "Reserve Now"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth gate for non signed in users */}
      {showAuth && <AuthGateModal open={showAuth} onClose={() => setShowAuth(false)} message="Sign in to reserve a vehicle" />}
    </div>
  )
}
