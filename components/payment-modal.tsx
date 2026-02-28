"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export function PaymentModal({ open, onClose, amount, onSuccess, reference }: { open: boolean, onClose: () => void, amount: number, onSuccess: () => void, reference: string }) {
    const [method, setMethod] = useState<"momo" | "card">("momo")
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    if (!open) return null

    const handlePay = async () => {
        setLoading(true)
        try {
            if (user) {
                // Create Firestore transaction doc
                await addDoc(collection(db, "transactions"), {
                    userId: user.uid,
                    amount,
                    method,
                    status: "pending",
                    reference,
                    createdAt: new Date()
                })
            }
            // Simulate API delay
            setTimeout(() => {
                setLoading(false)
                onSuccess()
            }, 1500)
        } catch (e) {
            console.warn("Payment log error (mock config?)", e)
            setTimeout(() => {
                setLoading(false)
                onSuccess()
            }, 1000)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-card border border-border rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Complete Payment</h2>
                    <button onClick={onClose} className="p-2 bg-muted rounded-full">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-muted-foreground text-sm">Amount to pay</p>
                    <p className="text-3xl font-bold">ZMW {amount}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => setMethod("momo")}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border ${method === 'momo' ? 'border-primary bg-primary/10' : 'border-border'}`}
                    >
                        <Smartphone className={`w-6 h-6 ${method === 'momo' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-left">
                            <p className="font-semibold">Mobile Money</p>
                            <p className="text-xs text-muted-foreground">MTN, Airtel, Zamtel</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setMethod("card")}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border ${method === 'card' ? 'border-primary bg-primary/10' : 'border-border'}`}
                    >
                        <CreditCard className={`w-6 h-6 ${method === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-left">
                            <p className="font-semibold">Credit/Debit Card</p>
                            <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                        </div>
                    </button>
                </div>

                <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors"
                >
                    {loading ? "Processing..." : `Pay ZMW ${amount}`}
                </button>
            </div>
        </div>
    )
}
