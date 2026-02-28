"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, MessageCircle, CalendarCheck, ArrowRight, Home } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"

function ConfirmationContent() {
  const params = useSearchParams()
  const type = params.get("type") || "Booking"
  const detail = params.get("detail") || "Service booking"
  const date = params.get("date") || ""
  const name = params.get("name") || ""

  // Generate ref only on the client after mount to avoid hydration mismatch
  const [ref, setRef] = useState("RN-XXXX")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)

  useEffect(() => {
    const newRef = `RN-${String(Math.floor(1000 + Math.random() * 9000))}`
    setRef(newRef)
    // Auto-show payment modal after a short delay for demo
    setTimeout(() => setShowPayment(true), 1500)
  }, [])

  const WHATSAPP_NUMBER = "260971234567"
  const whatsappMsg = encodeURIComponent(
    `Hi RideNet! My booking reference is ${ref} for ${type}. Please confirm my booking.`
  )


  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Logo header */}
      <Link href="/" className="mb-6">
        <Image
          src="/images/logo.png"
          alt="RideNet Solutions"
          width={140}
          height={48}
          className="h-12 w-auto object-contain"
          priority
        />
      </Link>
      <div className="w-full max-w-md">
        {/* Success card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Green header */}
          <div className="bg-primary px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">Request Received!</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">
              We will confirm your booking within 2 hours
            </p>
          </div>

          {/* Details */}
          <div className="p-5 space-y-3">
            {/* Reference */}
            <div className="flex items-center justify-between bg-muted rounded-xl px-4 py-3">
              <span className="text-xs text-muted-foreground font-medium">Booking Reference</span>
              <span className="text-sm font-bold text-primary tracking-wider">{ref}</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-semibold text-foreground">{type}</span>
              </div>
              {detail && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Details</span>
                  <span className="font-medium text-foreground text-right max-w-[180px]">{detail}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{date}</span>
                </div>
              )}
              {name && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{name}</span>
                </div>
              )}
            </div>

            {/* Status badge */}
            <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${paymentDone ? 'bg-green-500/10 border-green-500/20' : 'bg-accent/10 border-accent/20'}`}>
              <CalendarCheck className={`w-4 h-4 shrink-0 ${paymentDone ? 'text-green-500' : 'text-accent'}`} />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Status: {paymentDone ? 'Paid & Confirmed' : 'Pending Payment/Review'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {paymentDone ? 'Payment successful. We will dispatch your service shortly.' : 'Our team will contact you shortly to confirm'}
                </p>
              </div>
            </div>

            {/* Pay Now Button (if not paid) */}
            {!paymentDone && (
              <button
                onClick={() => {
                  // If we need auth first
                  setShowPayment(true)
                }}
                className="w-full bg-primary text-primary-foreground font-bold py-3 mt-2 rounded-xl text-sm hover:bg-primary/90 transition-colors"
              >
                Pay Now
              </button>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#20BD5C] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp Support
              </a>
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 bg-muted text-muted-foreground font-semibold text-sm py-3 rounded-xl hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Make Another Booking
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-2 hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Help text */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Save your reference <span className="text-primary font-bold">{ref}</span> for any follow-up queries
        </p>
      </div>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        amount={1500}
        reference={ref}
        onSuccess={() => {
          setShowPayment(false)
          setPaymentDone(true)
        }}
      />
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading confirmation...
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
