"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Trophy,
  DollarSign,
  MessageCircle,
  Eye,
  ChevronRight,
} from "lucide-react"
import { bookings, kpiData, type Booking, type BookingStatus } from "@/lib/mock-data"

function statusConfig(status: BookingStatus) {
  switch (status) {
    case "pending":
      return { label: "Pending", classes: "bg-accent/15 text-accent border-accent/20" }
    case "confirmed":
      return { label: "Confirmed", classes: "bg-primary/15 text-primary border-primary/20" }
    case "completed":
      return { label: "Completed", classes: "bg-muted text-muted-foreground border-border" }
    case "cancelled":
      return { label: "Cancelled", classes: "bg-destructive/15 text-destructive border-destructive/20" }
  }
}

const kpiCards = [
  {
    label: "New Leads",
    value: kpiData.newLeads,
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
    trend: "+3 today",
  },
  {
    label: "Pending",
    value: kpiData.pending,
    icon: Clock,
    color: "text-accent",
    bg: "bg-accent/10",
    trend: "Needs action",
  },
  {
    label: "Confirmed",
    value: kpiData.confirmed,
    icon: CheckCircle2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    trend: "This week",
  },
  {
    label: "Completed",
    value: kpiData.completed,
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    trend: "This month",
  },
]

export function AdminDashboard() {
  const [bookingList, setBookingList] = useState<Booking[]>(bookings)

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookingList((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const WHATSAPP_BASE = "https://wa.me/"

  return (
    <div className="space-y-6 max-w-6xl">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{k.trend}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue card */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Monthly Revenue</p>
            <p className="text-xl font-bold text-foreground">
              ${kpiData.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            +{kpiData.monthlyGrowth}%
          </div>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </div>
      </div>

      {/* Bookings table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Recent Bookings & Leads</h2>
          <Link href="/admin/bookings" className="text-xs text-primary hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Ref</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Customer</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Service</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Date</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((b, i) => {
                const sc = statusConfig(b.status)
                return (
                  <tr key={b.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors`}>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-primary">{b.reference}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-foreground">{b.customerName}</p>
                      <p className="text-xs text-muted-foreground">{b.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-foreground">{b.serviceType}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">{b.serviceDetail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-foreground">{b.date}</p>
                      <p className="text-xs text-muted-foreground">{b.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${sc.classes}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        {b.status === "pending" && (
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        <a
                          href={`https://wa.me/${b.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${b.customerName}, this is RideNet confirming your booking ${b.reference}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(b.id, "completed")}
                            className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-lg hover:text-foreground transition-colors"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {bookingList.map((b) => {
            const sc = statusConfig(b.status)
            return (
              <div key={b.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-primary">{b.reference}</span>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{b.customerName}</p>
                    <p className="text-xs text-muted-foreground">{b.serviceType} — {b.date}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${sc.classes}`}>
                    {sc.label}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="flex-1 text-center text-xs font-medium bg-muted text-muted-foreground py-1.5 rounded-lg hover:text-foreground transition-colors"
                  >
                    View
                  </Link>
                  {b.status === "pending" && (
                    <button
                      onClick={() => updateStatus(b.id, "confirmed")}
                      className="flex-1 text-xs font-semibold bg-primary/10 text-primary py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${b.customerPhone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 flex items-center justify-center bg-[#25D366]/15 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
