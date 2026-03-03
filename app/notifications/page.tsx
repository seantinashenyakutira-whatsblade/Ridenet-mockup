"use client"

import { BottomNav } from "@/components/bottom-nav"
import { Navbar } from "@/components/navbar"
import { useNotifications } from "@/lib/notification-store"
import { Bell, CheckCircle2, Info, AlertTriangle, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
    const { notifications, markAsRead, markAllAsRead } = useNotifications()
    const router = useRouter()

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />
            default: return <Info className="w-5 h-5 text-blue-500" />
        }
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-24">
            <Navbar />

            <div className="max-w-lg mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-primary font-semibold hover:underline"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">All caught up!</h2>
                        <p className="text-sm text-muted-foreground mt-1">No new notifications to show.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => markAsRead(n.id)}
                                className={`group p-4 rounded-2xl border transition-all cursor-pointer ${n.read
                                        ? "bg-card/50 border-border opacity-70"
                                        : "bg-card border-primary/20 shadow-lg shadow-primary/5"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.read ? "bg-muted" : "bg-primary/10"
                                        }`}>
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h3 className={`text-sm font-bold truncate ${n.read ? "text-muted-foreground" : "text-foreground"}`}>
                                                {n.title}
                                            </h3>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                            {n.message}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* System Placeholder Info */}
                <div className="mt-10 p-4 bg-muted/50 rounded-2xl border border-dashed border-border text-center">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2">System Note</p>
                    <p className="text-[11px] text-muted-foreground italic">
                        Real-time push notifications are simulated for this prototype. In production, these would connect to Firebase Cloud Messaging.
                    </p>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
