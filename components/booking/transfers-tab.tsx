"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Calendar, Clock, Plane, Users, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"

// Zambia location suggestions for typeahead
const ZM_LOCATIONS = [
  "Kenneth Kaunda International Airport, Lusaka",
  "Harry Mwaanga Nkumbula Airport, Livingstone",
  "Simon Mwansa Kapwepwe International Airport, Ndola",
  "Lusaka CBD – Cairo Road",
  "Lusaka International Airport (KKIA) Terminal",
  "Intercontinental Hotel, Lusaka",
  "Radisson Blu Hotel, Lusaka",
  "Southern Sun Ridgeway Hotel, Lusaka",
  "Holiday Inn, Lusaka",
  "Taj Pamodzi Hotel, Lusaka",
  "Victoria Falls Hotel, Livingstone",
  "Royal Livingstone Hotel",
  "Avani Victoria Falls Resort",
  "Lusaka East Roundabout",
  "Levy Junction Shopping Mall",
  "Arcades Shopping Mall, Lusaka",
  "East Park Mall, Lusaka",
  "Makeni Mall, Lusaka",
  "Chisamba – 60km north of Lusaka",
  "Kabwe Town Centre",
  "Ndola City Centre",
  "Kitwe CBD",
  "Solwezi Town",
  "Lower Zambezi National Park Gate",
  "South Luangwa National Park – Mfuwe Gate",
  "Kafue National Park Gate",
  "Siavonga Resort Area, Lake Kariba",
  "Chipata Town Centre",
]

// Simple typeahead input component
function LocationInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder: string
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleChange = (v: string) => {
    onChange(v)
    if (v.length > 1) {
      setSuggestions(ZM_LOCATIONS.filter(l => l.toLowerCase().includes(v.toLowerCase())).slice(0, 5))
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
      <input
        type="text" value={value}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => value.length > 1 && setOpen(true)}
        placeholder={placeholder}
        required
        className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-50 bg-card border border-border rounded-xl mt-1 shadow-xl overflow-hidden">
          {suggestions.map(s => (
            <li key={s}>
              <button type="button" onClick={() => { onChange(s); setOpen(false) }}
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-muted flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function TransfersTab() {
  const { user, userData } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    pickup: "", dropoff: "", date: "", time: "", flightNumber: "",
    passengers: "1", name: "", phone: "", notes: "",
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  // Auto-fill from auth when user signs in
  useEffect(() => {
    if (userData) {
      setForm(f => ({
        ...f,
        name: f.name || userData.name || "",
        phone: f.phone || userData.phone || "",
      }))
    }
  }, [userData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-2">Transfer Request Sent! 🎉</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
          Our support team will send you a <span className="font-semibold text-green-600">WhatsApp message</span> shortly to confirm your transfer details.
        </p>
        <div className="bg-muted/60 rounded-xl p-4 text-left max-w-sm mx-auto text-sm space-y-1 mb-6">
          <p><span className="text-muted-foreground">From:</span> <b>{form.pickup}</b></p>
          <p><span className="text-muted-foreground">To:</span> <b>{form.dropoff}</b></p>
          <p><span className="text-muted-foreground">Date:</span> <b>{form.date} at {form.time}</b></p>
          <p><span className="text-muted-foreground">Contact:</span> <b>{form.phone}</b></p>
        </div>
        <a
          href={`https://wa.me/260776950796?text=${encodeURIComponent(`Hi RideNet! I just requested an airport transfer.\nFrom: ${form.pickup}\nTo: ${form.dropoff}\nDate: ${form.date} at ${form.time}\nName: ${form.name}\nPhone: ${form.phone}`)}`}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-green-700 transition-colors text-sm"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Chat on WhatsApp
        </a>
        <button onClick={() => setSubmitted(false)} className="block mx-auto mt-3 text-xs text-muted-foreground hover:text-foreground">
          Make another request
        </button>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Pickup */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Pickup Location</label>
            <LocationInput value={form.pickup} onChange={v => set("pickup", v)} placeholder="e.g. Kenneth Kaunda Airport" />
          </div>
          {/* Dropoff */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Drop-off Location</label>
            <LocationInput value={form.dropoff} onChange={v => set("dropoff", v)} placeholder="e.g. Radisson Blu, Lusaka" />
          </div>
          {/* Date */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input type="date" required value={form.date} onChange={e => set("date", e.target.value)} min={new Date().toISOString().split("T")[0]}
                className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          {/* Time */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input type="time" required value={form.time} onChange={e => set("time", e.target.value)}
                className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          {/* Flight number */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Flight Number <span className="text-muted-foreground/60">(optional)</span></label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input type="text" value={form.flightNumber} onChange={e => set("flightNumber", e.target.value)}
                placeholder="e.g. QZ 408"
                className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          {/* Passengers */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Passengers</label>
            <select value={form.passengers} onChange={e => set("passengers", e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                <option key={n} value={n} className="bg-card">{n} passenger{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          {/* Name */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Your Name</label>
            <input type="text" required value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="Full name"
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Phone / WhatsApp</label>
            <input type="tel" required value={form.phone} onChange={e => set("phone", e.target.value)}
              placeholder="+260 97 000 0000"
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
          </div>
        </div>
        {/* Notes */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Special requests <span className="text-muted-foreground/60">(optional)</span></label>
          <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
            placeholder="e.g. Meet & greet, child seat, VIP..." rows={2}
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none" />
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
          Request Transfer
        </button>
      </form>
      {showAuth && <AuthGateModal open={showAuth} onClose={() => setShowAuth(false)} message="Sign in to request a transfer" />}
    </>
  )
}
