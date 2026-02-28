"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Car, Plane, Map, Package } from "lucide-react"
import { RentalsTab } from "@/components/booking/rentals-tab"
import { TransfersTab } from "@/components/booking/transfers-tab"
import { ToursTab } from "@/components/booking/tours-tab"
import { FreightTab } from "@/components/booking/freight-tab"
import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { WhatsAppButton } from "@/components/cta-elements"

const tabs = [
  { id: "rentals", label: "Car Rentals", icon: Car },
  { id: "transfers", label: "Transfers", icon: Plane },
  { id: "tours", label: "Tours & Safaris", icon: Map },
  { id: "freight", label: "Freight & Customs", icon: Package },
]

function BookingContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "rentals"

  return (
    <main className="min-h-screen pt-14 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back + title */}
        <div className="flex items-center gap-3 py-5">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Book a Service</h1>
            <p className="text-xs text-muted-foreground">Select a service type and fill in your details</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 border-b border-border scrollbar-none">
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={`/booking?tab=${t.id}`}
              className={`flex items-center gap-1.5 shrink-0 text-xs font-semibold pb-3 px-1 border-b-2 transition-colors ${
                activeTab === t.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </Link>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "rentals" && <RentalsTab />}
        {activeTab === "transfers" && <TransfersTab />}
        {activeTab === "tours" && <ToursTab />}
        {activeTab === "freight" && <FreightTab />}
      </div>
    </main>
  )
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-14 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
        <BookingContent />
      </Suspense>
      <WhatsAppButton />
    </>
  )
}
