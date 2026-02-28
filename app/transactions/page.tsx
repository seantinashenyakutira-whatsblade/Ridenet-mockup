"use client"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/AuthContext"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen pb-24 bg-background px-4 pt-6">
            <div className="flex items-center mb-6">
                <Link href="/profile" className="mr-4">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Transactions</h1>
            </div>

            <div className="space-y-4">
                {user ? (
                    <>
                        <div className="bg-card border border-border p-4 rounded-2xl flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-foreground">Toyota Hilux Booking</h3>
                                <p className="text-xs text-muted-foreground mt-1">28 Feb 2026, 10:30 AM</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-base">ZMW 1,500</p>
                                <span className="text-xs text-amber-500 bg-amber-500/10 px-2 rounded-full">Pending</span>
                            </div>
                        </div>

                        <div className="bg-card border border-border p-4 rounded-2xl flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-foreground">Airport Transfer</h3>
                                <p className="text-xs text-muted-foreground mt-1">20 Feb 2026, 08:15 AM</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-base">ZMW 450</p>
                                <span className="text-xs text-green-500 bg-green-500/10 px-2 rounded-full">Paid</span>
                            </div>
                        </div>

                        <div className="bg-card border border-border p-4 rounded-2xl flex justify-between items-center opacity-70">
                            <div>
                                <h3 className="font-semibold text-foreground">Nissan X-Trail</h3>
                                <p className="text-xs text-muted-foreground mt-1">10 Jan 2026, 02:00 PM</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-base">ZMW 950</p>
                                <span className="text-xs text-rose-500 bg-rose-500/10 px-2 rounded-full">Failed</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-muted-foreground mt-10">Sign in to view transaction history.</p>
                )}
            </div>

            <BottomNav />
        </div>
    )
}
