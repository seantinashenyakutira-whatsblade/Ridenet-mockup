import Link from "next/link"
import {
  Car,
  Plane,
  Map,
  Tent,
  Briefcase,
  PartyPopper,
  Package,
  FileCheck,
} from "lucide-react"

const services = [
  {
    icon: Car,
    label: "Car Rentals",
    desc: "Self-drive & chauffeur options",
    href: "/booking?tab=rentals",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Plane,
    label: "Airport Transfers",
    desc: "Meet & greet, all airports",
    href: "/booking?tab=transfers",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Map,
    label: "City Tours",
    desc: "Guided Lusaka & beyond",
    href: "/booking?tab=tours",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Tent,
    label: "Safari Arrangements",
    desc: "National parks, full packages",
    href: "/booking?tab=tours",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Briefcase,
    label: "Corporate Transport",
    desc: "Fleet solutions & accounts",
    href: "/booking?tab=transfers",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: PartyPopper,
    label: "Event Transportation",
    desc: "Weddings, conferences & more",
    href: "/booking?tab=transfers",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Package,
    label: "Freight Forwarding",
    desc: "Domestic & cross-border",
    href: "/booking?tab=freight",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: FileCheck,
    label: "Customs Clearance",
    desc: "Import & export docs",
    href: "/booking?tab=freight",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
]

export function ServiceGrid() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground">Our Services</h2>
        <Link href="/booking" className="text-xs text-primary font-medium hover:underline">
          Book any service
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {services.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-card border border-border rounded-xl p-4 flex flex-col gap-2.5 hover:border-primary/50 hover:bg-card/80 transition-all duration-200"
          >
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {s.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
