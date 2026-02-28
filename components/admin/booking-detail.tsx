"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  FileText,
  CheckCircle2,
  ChevronRight,
} from "lucide-react"
import { bookings, type Booking, type BookingStatus } from "@/lib/mock-data"

function StatusBadge({ status }: { status: BookingStatus }) {
  const config: Record<BookingStatus, { label: string; classes: string }> = {
    pending: { label: "Pending Review", classes: "bg-accent/15 text-accent border-accent/20" },
    confirmed: { label: "Confirmed", classes: "bg-primary/15 text-primary border-primary/20" },
    completed: { label: "Completed", classes: "bg-muted text-muted-foreground border-border" },
    cancelled: { label: "Cancelled", classes: "bg-destructive/15 text-destructive border-destructive/20" },
  }
  const c = config[status]
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.classes}`}>
      {c.label}
    </span>
  )
}

const drivers = ["Moses Banda", "Peter Lungu", "Grace Mwale", "David Phiri", "Agnes Tembo"]
const vehicleOptions = [
  "Toyota Fortuner (ABK 4521)",
  "Toyota Land Cruiser (ADE 7823)",
  "Toyota Hiace (ABZ 9012)",
  "Mercedes E-Class (ABD 3344)",
  "Ford Ranger (ACF 5678)",
  "Isuzu FRR (ABZ 1290)",
]

type Props = { bookingId: string }

export function BookingDetail({ bookingId }: Props) {
  const router = useRouter()
  const booking = bookings.find((b) => b.id === bookingId)

  const [status, setStatus] = useState<BookingStatus>(booking?.status || "pending")
  const [driver, setDriver] = useState(booking?.assignedDriver || "")
  const [vehicle, setVehicle] = useState(booking?.assignedVehicle || "")
  const [saved, setSaved] = useState(false)

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Booking not found.</p>
        <Link href="/admin/bookings" className="text-primary text-sm hover:underline">
          Back to bookings
        </Link>
      </div>
    )
  }

  const statusFlow: BookingStatus[] = ["pending", "confirmed", "completed"]
  const currentIdx = statusFlow.indexOf(status)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const whatsappMsg = encodeURIComponent(
    `Hi ${booking.customerName}, this is RideNet Solution. Your booking ${booking.reference} for ${booking.serviceType} on ${booking.date} has been ${status}. Thank you!`
  )

  return (
    <div className="max-w-2xl space-y-4">
      {/* Back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">{booking.reference}</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{booking.serviceType}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Customer info */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Customer</h2>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{booking.customerName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{booking.customerEmail}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href={`tel:${booking.customerPhone}`}
                className="flex items-center gap-1.5 text-xs text-foreground bg-muted px-3 py-1.5 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {booking.customerPhone}
              </a>
              <a
                href={`mailto:${booking.customerEmail}`}
                className="flex items-center gap-1.5 text-xs text-foreground bg-muted px-3 py-1.5 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
              <a
                href={`https://wa.me/${booking.customerPhone.replace(/\D/g, "")}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#25D366] bg-[#25D366]/10 px-3 py-1.5 rounded-lg hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service details */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <Car className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Service</p>
              <p className="font-semibold text-foreground">{booking.serviceType}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Details</p>
              <p className="font-medium text-foreground">{booking.serviceDetail}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-semibold text-foreground">{booking.date}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-semibold text-foreground">{booking.time}</p>
            </div>
          </div>
          {booking.pickupLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="font-medium text-foreground">{booking.pickupLocation}</p>
              </div>
            </div>
          )}
          {booking.dropoffLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="font-medium text-foreground">{booking.dropoffLocation}</p>
              </div>
            </div>
          )}
          {booking.flightNumber && (
            <div className="flex items-start gap-2 col-span-2">
              <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">✈</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Flight Number</p>
                <p className="font-semibold text-foreground">{booking.flightNumber}</p>
              </div>
            </div>
          )}
          {booking.groupSize && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Group Size</p>
                <p className="font-semibold text-foreground">{booking.groupSize} people</p>
              </div>
            </div>
          )}
        </div>
        {booking.notes && (
          <div className="bg-muted rounded-xl px-3 py-2.5 mt-1">
            <p className="text-xs text-muted-foreground font-medium mb-1">Notes</p>
            <p className="text-xs text-foreground">{booking.notes}</p>
          </div>
        )}
      </div>

      {/* Assign driver / vehicle */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assign Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Assign Driver</label>
            <select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            >
              <option value="" className="bg-card">Select driver...</option>
              {drivers.map((d) => (
                <option key={d} value={d} className="bg-card">{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Assign Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            >
              <option value="" className="bg-card">Select vehicle...</option>
              {vehicleOptions.map((v) => (
                <option key={v} value={v} className="bg-card">{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status change */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Update Status</h2>
        <div className="flex gap-2">
          {statusFlow.map((s, i) => (
            <button
              key={s}
              disabled={i < currentIdx}
              onClick={() => setStatus(s)}
              className={`flex-1 text-xs font-semibold py-2.5 rounded-xl border capitalize transition-colors ${
                status === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : i < currentIdx
                  ? "bg-muted/30 text-muted-foreground/40 border-border cursor-not-allowed"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  )
}
