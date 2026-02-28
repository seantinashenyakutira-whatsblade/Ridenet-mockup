"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"

type Message = { role: "user" | "assistant"; text: string }

const WELCOME = "Hi! I'm the RideNet Support Assistant 🚗\n\nI can help with:\n• Services overview\n• How to book\n• Contact & office hours\n\nWhat do you need help with?"

const QUICK_REPLIES = ["How do I book?", "What services? 🚗", "Contact details 📞", "Airport transfer ✈️"]

export function ChatBot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: WELCOME }])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const send = async (text?: string) => {
        const content = (text ?? input).trim()
        if (!content || loading) return
        setInput("")

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
            setMessages(m => [...m, { role: "assistant", text: data.reply || "Sorry, please try again." }])
        } catch {
            setMessages(m => [...m, {
                role: "assistant",
                text: "Sorry — I can't respond right now.\n📱 WhatsApp: +260 776 950 796\n✉️ info@ridenetzm.com"
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                aria-label="Open chat"
            >
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat window */}
            {open && (
                <div className="fixed bottom-40 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: "420px" }}>
                    {/* Header */}
                    <div className="bg-primary px-4 py-3 flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary-foreground">RideNet Assistant</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                <p className="text-[10px] text-primary-foreground/70">AI-powered · Online</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                        {/* Quick replies only on first message */}
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-1.5 mb-1">
                                {QUICK_REPLIES.map(q => (
                                    <button key={q} onClick={() => send(q)}
                                        className="text-[10px] font-medium bg-muted hover:bg-primary/10 hover:border-primary/50 text-foreground px-2.5 py-1 rounded-full border border-border transition-colors">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`text-xs px-3 py-2 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-wrap ${m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                        : "bg-muted text-foreground rounded-bl-sm"
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border flex gap-2 shrink-0">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && send()}
                            placeholder="Ask a question..."
                            disabled={loading}
                            className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-foreground disabled:opacity-50"
                        />
                        <button onClick={() => send()} disabled={loading || !input.trim()}
                            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
