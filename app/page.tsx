"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { BottomNav } from "@/components/bottom-nav"
import { HeroSearch } from "@/components/hero-search"
import { ServiceGrid } from "@/components/service-grid"
import { FeaturedVehicles } from "@/components/featured-vehicles"
import { TopTours } from "@/components/top-tours"
import { WhatsAppButton } from "@/components/cta-elements"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { MapPin, Phone, Shield, Clock } from "lucide-react"
import Link from "next/link"

const trustBadges = [
  { icon: Shield, label: "Fully Insured", desc: "All vehicles covered" },
  { icon: Clock, label: "24/7 Service", desc: "Always available" },
  { icon: Phone, label: "Instant Support", desc: "WhatsApp & call" },
  { icon: MapPin, label: "Zambia-Wide", desc: "All major routes" },
]

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <Navbar />

      <main className="min-h-screen pb-20">
        {/* Hero */}
        <section className="relative min-h-[480px] flex items-end pt-14">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Zambia roads and landscape"
              fill
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          </div>

          <div className="relative z-10 w-full max-w-lg mx-auto px-4 pb-10">
            <div className="flex justify-center mb-4">
              <span className="text-xs font-semibold bg-primary/15 text-primary border border-primary/30 rounded-full px-3 py-1">
                Zambia&apos;s Premier Transport Network
              </span>
            </div>
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-foreground leading-tight text-balance mb-3">
              Move Freely.<br />
              <span className="text-primary">Explore Boldly.</span>
            </h1>
            <p className="text-center text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">
              Car rentals, airport transfers, safaris, corporate transport, and freight — all in one platform.
            </p>
            <HeroSearch />
          </div>
        </section>

        {/* Trust badges */}
        <div className="max-w-lg mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-border">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <ServiceGrid />
          <FeaturedVehicles />
          <TopTours />

          {/* Freight CTA */}
          <section className="py-6">
            <div className="bg-primary rounded-2xl p-5 flex flex-col gap-3">
              <div>
                <h2 className="text-base font-bold text-primary-foreground text-balance">
                  Need freight or customs clearance?
                </h2>
                <p className="text-xs text-primary-foreground/80 mt-1 leading-relaxed">
                  We handle cross-border logistics and import/export documentation for businesses across Zambia.
                </p>
              </div>
              <Link
                href="/booking?tab=freight"
                className="self-start bg-primary-foreground text-primary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary-foreground/90 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </section>

          <footer className="border-t border-border py-5 flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="RideNet Solutions" width={80} height={28} className="h-7 w-auto object-contain" />
            </div>
            <p>© 2026 RideNet Solutions. Lusaka, Zambia.</p>
            <div className="flex gap-4">
              <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
              <Link href="/profile" className="hover:text-foreground transition-colors">Profile</Link>
            </div>
          </footer>
        </div>
      </main>

      <WhatsAppButton />
      <BottomNav />
      <AuthGateModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
