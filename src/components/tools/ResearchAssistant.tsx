import { useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAi } from "@/lib/ai.functions";
import { ToolShell, OutputCard } from "./ToolShell";

export function ResearchAssistant() {
  const run = useServerFn(generateAi);
  const [input, setInput] = useState("");
  const [depth, setDepth] = useState("Brief");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    if (!input.trim()) return;
    setLoading(true); setError(null);
    try {
      const r = await run({
        data: {
          system:
            "You are a research assistant. For the given topic or pasted text, produce markdown sections:\n1) **TL;DR** (2-3 sentences)\n2) **Key Insights** (5-7 bullets)\n3) **Recommendations / Next Steps**\n4) **Caveats** (gaps, biases, things to verify)\nWrite plainly. If summarizing pasted content, do not invent facts not in the text.",
          prompt: `Depth: ${depth}\n\nTopic or text to research/summarize:\n${input}`,
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
    <ToolShell icon={BookOpen} title="AI Research Assistant" description="Summarize topics or articles with key insights and caveats.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium">Depth</span>
            <select value={depth} onChange={(e) => setDepth(e.target.value)} className="select-base">
              <option>Brief</option><option>Standard</option><option>Detailed</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium">Topic, question, or article text</span>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 'Latest trends in remote work productivity tools' or paste an article to summarize..." className="textarea-base min-h-[200px]" />
          </label>
          <button onClick={onGenerate} disabled={loading || !input.trim()} className="btn-primary">
            <Sparkles className="h-4 w-4" /> {loading ? "Researching..." : "Run Research"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <OutputCard output={output} onChange={setOutput} loading={loading} />
      </div>
    </ToolShell>
  );
}
