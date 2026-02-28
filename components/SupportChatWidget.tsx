"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, RefreshCw } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content:
        "Hi! I'm the RideNet Support Assistant 🚗\n\nI can help you with:\n• Pricing for cars and tours\n• How to make a booking\n• Services overview\n• Airport transfers\n\nWhat would you like to know?",
};

const STORAGE_KEY = "ridenet_chat_history";

// Format message text with basic markdown-style rendering
function MessageText({ text }: { text: string }) {
    const lines = text.split("\n");
    return (
        <span className="whitespace-pre-wrap leading-relaxed">
            {lines.map((line, i) => (
                <span key={i}>
                    {line}
                    {i < lines.length - 1 && <br />}
                </span>
            ))}
        </span>
    );
}

export default function SupportChatWidget() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load from sessionStorage
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch { }
    }, []);

    // Save to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch { }
    }, [messages]);

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = { role: "user", content: text };
        const newMessages = [...messages, userMsg];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/support-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // Send only user/assistant messages (not the initial welcome which is local-only)
                    messages: newMessages
                        .filter((m) => !(m === INITIAL_MESSAGE))
                        .map((m) => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await res.json();
            const botReply: Message = {
                role: "assistant",
                content:
                    data.reply ||
                    "Sorry, I couldn't get a response. Please contact us on WhatsApp: +260 77 695 0796",
            };

            setMessages((prev) => [...prev, botReply]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry — I can't respond right now. Please contact support:\n📱 WhatsApp/Call: +260 77 695 0796\n✉️ Email: info@ridenetzm.com",
                },
            ]);
        } finally {
            setLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([INITIAL_MESSAGE]);
        sessionStorage.removeItem(STORAGE_KEY);
    };

    const QUICK_REPLIES = [
        "How much is a car rental?",
        "How do I book an airport transfer?",
        "What tours do you offer?",
        "How do I make a booking?",
    ];

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col" style={{ height: "480px" }}>
            {/* Chat header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-primary-foreground">RideNet AI Assistant</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-[11px] text-primary-foreground/70">Online · Powered by AI</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={clearChat}
                    title="Clear chat"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                    <RefreshCw className="w-3.5 h-3.5 text-primary-foreground" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Quick replies only shown when only the initial message is present */}
                {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {QUICK_REPLIES.map((q) => (
                            <button
                                key={q}
                                onClick={() => { setInput(q); inputRef.current?.focus(); }}
                                className="text-xs bg-muted border border-border text-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/50 transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        {/* Avatar */}
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "user"
                                    ? "bg-primary/20 text-primary"
                                    : "bg-accent/20 text-accent"
                                }`}
                        >
                            {msg.role === "user" ? (
                                <User className="w-3.5 h-3.5" />
                            ) : (
                                <Bot className="w-3.5 h-3.5" />
                            )}
                        </div>

                        {/* Bubble */}
                        <div
                            className={`text-sm px-3.5 py-2.5 rounded-2xl max-w-[85%] ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-muted text-foreground rounded-tl-sm"
                                }`}
                        >
                            <MessageText text={msg.content} />
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                            <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2 shrink-0">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question here..."
                    disabled={loading}
                    className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
