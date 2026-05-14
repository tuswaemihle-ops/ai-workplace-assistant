import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail, FileText, CalendarCheck, BookOpen, MessageSquare,
  Sparkles, ShieldAlert, Menu, X,
} from "lucide-react";
import { EmailGenerator } from "@/components/tools/EmailGenerator";
import { MeetingSummarizer } from "@/components/tools/MeetingSummarizer";
import { TaskPlanner } from "@/components/tools/TaskPlanner";
import { ResearchAssistant } from "@/components/tools/ResearchAssistant";
import { Chatbot } from "@/components/tools/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, meeting notes, planning, research, and chat with one AI workspace." },
    ],
  }),
  component: Index,
});

type ToolId = "email" | "meeting" | "planner" | "research" | "chat";

const TOOLS = [
  { id: "email" as const, label: "Smart Email", icon: Mail, hint: "Drafts & replies" },
  { id: "meeting" as const, label: "Meeting Notes", icon: FileText, hint: "Summarize & extract" },
  { id: "planner" as const, label: "Task Planner", icon: CalendarCheck, hint: "Prioritize & schedule" },
  { id: "research" as const, label: "Research", icon: BookOpen, hint: "Insights & summaries" },
  { id: "chat" as const, label: "AI Chat", icon: MessageSquare, hint: "Ask anything" },
];

function Index() {
  const [active, setActive] = useState<ToolId>("email");
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTool = TOOLS.find((t) => t.id === active)!;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-sidebar-foreground">Worksmith AI</div>
              <div className="text-[11px] text-muted-foreground">Productivity Assistant</div>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="rounded-md p-1.5 hover:bg-sidebar-accent lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3 pb-2 pt-1">
          <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Tools
          </div>
          <nav className="flex flex-col gap-1">
            {TOOLS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActive(t.id); setMobileOpen(false); }}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-md ${isActive ? "bg-brand text-brand-foreground" : "bg-background text-muted-foreground group-hover:text-foreground"}`}>
                    <t.icon className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">{t.label}</span>
                    <span className="text-[11px] text-muted-foreground">{t.hint}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-3 pb-4">
          <div className="rounded-lg border border-sidebar-border bg-background/60 p-3">
            <div className="flex items-start gap-2">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <div className="text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Responsible AI.</span>{" "}
                Outputs may be inaccurate or biased. Always review before sharing.
              </div>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden" />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileOpen(true)} className="rounded-md p-2 hover:bg-accent lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Workspace</span>
              <span>/</span>
              <span className="font-medium text-foreground">{activeTool.label}</span>
            </nav>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Powered by Lovable AI
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-8">
          {active === "email" && <EmailGenerator />}
          {active === "meeting" && <MeetingSummarizer />}
          {active === "planner" && <TaskPlanner />}
          {active === "research" && <ResearchAssistant />}
          {active === "chat" && <Chatbot />}

          <div className="mt-10 rounded-xl border border-dashed border-border bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Responsible AI disclaimer:</span>{" "}
                AI-generated content may contain errors, biases, or outdated information. It is intended to assist — not replace — human judgment. Review and verify outputs before using them with clients, in decisions, or in official communications.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
