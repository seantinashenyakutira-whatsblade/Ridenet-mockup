"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Package, FileCheck, Upload } from "lucide-react"

type FreightType = "freight" | "customs"

export function FreightTab() {
  const router = useRouter()
  const [type, setType] = useState<FreightType>("freight")
  const [form, setForm] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    origin: "",
    destination: "",
    weight: "",
    description: "",
    cargoType: "",
    date: "",
    importExport: "import",
    hsCode: "",
    invoiceValue: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      type: type === "freight" ? "Freight Forwarding" : "Customs Clearance",
      detail: type === "freight"
        ? `${form.origin} → ${form.destination}, ${form.weight}kg`
        : `${form.importExport} — ${form.description}`,
      name: form.contact,
    })
    router.push(`/confirmation?${params.toString()}`)
  }

  return (
    <div>
      {/* Type selector */}
      <div className="flex gap-2 mb-6">
        {(["freight", "customs"] as FreightType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex items-center gap-2 flex-1 border rounded-xl p-3 transition-all ${
              type === t
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50"
            }`}
          >
            {t === "freight" ? <Package className="w-4 h-4" /> : <FileCheck className="w-4 h-4" />}
            <div className="text-left">
              <p className="text-xs font-semibold capitalize">
                {t === "freight" ? "Freight Forwarding" : "Customs Clearance"}
              </p>
              <p className="text-xs text-muted-foreground">
                {t === "freight" ? "Domestic & cross-border" : "Import & export docs"}
              </p>
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Company / Organization</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Company name"
              required
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Contact Person</label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
              placeholder="Full name"
              required
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Phone / WhatsApp</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+260 21 000 0000"
              required
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="email@company.co.zm"
              required
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Freight-specific */}
        {type === "freight" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Origin / Pickup Location</label>
              <input
                type="text"
                value={form.origin}
                onChange={(e) => set("origin", e.target.value)}
                placeholder="e.g. Ndola Industrial Area"
                required
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Destination</label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
                placeholder="e.g. Lusaka CBD Warehouse"
                required
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Estimated Weight (kg)</label>
              <input
                type="number"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Cargo Type</label>
              <select
                value={form.cargoType}
                onChange={(e) => set("cargoType", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              >
                <option value="" className="bg-card">Select cargo type</option>
                <option value="general" className="bg-card">General Goods</option>
                <option value="electronics" className="bg-card">Electronics (Fragile)</option>
                <option value="perishable" className="bg-card">Perishable Goods</option>
                <option value="hazardous" className="bg-card">Hazardous Materials</option>
                <option value="machinery" className="bg-card">Machinery / Equipment</option>
                <option value="personal" className="bg-card">Personal Effects</option>
              </select>
            </div>
          </div>
        )}

        {/* Customs-specific */}
        {type === "customs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Import / Export</label>
              <div className="flex gap-2">
                {["import", "export"].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => set("importExport", opt)}
                    className={`flex-1 text-xs font-semibold py-2.5 rounded-xl border capitalize transition-colors ${
                      form.importExport === opt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-primary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">HS Code (if known)</label>
              <input
                type="text"
                value={form.hsCode}
                onChange={(e) => set("hsCode", e.target.value)}
                placeholder="e.g. 8471.30"
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Invoice Value (USD)</label>
              <input
                type="number"
                value={form.invoiceValue}
                onChange={(e) => set("invoiceValue", e.target.value)}
                placeholder="e.g. 5000"
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}

        {/* Cargo description */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Description of Goods</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the goods, special handling requirements..."
            rows={3}
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Document upload placeholder */}
        <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center gap-2 text-center">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <Upload className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs font-medium text-foreground">Upload Documents</p>
          <p className="text-xs text-muted-foreground">Invoice, packing list, permits — PDF, JPG, PNG</p>
          <button
            type="button"
            className="text-xs text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/10 transition-colors"
          >
            Choose Files
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Request Quote
        </button>
        <p className="text-xs text-muted-foreground text-center">
          We will send a detailed quote within 4 business hours.
        </p>
      </form>
    </div>
  )
}
