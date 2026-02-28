"use client"
import Link from "next/link"
import { ChevronLeft, Save } from "lucide-react"

export default function AdminPricing() {
    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-24">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href="/admin" className="mr-4">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Pricing Rules</h1>
                </div>
                <button className="bg-primary text-primary-foreground p-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-card border border-border p-5 rounded-2xl">
                    <h2 className="font-bold mb-4">Base Multipliers</h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <label className="text-muted-foreground text-xs mb-1 block">Weekend Markup (%)</label>
                            <input type="number" defaultValue="15" className="w-full bg-input border border-border rounded-xl px-4 py-2" />
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs mb-1 block">Seasonal Markup (%) - Peak</label>
                            <input type="number" defaultValue="25" className="w-full bg-input border border-border rounded-xl px-4 py-2" />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border p-5 rounded-2xl">
                    <h2 className="font-bold mb-4">Add-on Fees (ONLY ZMW)</h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <label className="text-muted-foreground text-xs mb-1 block">Child Seat</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">ZMW</span>
                                <input type="number" defaultValue="150" className="w-full bg-input border border-border rounded-xl pl-12 pr-4 py-2" />
                            </div>
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs mb-1 block">Additional Driver</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">ZMW</span>
                                <input type="number" defaultValue="200" className="w-full bg-input border border-border rounded-xl pl-12 pr-4 py-2" />
                            </div>
                        </div>
                        <div>
                            <label className="text-muted-foreground text-xs mb-1 block">GPS Navigation</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">ZMW</span>
                                <input type="number" defaultValue="100" className="w-full bg-input border border-border rounded-xl pl-12 pr-4 py-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
