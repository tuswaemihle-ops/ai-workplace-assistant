import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAi } from "@/lib/ai.functions";
import { ToolShell, OutputCard } from "./ToolShell";

export function EmailGenerator() {
  const run = useServerFn(generateAi);
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("Formal");
  const [audience, setAudience] = useState("Client");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    if (!context.trim()) return;
    setLoading(true); setError(null);
    try {
      const r = await run({
        data: {
          system:
            "You are a professional email writing assistant. Produce a clear, well-structured email with a subject line. Adapt tone and audience precisely. Use a greeting, body paragraphs, and a sign-off. Avoid placeholders unless necessary.",
          prompt: `Write an email.\nAudience: ${audience}\nTone: ${tone}\nContext / goal:\n${context}`,
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
    <ToolShell icon={Mail} title="Smart Email Generator" description="Draft polished, context-aware emails in seconds.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tone">
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="select-base">
                <option>Formal</option><option>Informal</option><option>Persuasive</option><option>Friendly</option><option>Apologetic</option>
              </select>
            </Field>
            <Field label="Audience">
              <select value={audience} onChange={(e) => setAudience(e.target.value)} className="select-base">
                <option>Client</option><option>Manager</option><option>Team</option><option>Vendor</option><option>Candidate</option>
              </select>
            </Field>
          </div>
          <Field label="Context & key points">
            <textarea
              value={context} onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Follow up with client about proposal sent last Tuesday, request a meeting next week."
              className="textarea-base min-h-[180px]"
            />
          </Field>
          <button onClick={onGenerate} disabled={loading || !context.trim()} className="btn-primary">
            <Sparkles className="h-4 w-4" /> {loading ? "Generating..." : "Generate Email"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <OutputCard output={output} onChange={setOutput} loading={loading} />
      </div>
    </ToolShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
