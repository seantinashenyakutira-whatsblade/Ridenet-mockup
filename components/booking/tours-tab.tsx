"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, Star, Users, CheckCircle2, Calendar, MapPin, Map as MapIcon, X } from "lucide-react"
import { tours } from "@/lib/mock-data"
import type { Tour } from "@/lib/mock-data"
import { useAuth } from "@/lib/AuthContext"

export function ToursTab() {
  const router = useRouter()
  const { userData } = useAuth()
  const [selected, setSelected] = useState<Tour | null>(null)
  const [date, setDate] = useState("")
  const [groupSize, setGroupSize] = useState("2")
  const [name, setName] = useState(userData?.name || "")
  const [phone, setPhone] = useState(userData?.phone || "")
  const [showMapStub, setShowMapStub] = useState(false)

  const handleReserve = () => {
    if (!selected) return
    const params = new URLSearchParams({
      type: "Safari / Tour",
      detail: `${selected.name} — ${selected.duration}`,
      date,
      name,
      price: String(selected.fromPrice * Number(groupSize)),
    })
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Tour cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tours.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t)}
            className={`text-left bg-card border rounded-[2rem] overflow-hidden transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 ${selected?.id === t.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
              }`}
          >
            <div className="relative h-44">
              <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {t.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black bg-accent text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {t.badge}
                  </span>
                </div>
              )}

              {selected?.id === t.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="absolute bottom-3 left-4">
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">From</p>
                <p className="text-xl font-black text-primary">ZMW {t.fromPrice}</p>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-black text-foreground tracking-tight leading-tight">{t.name}</h3>
              <p className="text-xs font-bold text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                {t.destination}
              </p>

              <div className="flex gap-4 mt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" />{t.duration}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary" />{t.groupSize}</span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />{t.rating}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {t.highlights.slice(0, 3).map((h) => (
                  <span key={h} className="text-[9px] font-bold bg-primary/5 text-primary border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Booking panel */}
      {selected && (
        <div className="bg-card border-2 border-primary/20 rounded-[2.5rem] p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Booking Confirmation</p>
              <h2 className="text-2xl font-black text-foreground tracking-tight">{selected.name}</h2>
            </div>
            <button
              onClick={() => setShowMapStub(true)}
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
            >
              <MapIcon className="w-4 h-4 text-primary" />
              Open Map
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Number of People</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl pl-12 pr-10 py-4 text-sm font-bold text-foreground outline-none appearance-none focus:border-primary transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(n => (
                    <option key={n} value={n} className="bg-card">{n} Traveler{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 text-sm font-bold text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+260 97 000 0000"
                className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 text-sm font-bold text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Total</span>
              </div>
              <p className="text-2xl font-black text-primary">ZMW {selected.fromPrice * Number(groupSize)}</p>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium italic text-center border-t border-primary/10 pt-3">
              Includes guide, transportation, and light refreshments. Park fees not included.
            </p>
          </div>

          <button
            onClick={handleReserve}
            className="w-full bg-primary text-primary-foreground text-sm font-black py-5 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 uppercase tracking-widest"
          >
            RESERVE EXPERIENCE
          </button>
          <p className="text-[10px] text-muted-foreground text-center font-bold">
            NO UPFRONT PAYMENT REQUIRED · FREE CANCELLATION UP TO 24H
          </p>
        </div>
      )}

      {/* Map Stub Modal */}
      {showMapStub && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowMapStub(false)} />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight">Experience Map</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{selected?.destination}</p>
              </div>
              <button onClick={() => setShowMapStub(false)} className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-muted group cursor-crosshair">
              <Image
                src="/images/map-placeholder.jpg"
                alt="Map"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black/40">
                <MapIcon className="w-12 h-12 text-primary mb-4 animate-bounce" />
                <p className="text-lg font-black text-white uppercase tracking-tighter">Interactive Map Stub</p>
                <p className="text-sm text-white/80 font-medium max-w-xs mt-2">
                  For the prototype, this represents the destination selection & routing map.
                </p>
                <button className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">
                  Select Point on Map
                </button>
              </div>

              {/* Simulated points */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-lg" />
            </div>
            <div className="p-4 bg-muted/50 text-center">
              <p className="text-[10px] text-muted-foreground font-bold">Powered by SeanDev Map Engine (Stub)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
