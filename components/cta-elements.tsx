"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"

const WHATSAPP_NUMBER = "260971234567"
const WHATSAPP_MSG = encodeURIComponent("Hi RideNet! I'd like to make a booking.")

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-[#20BD5C] transition-colors"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span>WhatsApp Support</span>
    </a>
  )
}

export function StickyBookingCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground">Ready to ride?</p>
        <p className="text-xs text-muted-foreground">Book any service in 2 minutes</p>
      </div>
      <Link
        href="/booking"
        className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shrink-0"
      >
        Request Booking
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
