"use client"

import { useState } from "react"
import { X, Save, Trash2, Camera, Check, AlertCircle } from "lucide-react"
import { type Vehicle } from "@/lib/mock-data"
import Image from "next/image"

interface VehicleEditModalProps {
    vehicle: Vehicle
    onClose: () => void
    onSave: (updated: Vehicle) => void
}

export function VehicleEditModal({ vehicle, onClose, onSave }: VehicleEditModalProps) {
    const [form, setForm] = useState<Vehicle>({ ...vehicle })
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        // Simulate API call
        setTimeout(() => {
            setSaving(false)
            setSuccess(true)
            setTimeout(() => {
                onSave(form)
                onClose()
            }, 1000)
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                    <div>
                        <h2 className="text-xl font-black tracking-tight">Edit Vehicle</h2>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Admin Control Panel</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
                    {/* Image Editor */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Vehicle Image</label>
                        <div className="relative h-48 w-full bg-muted rounded-2xl overflow-hidden border-2 border-dashed border-border group">
                            <Image src={form.image} alt="Preview" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button type="button" className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-white font-bold text-xs hover:bg-white/20 transition-all">
                                    <Camera className="w-4 h-4" />
                                    CHANGE PHOTO
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Display Name</label>
                            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-colors" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Price (ZMW/day)</label>
                            <input required type="number" value={form.pricePerDay} onChange={e => setForm(f => ({ ...f, pricePerDay: Number(e.target.value) }))}
                                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3.5 text-sm font-bold text-primary focus:outline-none focus:border-primary transition-colors" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Availability</label>
                            <select value={form.available ? "yes" : "no"} onChange={e => setForm(f => ({ ...f, available: e.target.value === "yes" }))}
                                className={`w-full bg-muted/30 border border-border rounded-xl px-4 py-3.5 text-sm font-bold appearance-none focus:outline-none focus:border-primary transition-colors ${form.available ? "text-emerald-500" : "text-rose-500"}`}>
                                <option value="yes">Active / Available</option>
                                <option value="no">Inactive / Blocked</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Transmission</label>
                            <select value={form.transmission} onChange={e => setForm(f => ({ ...f, transmission: e.target.value as any }))}
                                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3.5 text-sm font-bold appearance-none focus:outline-none focus:border-primary transition-colors">
                                <option value="Auto">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Fuel Type</label>
                            <input value={form.fuel} onChange={e => setForm(f => ({ ...f, fuel: e.target.value }))}
                                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-colors" />
                        </div>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Danger Zone</p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">Deleting this vehicle will remove it from all listings. This action is irreversible for the demo prototype.</p>
                            <button type="button" className="text-[10px] font-black text-rose-500 mt-3 flex items-center gap-1 hover:underline">
                                <Trash2 className="w-3.5 h-3.5" />
                                DELETE VEHICLE PERMANENTLY
                            </button>
                        </div>
                    </div>
                </form>

                {/* Action Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-card border-t border-border flex gap-3 shadow-2xl">
                    <button type="button" onClick={onClose}
                        className="flex-1 bg-muted text-foreground font-black text-xs py-4 rounded-2xl hover:bg-muted/80 transition-all">
                        CANCEL
                    </button>
                    <button onClick={handleSave} disabled={saving || success}
                        className="flex-[2] bg-primary text-primary-foreground font-black text-xs py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                            success ? <Check className="w-5 h-5" /> : "SAVE CHANGES"}
                    </button>
                </div>
            </div>
        </div>
    )
}
