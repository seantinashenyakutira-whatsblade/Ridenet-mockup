"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MessageCircle, CheckCircle2 } from "lucide-react"
import { bookings, type Booking, type BookingStatus } from "@/lib/mock-data"
import { AdminLayout } from "@/components/admin/admin-layout"

function statusConfig(status: BookingStatus) {
  switch (status) {
    case "pending": return { label: "Pending", classes: "bg-accent/15 text-accent border-accent/20" }
    case "confirmed": return { label: "Confirmed", classes: "bg-primary/15 text-primary border-primary/20" }
    case "completed": return { label: "Completed", classes: "bg-muted text-muted-foreground border-border" }
    case "cancelled": return { label: "Cancelled", classes: "bg-destructive/15 text-destructive border-destructive/20" }
  }
}

const statusFilters: (BookingStatus | "all")[] = ["all", "pending", "confirmed", "completed"]

export default function BookingsPage() {
  const [list, setList] = useState<Booking[]>(bookings)
  const [filter, setFilter] = useState<BookingStatus | "all">("all")
  const [search, setSearch] = useState("")

  const filtered = list.filter((b) => {
    const matchStatus = filter === "all" || b.status === filter
    const matchSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const updateStatus = (id: string, status: BookingStatus) => {
    setList((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  return (
    <AdminLayout activeHref="/admin/bookings">
      <div className="max-w-6xl space-y-4">
        <div>
          <h1 className="text-lg font-bold text-foreground">Bookings & Leads</h1>
          <p className="text-xs text-muted-foreground mt-0.5">All incoming requests and bookings</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, reference, service..."
            className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 text-xs font-semibold px-3 py-2 rounded-xl border capitalize transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table — desktop */}
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                    No bookings match your filter.
                  </td>
                </tr>
              )}
              {filtered.map((b) => {
                const sc = statusConfig(b.status)
                return (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
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
                          href={`https://wa.me/${b.customerPhone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
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
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No bookings match your filter.</p>
          )}
          {filtered.map((b) => {
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
                    className="flex-1 text-center text-xs font-medium bg-muted text-muted-foreground py-2 rounded-lg hover:text-foreground transition-colors"
                  >
                    View
                  </Link>
                  {b.status === "pending" && (
                    <button
                      onClick={() => updateStatus(b.id, "confirmed")}
                      className="flex-1 text-xs font-semibold bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${b.customerPhone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 flex items-center justify-center bg-[#25D366]/15 text-[#25D366] rounded-lg"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
