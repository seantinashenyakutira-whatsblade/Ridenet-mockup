"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, Loader2, ExternalLink } from "lucide-react"

type Message = { role: "user" | "assistant"; text: string }

const WELCOME = "Hi! I'm the RideNet Support Assistant 🚗\n\nI can help with:\n• Services overview\n• How to book\n• Contact & office hours\n\nWhat do you need help with?"

const QUICK_REPLIES = ["How do I book?", "What services? 🚗", "Contact details 📞", "Airport transfer ✈️"]

export function ChatBot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: WELCOME }])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [showWhatsApp, setShowWhatsApp] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const send = async (text?: string) => {
        const content = (text ?? input).trim()
        if (!content || loading) return
        setInput("")
        setShowWhatsApp(false)

        const userMsg: Message = { role: "user", text: content }
        const updated = [...messages, userMsg]
        setMessages(updated)
        setLoading(true)

        try {
            const res = await fetch("/api/support-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updated
                        .filter(m => m.text !== WELCOME)
                        .map(m => ({ role: m.role, content: m.text })),
                }),
            })
            const data = await res.json()
            const reply = data.reply || "I didn't quite get that. Would you like to speak with our team?"

            setMessages(m => [...m, { role: "assistant", text: reply }])

            // Show WhatsApp button if bot is unsure or if certain keywords are present
            if (reply.toLowerCase().includes("don't have confirmed") || reply.toLowerCase().includes("not sure") || reply.toLowerCase().includes("contact ridenet directly")) {
                setShowWhatsApp(true)
            }
        } catch {
            setMessages(m => [...m, {
                role: "assistant",
                text: "Sorry — I'm having trouble connecting. Our team is available on WhatsApp for immediate help."
            }])
            setShowWhatsApp(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Floating button - Positioned higher to avoid WhatsApp button overlap */}
            <button
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-28 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                aria-label="Open chat"
            >
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat window */}
            {open && (
                <div className="fixed bottom-44 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ maxHeight: "450px" }}>
                    {/* Header */}
                    <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-primary-foreground leading-tight">RideNet Assistant</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <p className="text-[10px] text-primary-foreground/70">Virtual Receptionist · Online</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} className="text-primary-foreground/60 hover:text-primary-foreground p-1">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/5">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`text-xs px-3 py-2.5 rounded-2xl max-w-[90%] leading-relaxed shadow-sm whitespace-pre-wrap ${m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-card border border-border text-foreground rounded-bl-none"
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {showWhatsApp && (
                            <div className="flex justify-start">
                                <Link
                                    href="https://wa.me/260776950796"
                                    target="_blank"
                                    className="flex items-center gap-2 bg-[#25D366] text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
                                >
                                    <MessageCircle className="w-4 h-4 fill-white" />
                                    Chat on WhatsApp
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        )}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-card border border-border rounded-xl rounded-bl-none px-3 py-2 flex items-center gap-1.5 shadow-sm">
                                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Footer / Input */}
                    <div className="p-3 bg-card border-t border-border flex flex-col gap-3 shrink-0">
                        {messages.length === 1 && (
                            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                {QUICK_REPLIES.map(q => (
                                    <button key={q} onClick={() => send(q)}
                                        className="shrink-0 text-[10px] font-medium bg-muted hover:bg-primary/10 hover:border-primary/50 text-foreground px-3 py-1.5 rounded-full border border-border transition-all whitespace-nowrap">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && send()}
                                placeholder="Type your message..."
                                disabled={loading}
                                className="flex-1 bg-muted/30 border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary text-foreground disabled:opacity-50"
                            />
                            <button onClick={() => send()} disabled={loading || !input.trim()}
                                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-40">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <span className="text-[9px] text-muted-foreground/60 font-medium">Powered by SeanDev</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
