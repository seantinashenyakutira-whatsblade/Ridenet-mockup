"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, CalendarDays, HeadphonesIcon, User } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/explore", icon: Compass, label: "Explore" },
  { href: "/bookings", icon: CalendarDays, label: "Bookings" },
  { href: "/support", icon: HeadphonesIcon, label: "Support" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none sm:hidden">
      <div className="flex justify-center mb-1">
        <span className="text-[10px] text-muted-foreground/30 font-medium tracking-tight">Powered by SeanDev</span>
      </div>
      <nav className="bg-card/95 backdrop-blur-md border-t border-border safe-area-inset-bottom pointer-events-auto">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors group relative"
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                >
                  {item.label}
                </span>
                {active && (
                  <span className="absolute -bottom-1 w-4 h-0.5 bg-primary rounded-full transition-all" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
