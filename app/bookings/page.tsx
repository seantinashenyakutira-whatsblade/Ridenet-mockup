"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { useState, useEffect } from "react"
import { CalendarDays, Package } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"

export default function BookingsPage() {
    const { user, loading } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthGate(true)
        }
    }, [user, loading])

    if (loading) return <div className="p-8 text-center">Loading...</div>

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>

            {!user ? (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Sign in to view bookings</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Track your trips, rentals, and payments in one place.
                    </p>
                    <button
                        onClick={() => setShowAuthGate(true)}
                        className="bg-accent text-white font-semibold px-6 py-2 rounded-xl hover:bg-accent/80 transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-card border border-border rounded-xl p-4">
                        <h3 className="font-semibold mb-1">Toyota Hilux - 3 Days</h3>
                        <p className="text-sm text-muted-foreground">Status: Pending</p>
                    </div>
                </div>
            )}

            <BottomNav />
            <ChatBot />
            {showAuthGate && (
                <AuthGateModal open={showAuthGate} onClose={() => setShowAuthGate(false)} />
            )}
        </div>
    )
}
