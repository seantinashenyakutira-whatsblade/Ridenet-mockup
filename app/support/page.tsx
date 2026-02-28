"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import { useState } from "react"
import { MessageCircle, Mail, Phone } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"
import dynamic from "next/dynamic"

const SupportChatWidget = dynamic(() => import("@/components/SupportChatWidget"), {
    ssr: false,
    loading: () => (
        <div className="bg-card border border-border rounded-2xl h-[480px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground animate-pulse">Loading AI Support...</p>
        </div>
    ),
})

export default function SupportPage() {
    const { user } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-2">Support</h1>
                <p className="text-sm text-muted-foreground mb-6">We&apos;re here to help 24/7. Reach out any way you prefer.</p>

                {/* ── AI CHAT WIDGET ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-lg font-bold text-foreground">Chat with RideNet Support Bot</h2>
                        <span className="text-[10px] font-semibold bg-accent/20 text-accent px-2 py-0.5 rounded-full">AI</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                        Ask about pricing, bookings, or services. For anything outside our knowledge base, the bot will direct you to our team.
                    </p>
                    <SupportChatWidget />
                </div>

                {/* Contact cards */}
                <div className="space-y-3 mb-8">
                    <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent/10 p-3 rounded-full text-accent">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">WhatsApp Us</h3>
                                <p className="text-sm text-muted-foreground">Fastest reply · +260 77 695 0796</p>
                            </div>
                        </div>
                        <a href="https://wa.me/260776950796" target="_blank" rel="noreferrer"
                            className="text-white font-bold text-sm bg-accent hover:bg-accent/80 transition-colors px-4 py-2 rounded-xl">
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
                                <p className="text-sm text-muted-foreground">24/7 available · +260 77 695 0796</p>
                            </div>
                        </div>
                        <a href="tel:+260776950796"
                            className="text-accent font-bold text-sm border border-accent/40 bg-accent/10 hover:bg-accent/20 transition-colors px-4 py-2 rounded-xl">
                            Call
                        </a>
                    </div>

                    <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-muted p-3 rounded-full text-muted-foreground">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Email Us</h3>
                                <p className="text-sm text-muted-foreground">info@ridenetzm.com</p>
                            </div>
                        </div>
                        <a href="mailto:info@ridenetzm.com"
                            className="text-foreground font-bold text-sm bg-muted hover:bg-muted/70 transition-colors px-4 py-2 rounded-xl">
                            Email
                        </a>
                    </div>
                </div>
            </div>

            <BottomNav />
            <ChatBot />
            {showAuthGate && (
                <AuthGateModal open={showAuthGate} onClose={() => setShowAuthGate(false)} />
            )}
        </div>
    )
}
