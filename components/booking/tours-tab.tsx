"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, Star, Users, CheckCircle2, Calendar } from "lucide-react"
import { tours } from "@/lib/mock-data"
import type { Tour } from "@/lib/mock-data"

export function ToursTab() {
  const router = useRouter()
  const [selected, setSelected] = useState<Tour | null>(null)
  const [date, setDate] = useState("")
  const [groupSize, setGroupSize] = useState("2")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleReserve = () => {
    if (!selected) return
    const params = new URLSearchParams({
      type: "Safari / Tour",
      detail: `${selected.name} — ${selected.duration}`,
      date,
      name,
      price: String(selected.fromPrice),
    })
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <div>
      {/* Tour cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {tours.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t)}
            className={`text-left bg-card border rounded-xl overflow-hidden transition-all duration-200 ${
              selected?.id === t.id
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="relative h-40">
              <Image src={t.image} alt={t.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              {t.badge && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
              )}
              {selected?.id === t.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                </div>
              )}
              <div className="absolute bottom-2 left-3">
                <p className="text-xs text-foreground/70">From</p>
                <p className="text-sm font-bold text-foreground">${t.fromPrice}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.destination}</p>
              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.groupSize}</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3 h-3 fill-yellow-400" />{t.rating}
                </span>
              </div>
              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {t.highlights.slice(0, 3).map((h) => (
                  <span key={h} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
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
        <div className="bg-card border border-primary/30 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-foreground">
            Book: <span className="text-primary">{selected.name}</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg pl-8 pr-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Group Size</label>
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n} className="bg-card">{n} person{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Phone / WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+260 97 000 0000"
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
            </div>
          </div>
          <button
            onClick={handleReserve}
            className="w-full bg-primary text-primary-foreground text-sm font-bold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Reserve — ${selected.fromPrice * Number(groupSize)} total est.
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Reserve now, pay later. We will confirm within 2 hours.
          </p>
        </div>
      )}
    </div>
  )
}
