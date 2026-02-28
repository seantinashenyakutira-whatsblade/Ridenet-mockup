"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { useState } from "react"
import { Moon, Sun, Globe, Bell, Wallet, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const { user } = useAuth()

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <div className="flex items-center mb-6">
                <Link href="/profile" className="mr-4">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <span className="font-semibold text-foreground">Dark Mode</span>
                        </div>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Bell className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-foreground">Notifications</span>
                        </div>
                        <span className="text-xs text-muted-foreground mr-1">Enabled</span>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Globe className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-foreground">Language</span>
                        </div>
                        <span className="text-sm font-medium">English</span>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-foreground">Currency</span>
                        </div>
                        <span className="text-sm font-medium">ZMW (Kwacha)</span>
                    </div>

                </div>
            </div>

            <BottomNav />
        </div>
    )
}
