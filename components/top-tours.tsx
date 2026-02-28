import Image from "next/image"
import Link from "next/link"
import { Clock, Star, Users } from "lucide-react"
import { tours } from "@/lib/mock-data"

export function TopTours() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground">Top Tours & Safaris</h2>
        <Link href="/booking?tab=tours" className="text-xs text-primary font-medium hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tours.map((t, index) => (
          <div
            key={t.id}
            className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-200"
          >
            {/* Tour image */}
            <div className="relative h-44 bg-muted overflow-hidden">
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              {/* Badge */}
              {t.badge && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="absolute bottom-2 left-3">
                <span className="text-xs text-muted-foreground">From</span>
                <p className="text-sm font-bold text-foreground">${t.fromPrice}</p>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground leading-tight text-pretty">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.destination}</p>

              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {t.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {t.groupSize}
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  {t.rating}
                </span>
              </div>

              <Link
                href={`/booking?tab=tours&tour=${t.id}`}
                className="mt-3 w-full block text-center text-xs font-semibold py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Reserve
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
