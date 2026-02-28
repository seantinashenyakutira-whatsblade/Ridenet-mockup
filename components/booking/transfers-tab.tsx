"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plane, MapPin, Calendar, Clock } from "lucide-react"

export function TransfersTab() {
  const router = useRouter()
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    flightNumber: "",
    passengers: "1",
    name: "",
    phone: "",
    notes: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      type: "Airport Transfer",
      detail: `${form.pickup} → ${form.dropoff}`,
      date: form.date,
      name: form.name,
    })
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Pickup */}
        <div className="relative">
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={form.pickup}
              onChange={(e) => set("pickup", e.target.value)}
              placeholder="e.g. Kenneth Kaunda Airport"
              required
              className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Dropoff */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Drop-off Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={form.dropoff}
              onChange={(e) => set("dropoff", e.target.value)}
              placeholder="e.g. Radisson Blu, Lusaka"
              required
              className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              required
              className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="time"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              required
              className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Flight number */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
            Flight Number <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={form.flightNumber}
              onChange={(e) => set("flightNumber", e.target.value)}
              placeholder="e.g. QZ 408"
              className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Passengers</label>
          <select
            value={form.passengers}
            onChange={(e) => set("passengers", e.target.value)}
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <option key={n} value={n} className="bg-card">
                {n} passenger{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Your Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name"
            required
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Phone / WhatsApp</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+260 97 000 0000"
            required
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
          Special requests <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="e.g. Meet & greet, child seat, VIP requirements..."
          rows={3}
          className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
      >
        Request Transfer
      </button>
    </form>
  )
}
