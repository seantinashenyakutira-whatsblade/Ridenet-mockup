"use client"

import { useState } from "react"
import { X, Phone, Mail, Smartphone } from "lucide-react"
import Link from "next/link"

type AuthGateProps = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  message?: string
}

export function AuthGateModal({ open, onClose, onSuccess, message }: AuthGateProps) {
  const [mode, setMode] = useState<"choose" | "phone" | "email">("choose")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!open) return null

  const handleSendOtp = () => {
    if (phone.length >= 9) setOtpSent(true)
  }

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      localStorage.setItem('mockUser', 'signed_in')
      localStorage.setItem('mockRole', 'user')  // Phone always = regular user
      onSuccess?.()
      onClose()
      window.location.reload()
    }
  }

  const handleEmailSignIn = () => {
    if (email && password.length >= 6) {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        localStorage.setItem('mockUser', 'signed_in');
        // admin@ridenet.co.zm = admin, everything else = regular user
        const role = email.trim() === 'admin@ridenet.co.zm' ? 'admin' : 'user'
        localStorage.setItem('mockRole', role);
        onSuccess?.();
        onClose();
        window.location.reload();
        return;
      }
      onClose()
      onSuccess?.()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-sm bg-card border border-border rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {mode === "choose" ? "Sign in to continue" : mode === "phone" ? "Phone Verification" : "Sign in with Email"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {message || "Create an account or sign in to book & track your services"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 pb-6">
          {mode === "choose" && (
            <div className="flex flex-col gap-3 mt-2">
              {/* Phone OTP */}
              <button
                onClick={() => setMode("phone")}
                className="flex items-center gap-3 w-full bg-primary text-primary-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Smartphone className="w-4 h-4" />
                Continue with Phone OTP
              </button>

              {/* Google */}
              <button
                onClick={() => {
                  localStorage.setItem('mockUser', 'signed_in')
                  localStorage.setItem('mockRole', 'user')  // Google = regular user
                  onSuccess?.()
                  onClose()
                  window.location.reload()
                }}
                className="flex items-center gap-3 w-full bg-secondary border border-border text-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-muted transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              {/* Email */}
              <button
                onClick={() => setMode("email")}
                className="flex items-center gap-3 w-full bg-secondary border border-border text-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-muted transition-colors"
              >
                <Mail className="w-4 h-4" />
                Continue with Email
              </button>

              <p className="text-xs text-muted-foreground text-center mt-1">
                By continuing you agree to our{" "}
                <Link href="/terms" className="text-primary underline cursor-pointer" onClick={onClose}>Terms of Service</Link>
              </p>
              {/* Prototype hint */}
              <div className="bg-muted/60 rounded-xl p-3 mt-1 text-[11px] text-muted-foreground space-y-0.5">
                <p className="font-semibold text-foreground">🧪 Prototype test accounts (Email login):</p>
                <p>👤 <b>Client:</b> user@test.com / <b>any password</b></p>
                <p>🔑 <b>Admin:</b> admin@ridenet.co.zm / <b>any password</b></p>
                <p className="mt-1 opacity-70">Google &amp; Phone → signs in as regular user</p>
              </div>
            </div>
          )}

          {mode === "phone" && (
            <div className="flex flex-col gap-3 mt-2">
              {!otpSent ? (
                <>
                  <div className="flex gap-2">
                    <span className="flex items-center justify-center bg-muted text-foreground text-sm font-semibold rounded-xl px-3 border border-border min-w-[60px]">+260</span>
                    <input
                      type="tel"
                      placeholder="97 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to +260 {phone}</p>
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center tracking-[0.5em] text-lg font-bold bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Verify & Sign In
                  </button>
                </>
              )}
              <button onClick={() => setMode("choose")} className="text-xs text-muted-foreground text-center hover:text-foreground">
                Back to options
              </button>
            </div>
          )}

          {mode === "email" && (
            <div className="flex flex-col gap-3 mt-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleEmailSignIn}
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>
              <button onClick={() => setMode("choose")} className="text-xs text-muted-foreground text-center hover:text-foreground">
                Back to options
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
