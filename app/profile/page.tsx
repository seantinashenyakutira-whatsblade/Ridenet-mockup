"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { useState, useEffect } from "react"
import { User, LogOut, Settings, CreditCard, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"

export default function ProfilePage() {
    const { user, loading, userData, signOut, isAdmin } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthGate(true)
        }
    }, [user, loading])

    if (loading) return <div className="p-8 text-center pt-24 text-muted-foreground">Loading profile...</div>

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>

            {!user ? (
                <div className="text-center py-12">
                    <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-lg font-semibold mb-2">You are not signed in</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Sign in to manage your profile and view settings.
                    </p>
                    <button
                        onClick={() => setShowAuthGate(true)}
                        className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                    >
                        Sign In Now
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-2xl">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                            {(userData?.name || "U")[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-foreground">{userData?.name || "User"}</h2>
                            <p className="text-sm text-muted-foreground">{userData?.phone || userData?.email || "No contact info"}</p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                        {isAdmin && (
                            <Link href="/admin" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-rose-500">Admin Dashboard</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </Link>
                        )}

                        <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-foreground">Settings</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </Link>

                        <Link href="/transactions" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-foreground">Transactions</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </Link>
                    </div>

                    <button
                        onClick={signOut}
                        className="w-full flex items-center justify-center gap-2 bg-rose-500/10 text-rose-500 font-bold py-3 rounded-xl hover:bg-rose-500/20 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
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
