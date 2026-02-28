import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings2, Star } from "lucide-react"
import { vehicles } from "@/lib/mock-data"

export function FeaturedVehicles() {
  const featured = vehicles.slice(0, 4)

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground">Featured Vehicles</h2>
        <Link href="/booking?tab=rentals" className="text-xs text-primary font-medium hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {featured.map((v, index) => (
          <div
            key={v.id}
            className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-200"
          >
            {/* Vehicle image */}
            <div className="relative h-40 bg-muted overflow-hidden">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {!v.available && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <span className="text-xs font-semibold text-muted-foreground border border-border rounded-full px-3 py-1">
                    Unavailable
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs font-bold text-primary">${v.pricePerDay}/day</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground leading-tight">{v.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{v.brand}</p>

              <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {v.seats} seats
                </span>
                <span className="flex items-center gap-1">
                  <Settings2 className="w-3.5 h-3.5" />
                  {v.transmission}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="w-3.5 h-3.5" />
                  {v.fuel}
                </span>
              </div>

              <Link
                href={v.available ? `/booking?tab=rentals&vehicle=${v.id}` : "#"}
                className={`mt-3 w-full block text-center text-xs font-semibold py-2 rounded-lg transition-colors ${
                  v.available
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {v.available ? "Reserve" : "Unavailable"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
