"use client"

import { useState } from "react"
import { X, Mail, Smartphone, Globe, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"

type AuthGateProps = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  message?: string
}

const NATIONALITIES = [
  "Zambian",
  "Zimbabwean",
  "South African",
  "Malawian",
  "British",
  "American",
  "Chinese",
  "Other"
]

export function AuthGateModal({ open, onClose, onSuccess, message }: AuthGateProps) {
  const [mode, setMode] = useState<"choose" | "phone" | "email" | "signup">("choose")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Signup fields
  const [name, setName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [nationality, setNationality] = useState("Zambian")
  const [nrc, setNrc] = useState("")
  const [passport, setPassport] = useState("")
  const [dob, setDob] = useState("")

  if (!open) return null

  const mockSignIn = (role: "admin" | "user" = "user") => {
    localStorage.setItem("mockUser", "signed_in")
    localStorage.setItem("mockRole", role)
    // Save user data for demo
    const userData = {
      name: name || (role === "admin" ? "Admin User" : "Demo User"),
      email: signupEmail || email || (role === "admin" ? "admin@ridenet.co.zm" : "user@test.com"),
      phone: signupPhone || phone || "+260 97 000 0000",
      nationality,
      idNumber: nationality === "Zambian" ? nrc : passport,
      dob
    }
    localStorage.setItem("ridenet_user_data", JSON.stringify(userData))

    onSuccess?.()
    onClose()
    window.location.reload()
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !signupEmail || !signupPhone || signupPassword.length < 6) return
    mockSignIn("user")
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-sm bg-card border border-border rounded-t-[2.5rem] sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Handle bar */}
        <div className="flex justify-center pt-4 sm:hidden shrink-0">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h2 className="text-xl font-black tracking-tight text-foreground">
              {mode === "choose" ? "Welcome to RideNet"
                : mode === "phone" ? "Enter OTP"
                  : mode === "signup" ? "Join the Network"
                    : "Sign In"}
            </h2>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              {message || "Zambia's premier transport network"}
            </p>
          </div>
          <button onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-8 overflow-y-auto">
          {/* ── CHOOSE ── */}
          {mode === "choose" && (
            <div className="flex flex-col gap-3.5 mt-4">
              <button onClick={() => setMode("phone")}
                className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground font-black text-sm py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                <Smartphone className="w-5 h-5" />
                SIGN IN WITH PHONE
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setMode("email")}
                  className="flex items-center justify-center gap-2 bg-muted/50 border border-border text-foreground font-bold text-xs py-3.5 rounded-2xl hover:bg-muted transition-all active:scale-[0.98]">
                  <Mail className="w-4 h-4 text-primary" />
                  EMAIL
                </button>
                <button onClick={() => mockSignIn("user")}
                  className="flex items-center justify-center gap-2 bg-muted/50 border border-border text-foreground font-bold text-xs py-3.5 rounded-2xl hover:bg-muted transition-all active:scale-[0.98]">
                  <Globe className="w-4 h-4 text-primary" />
                  GOOGLE
                </button>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground"><span className="bg-card px-2">New here?</span></div>
              </div>

              <button onClick={() => setMode("signup")}
                className="w-full bg-background border-2 border-primary text-primary font-black text-sm py-3.5 rounded-2xl hover:bg-primary/5 transition-all active:scale-[0.98]">
                CREATE ACCOUNT
              </button>

              <p className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
                By continuing you agree to our{" "}
                <Link href="/terms" className="text-primary font-bold hover:underline" onClick={onClose}>Terms of Service</Link>
                {" "}and privacy policy.
              </p>

              {/* Prototype hint */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Test Accounts</p>
                <div className="space-y-1.5 text-[11px] text-muted-foreground">
                  <p>👤 <b className="text-foreground">Client:</b> user@test.com</p>
                  <p>🔑 <b className="text-foreground">Admin:</b> admin@ridenet.co.zm</p>
                  <p className="text-[10px] italic opacity-70 mt-1">Accepts any password</p>
                </div>
              </div>
            </div>
          )}

          {/* ── PHONE OTP ── */}
          {mode === "phone" && (
            <div className="flex flex-col gap-4 mt-6 animate-in slide-in-from-right duration-300">
              {!otpSent ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center bg-muted/50 text-foreground text-sm font-bold rounded-2xl px-4 border border-border">+260</div>
                      <input autoFocus type="tel" placeholder="97 123 4567" value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="flex-1 bg-muted/30 border border-border rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                    </div>
                  </div>
                  <button onClick={() => setOtpSent(true)}
                    className="w-full bg-primary text-primary-foreground font-black text-sm py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98]">
                    SEND SECURE CODE
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-muted-foreground">Verification code sent to</p>
                    <p className="text-sm font-bold text-foreground">+260 {phone}</p>
                  </div>
                  <input autoFocus type="text" placeholder="000 000" maxLength={6} value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center tracking-[0.5em] text-2xl font-black bg-muted/30 border border-border rounded-2xl px-4 py-5 text-primary focus:outline-none focus:border-primary" />
                  <button onClick={() => mockSignIn("user")}
                    className="w-full bg-primary text-primary-foreground font-black text-sm py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98]">
                    VERIFY & SIGN IN
                  </button>
                </>
              )}
              <button onClick={() => { setMode("choose"); setOtpSent(false); }} className="text-xs font-bold text-primary hover:underline">← Go Back</button>
            </div>
          )}

          {/* ── EMAIL SIGN IN ── */}
          {mode === "email" && (
            <div className="flex flex-col gap-4 mt-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Account Email</label>
                <input autoFocus type="email" placeholder="john@example.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Password</label>
                <input type="password" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
              </div>
              <button onClick={() => {
                const role = email.trim() === "admin@ridenet.co.zm" ? "admin" : "user"
                mockSignIn(role)
              }}
                className="w-full bg-primary text-primary-foreground font-black text-sm py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98]">
                SECURE SIGN IN
              </button>
              <button onClick={() => setMode("choose")} className="text-xs font-bold text-primary hover:underline">← Go Back</button>
            </div>
          )}

          {/* ── SIGNUP ── */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4 animate-in slide-in-from-right duration-300 overflow-visible pb-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input required placeholder="James Mwale" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-muted/30 border border-border rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Nationality</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={nationality}
                      onChange={e => setNationality(e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-2xl pl-12 pr-8 py-3.5 text-sm font-bold appearance-none focus:outline-none focus:border-primary transition-all"
                    >
                      {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-2xl pl-12 pr-3 py-3.5 text-xs font-bold focus:outline-none focus:border-primary transition-all" />
                  </div>
                </div>
              </div>

              {nationality === "Zambian" ? (
                <div className="space-y-1.5 animate-in fade-in duration-300">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">NRC Number</label>
                  <input required placeholder="123456/78/1" value={nrc} onChange={e => setNrc(e.target.value)}
                    className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                </div>
              ) : (
                <div className="space-y-1.5 animate-in fade-in duration-300">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Passport Number</label>
                  <input required placeholder={nationality === "Zimbabwean" ? "Example: BE123456" : "Passport number"} value={passport} onChange={e => setPassport(e.target.value)}
                    className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" placeholder="your@email.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                <input required type="tel" placeholder="+260 000 0000" value={signupPhone} onChange={e => setSignupPhone(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Password</label>
                <input required type="password" placeholder="Min. 6 characters" value={signupPassword} onChange={e => setSignupPassword(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-primary transition-all" />
              </div>

              <button type="submit"
                className="w-full bg-primary text-primary-foreground font-black text-sm py-4 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] mt-2">
                JOIN RIDENET
              </button>

              <button type="button" onClick={() => setMode("choose")} className="text-xs font-bold text-primary hover:underline">← Back to Options</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
