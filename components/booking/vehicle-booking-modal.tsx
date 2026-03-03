"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Fuel, Settings2, X, MapPin, Calendar } from "lucide-react"
import { type Vehicle } from "@/lib/mock-data"
import { useAuth } from "@/lib/AuthContext"
import { useRouter } from "next/navigation"
import { LocationPicker } from "@/components/ui/location-picker"

interface VehicleBookingModalProps {
    vehicle: Vehicle
    onClose: () => void
}

function daysBetween(a: string, b: string): number {
    if (!a || !b) return 0
    const diff = new Date(b).getTime() - new Date(a).getTime()
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function VehicleBookingModal({ vehicle, onClose }: VehicleBookingModalProps) {
    const router = useRouter()
    const { userData } = useAuth()
    const [pickerOpen, setPickerOpen] = useState(false)
    const [form, setForm] = useState({
        name: userData?.name || "",
        phone: userData?.phone || "",
        pickupDate: "",
        dropoffDate: "",
        pickupLocation: ""
    })

    const days = daysBetween(form.pickupDate, form.dropoffDate)
    const total = vehicle.pricePerDay * days

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams({
            type: "Car Rental",
            detail: `${vehicle.name} – ${days} day${days > 1 ? "s" : ""}`,
            date: form.pickupDate,
            name: form.name,
            vehicle: vehicle.id,
        })
        onClose()
        router.push(`/confirmation?${params.toString()}`)
    }

    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
                <div className="relative w-full max-w-md bg-card border border-border rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col animate-in slide-in-from-bottom duration-300">
                    {/* Close */}
                    <button onClick={onClose} className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    <div className="overflow-y-auto">
                        {/* Vehicle hero */}
                        <div className="relative h-48 md:h-52">
                            <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                                    {vehicle.category}
                                </span>
                                <p className="text-xl md:text-2xl font-bold text-white">{vehicle.name}</p>
                                <p className="text-sm text-white/80">{vehicle.brand}</p>
                            </div>
                        </div>

                        {/* Specs + pricing */}
                        <div className="px-5 py-4 border-b border-border bg-muted/20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{vehicle.seats} seats</span>
                                    <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" />{vehicle.transmission}</span>
                                    <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" />{vehicle.fuel}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-primary">ZMW {vehicle.pricePerDay}</span>
                                    <span className="text-[10px] text-muted-foreground block">per day</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {vehicle.features.map(f => (
                                    <span key={f} className="text-[10px] font-medium bg-muted text-foreground border border-border rounded-full px-2.5 py-0.5">{f}</span>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <p className="text-sm font-bold text-foreground">Booking Information</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Full Name</label>
                                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="John Doe" className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                                </div>

                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Phone Number</label>
                                    <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                        placeholder="+260 97 000 0000" className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                                </div>

                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Pickup Location</label>
                                    <button
                                        type="button"
                                        onClick={() => setPickerOpen(true)}
                                        className="w-full flex items-center gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-left hover:border-primary/50 transition-colors"
                                    >
                                        <MapPin className={`w-4 h-4 ${form.pickupLocation ? "text-primary" : "text-muted-foreground"}`} />
                                        <span className={form.pickupLocation ? "text-foreground" : "text-muted-foreground"}>
                                            {form.pickupLocation || "Select pickup location..."}
                                        </span>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Pickup Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input required type="date" value={form.pickupDate} min={new Date().toISOString().split("T")[0]}
                                            onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))}
                                            className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Return Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input required type="date" value={form.dropoffDate} min={form.pickupDate || new Date().toISOString().split("T")[0]}
                                            onChange={e => setForm(f => ({ ...f, dropoffDate: e.target.value }))}
                                            className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Price summary */}
                            {days > 0 && (
                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex justify-between items-center transition-all animate-in zoom-in-95 duration-200">
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total for {days} day{days > 1 ? "s" : ""}</p>
                                        <p className="text-xl font-black text-primary">ZMW {total}</p>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground text-right leading-tight">
                                        Inc. insurance<br />& local taxes
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 text-sm tracking-wide">
                                RESERVE NOW
                            </button>
                            <p className="text-center text-[10px] text-muted-foreground pt-1">No upfront payment required today.</p>
                        </form>
                    </div>
                </div>
            </div>

            <LocationPicker
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={(loc) => {
                    setForm(f => ({ ...f, pickupLocation: loc }))
                    setPickerOpen(false)
                }}
                title="Pickup Location"
            />
        </>
    )
}
