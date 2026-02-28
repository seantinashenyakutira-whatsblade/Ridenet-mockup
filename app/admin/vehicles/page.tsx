"use client"
import Link from "next/link"
import { ChevronLeft, Plus, Car } from "lucide-react"
import { useState } from "react"

export default function AdminVehicles() {
    const [vehicles, setVehicles] = useState([
        { id: 1, name: "Toyota Hilux 4x4", seats: 5, trans: "Manual", priceZMW: 1500, available: true },
        { id: 2, name: "Nissan X-Trail", seats: 5, trans: "Automatic", priceZMW: 1200, available: true },
        { id: 3, name: "Toyota Prado", seats: 7, trans: "Automatic", priceZMW: 2500, available: false },
    ])

    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-24">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href="/admin" className="mr-4">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Manage Vehicles</h1>
                </div>
                <button className="bg-primary text-primary-foreground p-2 rounded-xl">
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                {vehicles.map(v => (
                    <div key={v.id} className="bg-card border border-border p-4 rounded-2xl flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Car className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{v.name}</h3>
                                <p className="text-xs text-muted-foreground">{v.seats} Seats • {v.trans}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">ZMW {v.priceZMW}<span className="text-[10px] text-muted-foreground font-normal">/day</span></p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${v.available ? 'bg-green-500/10 text-green-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {v.available ? 'Available' : 'Booked'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
