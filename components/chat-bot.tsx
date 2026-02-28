"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"

type Message = { role: "user" | "bot"; text: string }

const DEMO_RESPONSES: Record<string, string> = {
    default: "Hi! I'm RideNet's AI assistant 🤖. I can help you with pricing, bookings, vehicle availability, and more. What would you like to know?",
    price: "Our pricing starts from ZMW 85/day for economy cars and goes up to ZMW 320/day for luxury vehicles. Airport transfers start from ZMW 200. All prices are in ZMW. Would you like a specific quote?",
    book: "To book a vehicle, tap the 'Book Now' button, select your service type, choose your dates and vehicle, then confirm. Need help choosing a vehicle?",
    car: "We have sedans (Toyota Corolla – ZMW 85/day), SUVs (Fortuner – ZMW 180/day), luxury (Land Cruiser – ZMW 320/day), vans (Hiace – ZMW 220/day), and trucks (Ranger – ZMW 150/day).",
    airport: "We offer airport transfers to/from Kenneth Kaunda International Airport, Harry Mwaanga Nkumbula Airport, and other major airports across Zambia. Starting from ZMW 200.",
    tour: "We offer day trips to Victoria Falls, Lower Zambezi safaris (3 days), South Luangwa (5 days), and Lusaka city tours. All inclusive packages available. Check our Tours section!",
    contact: "You can reach us on WhatsApp at +260 97 123 4567, or email support@ridenet.co.zm. We're available 24/7!",
    hello: "Hello there! 👋 Welcome to RideNet Solutions — Zambia's premier transport network. How can I assist you today?",
    zmw: "All our prices are quoted in ZMW (Zambian Kwacha). We accept Mobile Money (MTN, Airtel, Zamtel) and major credit/debit cards.",
}

function getResponse(input: string): string {
    const lower = input.toLowerCase()
    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("zmw") || lower.includes("kwacha")) return DEMO_RESPONSES.price
    if (lower.includes("book") || lower.includes("reserve") || lower.includes("hire")) return DEMO_RESPONSES.book
    if (lower.includes("car") || lower.includes("vehicle") || lower.includes("rental")) return DEMO_RESPONSES.car
    if (lower.includes("airport") || lower.includes("transfer") || lower.includes("pickup")) return DEMO_RESPONSES.airport
    if (lower.includes("tour") || lower.includes("safari") || lower.includes("victoria") || lower.includes("luangwa")) return DEMO_RESPONSES.tour
    if (lower.includes("contact") || lower.includes("whatsapp") || lower.includes("call") || lower.includes("phone")) return DEMO_RESPONSES.contact
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return DEMO_RESPONSES.hello
    if (lower.includes("zmw") || lower.includes("payment") || lower.includes("pay")) return DEMO_RESPONSES.zmw
    return DEMO_RESPONSES.default
}

export function ChatBot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: DEMO_RESPONSES.default }
    ])
    const [input, setInput] = useState("")
    const [typing, setTyping] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, typing])

    const send = () => {
        const text = input.trim()
        if (!text) return
        setInput("")
        setMessages(m => [...m, { role: "user", text }])
        setTyping(true)
        // Simulate AI thinking delay
        setTimeout(() => {
            setTyping(false)
            setMessages(m => [...m, { role: "bot", text: getResponse(text) }])
        }, 1000)
    }

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Open chat"
            >
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat window */}
            {open && (
                <div className="fixed bottom-40 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary-foreground">RideNet Assistant</p>
                            <p className="text-[10px] text-primary-foreground/70">Powered by AI • Online</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-72">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`text-xs px-3 py-2 rounded-2xl max-w-[85%] leading-relaxed ${m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                        : "bg-muted text-foreground rounded-bl-sm"
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-muted-foreground">
                                    <span className="animate-pulse">Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick replies */}
                    <div className="px-3 pb-1 flex gap-1.5 overflow-x-auto scrollbar-none">
                        {["Pricing 💰", "Cars 🚗", "Airport 🛬", "Tours 🌿"].map(q => (
                            <button
                                key={q}
                                onClick={() => { setInput(q); }}
                                className="shrink-0 text-[10px] font-medium bg-muted hover:bg-muted/80 text-foreground px-2.5 py-1 rounded-full border border-border"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && send()}
                            placeholder="Ask about pricing, cars..."
                            className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-foreground"
                        />
                        <button
                            onClick={send}
                            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
