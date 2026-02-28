"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { useState, useEffect } from "react"
import { HeadphonesIcon, MessageCircle, Mail, Phone } from "lucide-react"

export default function SupportPage() {
    const { user } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <h1 className="text-2xl font-bold mb-6">Support</h1>

            <div className="space-y-6">
                <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">WhatsApp Us</h3>
                            <p className="text-sm text-muted-foreground">Fastest reply</p>
                        </div>
                    </div>
                    <a href="https://wa.me/260776950796" target="_blank" rel="noreferrer" className="text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl">
                        Chat
                    </a>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Call Support</h3>
                            <p className="text-sm text-muted-foreground">24/7 available</p>
                        </div>
                    </div>
                    <a href="tel:+260776950796" className="text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl">
                        Call
                    </a>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Email Us</h3>
                            <p className="text-sm text-muted-foreground">For complex queries</p>
                        </div>
                    </div>
                    <a href="mailto:info@ridenetzm.com" className="text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl">
                        Email
                    </a>
                </div>

            </div>

            <BottomNav />
            {showAuthGate && (
                <AuthGateModal open={showAuthGate} onClose={() => setShowAuthGate(false)} />
            )}
        </div>
    )
}
