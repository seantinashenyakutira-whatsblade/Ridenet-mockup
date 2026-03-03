"use client"

import { useState, useEffect, useRef } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { AuthGateModal } from "@/components/auth-gate-modal"
import {
    User,
    LogOut,
    Settings,
    CreditCard,
    ChevronRight,
    Camera,
    CalendarDays,
    ShieldCheck,
    Bell,
    Headphones,
    LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"
import { Navbar } from "@/components/navbar"
import Image from "next/image"

export default function ProfilePage() {
    const { user, loading, userData, signOut, isAdmin } = useAuth()
    const [showAuthGate, setShowAuthGate] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthGate(true)
        }
        // Load saved image from localStorage
        const savedImg = localStorage.getItem("ridenet_profile_img")
        if (savedImg) setProfileImage(savedImg)
    }, [user, loading])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                setProfileImage(base64String)
                localStorage.setItem("ridenet_profile_img", base64String)
            }
            reader.readAsDataURL(file)
        }
    }

    if (loading) return <div className="p-8 text-center pt-24 text-muted-foreground animate-pulse">Loading profile...</div>

    return (
        <div className="min-h-screen pb-32 bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-24">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black tracking-tight">Account</h1>
                    <Link href="/notifications" className="relative w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors">
                        <Bell className="w-5 h-5 text-foreground" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                    </Link>
                </div>

                {!user ? (
                    <div className="text-center py-20 bg-card border border-border rounded-[2.5rem] shadow-xl">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Welcome to RideNet</h2>
                        <p className="text-sm text-muted-foreground mb-8 max-w-[240px] mx-auto leading-relaxed">
                            Sign in to manage your bookings, profile and saved payments.
                        </p>
                        <button
                            onClick={() => setShowAuthGate(true)}
                            className="bg-primary text-primary-foreground font-black text-sm px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            SIGN IN NOW
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Profile Header */}
                        <div className="relative bg-card border border-border p-6 rounded-[2.5rem] shadow-lg shadow-primary/5 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/10 transition-colors" />

                            <div className="flex items-center gap-5">
                                <div className="relative group/avatar">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center transition-transform group-hover/avatar:scale-105 duration-300">
                                        {profileImage ? (
                                            <Image src={profileImage} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <span className="text-3xl font-black text-primary">
                                                {(userData?.name || "U")[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg border-2 border-card hover:scale-110 active:scale-90 transition-all"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-foreground tracking-tight">{userData?.name || "Member"}</h2>
                                    <p className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                        {isAdmin ? "ADMIN ACCOUNT" : "SILVER MEMBER"}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2 font-medium">{userData?.phone || userData?.email || "No contact info"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4 mb-2">My Activity</p>
                            <div className="bg-card border border-border rounded-[2rem] overflow-hidden divide-y divide-border">
                                <Link href="/bookings" className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500 shadow-sm shadow-blue-500/10">
                                            <CalendarDays className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">My Bookings</p>
                                            <p className="text-[10px] text-muted-foreground">Manage your reservations</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                                </Link>

                                <Link href="/transactions" className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-500 shadow-sm shadow-emerald-500/10">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Payment Methods</p>
                                            <p className="text-[10px] text-muted-foreground">Manage cards & wallet</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                                </Link>

                                {isAdmin && (
                                    <Link href="/admin" className="flex items-center justify-between p-5 hover:bg-rose-500/5 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-rose-500/10 p-2.5 rounded-xl text-rose-500 shadow-sm shadow-rose-500/10 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                                <LayoutDashboard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-rose-500">Admin Control</p>
                                                <p className="text-[10px] text-muted-foreground">Fleet & user management</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-rose-500/50" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4 mb-2">Preferrences</p>
                            <div className="bg-card border border-border rounded-[2rem] overflow-hidden divide-y divide-border">
                                <Link href="/settings" className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-500 shadow-sm shadow-amber-500/10">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">App Settings</p>
                                            <p className="text-[10px] text-muted-foreground">Notifications & display</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                                </Link>

                                <Link href="/support" className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-500/10 p-2.5 rounded-xl text-purple-500 shadow-sm shadow-purple-500/10">
                                            <Headphones className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Help & Support</p>
                                            <p className="text-[10px] text-muted-foreground">Get assistance 24/7</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                                </Link>

                                <div className="flex items-center justify-between p-5 bg-primary/5">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-xl text-primary shadow-sm shadow-primary/10">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Verified Account</p>
                                            <p className="text-[10px] text-muted-foreground">Identity confirmed</p>
                                        </div>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={signOut}
                            className="w-full flex items-center justify-center gap-3 bg-rose-500/5 text-rose-500 font-black text-sm py-5 rounded-[2rem] border border-rose-500/10 hover:bg-rose-500/10 transition-all active:scale-[0.98]"
                        >
                            <LogOut className="w-5 h-5" />
                            SECURE SIGN OUT
                        </button>

                        <div className="text-center pt-10">
                            <Image src="/images/logo.png" alt="RideNet" width={100} height={35} className="mx-auto grayscale opacity-30 mb-2" />
                            <p className="text-[10px] text-muted-foreground tracking-widest font-bold">App Version 1.2.0 (SeanDev)</p>
                        </div>
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
