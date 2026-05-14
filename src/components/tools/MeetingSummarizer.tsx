import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAi } from "@/lib/ai.functions";
import { ToolShell, OutputCard } from "./ToolShell";

export function MeetingSummarizer() {
  const run = useServerFn(generateAi);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    if (!notes.trim()) return;
    setLoading(true); setError(null);
    try {
      const r = await run({
        data: {
          system:
            "You are a meeting notes summarizer. Produce a structured summary with these sections: \n1) **Summary** (3-4 sentence overview)\n2) **Key Decisions**\n3) **Action Items** (with owner and deadline if mentioned)\n4) **Open Questions / Risks**\nUse markdown headings and bullet points. Be precise; do not invent details.",
          prompt: `Summarize these meeting notes:\n\n${notes}`,
        },
      });
      setOutput(r.content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell icon={FileText} title="Meeting Notes Summarizer" description="Turn long notes into decisions, action items, and deadlines.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-foreground">Paste your meeting notes or transcript</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste raw notes, bullet points, or a transcript..." className="textarea-base min-h-[280px]" />
          </label>
          <button onClick={onGenerate} disabled={loading || !notes.trim()} className="btn-primary">
            <Sparkles className="h-4 w-4" /> {loading ? "Summarizing..." : "Summarize"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <OutputCard output={output} onChange={setOutput} loading={loading} />
      </div>
    </ToolShell>
  );
}
