"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Bell, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useNotifications } from "@/lib/notification-store"
import { useTheme } from "next-themes"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 inset-x-0 z-[60] bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="RideNet Solutions"
            width={200}
            height={60}
            className="h-12 sm:h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Notification Bell */}
          <Link
            href="/notifications"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-background animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Book Now - Desktop & Tablet */}
          <Link
            href="/booking?tab=rentals"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground text-sm font-black px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20 uppercase tracking-tight"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Book Now - Mobile */}
          <Link
            href="/booking?tab=rentals"
            className="sm:hidden flex items-center justify-center bg-primary text-primary-foreground px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Book</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
