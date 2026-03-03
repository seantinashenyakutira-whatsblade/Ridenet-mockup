"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import {
    User,
    LogOut,
    Settings,
    CreditCard,
    ChevronRight,
    CalendarDays,
    Package,
    MapPin,
    Clock
} from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"
import { Navbar } from "@/components/navbar"
import { bookings } from "@/lib/mock-data"

export default function BookingsPage() {
    const { user, loading } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthGate(true)
        }
    }, [user, loading])

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500/10 text-emerald-500'
            case 'confirmed': return 'bg-blue-500/10 text-blue-500'
            case 'cancelled': return 'bg-rose-500/10 text-rose-500'
            default: return 'bg-amber-500/10 text-amber-500'
        }
    }

    if (loading) return <div className="p-8 text-center pt-24 animate-pulse">Loading bookings...</div>

    return (
        <div className="min-h-screen pb-32 bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-24">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black tracking-tight">Your Trips</h1>
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-primary" />
                    </div>
                </div>

                {!user ? (
                    <div className="text-center py-20 bg-card border border-border rounded-[2.5rem] shadow-xl">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Sign in to view</h2>
                        <p className="text-sm text-muted-foreground mb-8 max-w-[240px] mx-auto leading-relaxed">
                            Track your rentals, transfers, and safaris in one place.
                        </p>
                        <button
                            onClick={() => setShowAuthGate(true)}
                            className="bg-primary text-primary-foreground font-black text-sm px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            SIGN IN
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="group bg-card border border-border rounded-3xl p-5 shadow-sm hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                                            {booking.serviceType}
                                        </p>
                                        <h3 className="text-base font-black text-foreground tracking-tight leading-tight">
                                            {booking.serviceDetail}
                                        </h3>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${getStatusStyles(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at {booking.time}
                                    </div>
                                    {(booking.pickupLocation || booking.serviceDetail.includes('→')) && (
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span className="truncate">{booking.pickupLocation || booking.serviceDetail.split('—')[0]}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between relative z-10">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">#{booking.reference}</p>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}

                        {(bookings.length === 0) && (
                            <div className="text-center py-20 text-muted-foreground">
                                <p className="text-sm font-bold">No bookings yet.</p>
                                <Link href="/booking" className="text-primary text-xs font-bold hover:underline mt-2 inline-block">Book your first trip →</Link>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <BottomNav />
            <ChatBot />
            {showAuthGate && (
                <AuthGateModal open={showAuthGate} onClose={() => setShowAuthGate(false)} />
            )}
        </div>
    )
}
