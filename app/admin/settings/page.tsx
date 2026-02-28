"use client"

import { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Bell,
  CheckCircle2,
  MessageCircle,
  Save,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    businessName: "RideNet Solution",
    tagline: "Transport, Tours & Logistics — Zambia",
    phone: "+260 97 123 4567",
    whatsapp: "260971234567",
    email: "info@ridenet.co.zm",
    address: "Plot 12, Cairo Road, Lusaka, Zambia",
    website: "https://ridenet.co.zm",
    confirmationEmail: true,
    confirmationWhatsApp: true,
    notifyAdmin: true,
    autoReplyMsg:
      "Hi! Thank you for choosing RideNet Solution. We have received your booking request and will confirm within 2 hours. Reference: {ref}",
  })

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AdminLayout activeHref="/admin/settings">
      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your business profile and notification preferences</p>
        </div>

        {/* Business profile */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Business Name</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Number
              </label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="e.g. 260971234567"
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-1">Digits only, no + or spaces. Used for wa.me links.</p>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Website
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="col-span-full">
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Business Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5" /> Notification Settings
          </h2>

          <div className="space-y-3">
            {[
              {
                key: "confirmationEmail",
                label: "Send confirmation email to customer",
                desc: "Auto-send booking confirmation on status change",
              },
              {
                key: "confirmationWhatsApp",
                label: "Send WhatsApp message to customer",
                desc: "Template message sent via WhatsApp when confirmed",
              },
              {
                key: "notifyAdmin",
                label: "Notify admin on new booking",
                desc: "Send alert to admin WhatsApp when a new request comes in",
              },
            ].map((n) => (
              <label
                key={n.key}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <button
                  type="button"
                  role="switch"
                  aria-checked={form[n.key as keyof typeof form] as boolean}
                  onClick={() => set(n.key, !form[n.key as keyof typeof form])}
                  className={`mt-0.5 relative shrink-0 w-9 h-5 rounded-full border transition-colors ${
                    form[n.key as keyof typeof form]
                      ? "bg-primary border-primary"
                      : "bg-muted border-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      form[n.key as keyof typeof form] ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
                <div>
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Auto-reply message */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Auto-Reply Message</h2>
            <p className="text-xs text-muted-foreground mt-1">Sent to customers after booking. Use {"{ref}"} for the reference number.</p>
          </div>
          <textarea
            value={form.autoReplyMsg}
            onChange={(e) => set("autoReplyMsg", e.target.value)}
            rows={4}
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </button>
      </form>
    </AdminLayout>
  )
}
