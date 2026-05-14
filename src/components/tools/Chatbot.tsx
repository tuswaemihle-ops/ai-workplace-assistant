import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAi } from "@/lib/ai.functions";
import { ToolShell } from "./ToolShell";

type Msg = { role: "user" | "assistant"; content: string };

export function Chatbot() {
  const run = useServerFn(generateAi);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your workplace AI assistant. Ask me anything — drafting, planning, brainstorming, or quick research." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const transcript = next.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n\n");
      const r = await run({
        data: {
          system: "You are a helpful, concise workplace AI assistant. Be practical, structured, and friendly. Use markdown when it helps clarity. Keep replies focused.",
          prompt: `Conversation so far:\n\n${transcript}\n\nReply as Assistant:`,
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: r.content }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: `Sorry — ${e instanceof Error ? e.message : "something went wrong"}.` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell icon={MessageSquare} title="AI Chatbot" description="An always-on assistant for quick questions and brainstorming.">
      <div className="flex h-[calc(100vh-280px)] min-h-[420px] flex-col rounded-xl border border-border bg-card">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:240ms]" />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
              placeholder="Ask anything... (Shift+Enter for newline)"
              rows={1}
              className="textarea-base max-h-32 min-h-[44px] flex-1 resize-none"
            />
            <button onClick={onSend} disabled={loading || !input.trim()} className="btn-primary !px-3 !py-2.5">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
