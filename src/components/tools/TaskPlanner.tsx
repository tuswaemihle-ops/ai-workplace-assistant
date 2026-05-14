import { useState } from "react";
import { CalendarCheck, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAi } from "@/lib/ai.functions";
import { ToolShell, OutputCard } from "./ToolShell";

export function TaskPlanner() {
  const run = useServerFn(generateAi);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("Daily");
  const [hours, setHours] = useState("8");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    if (!tasks.trim()) return;
    setLoading(true); setError(null);
    try {
      const r = await run({
        data: {
          system:
            "You are a productivity planner. Build a structured plan that prioritizes by urgency and importance (Eisenhower matrix). Output sections in markdown:\n1) **Prioritized List** (P1/P2/P3 with rationale)\n2) **Schedule** (time-blocked, realistic)\n3) **Time Optimization Tips** (2-4 specific tips, e.g. batching, deep work blocks)\nKeep it concrete and actionable.",
          prompt: `Plan horizon: ${horizon}\nAvailable focus hours: ${hours}\n\nTasks and goals:\n${tasks}`,
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
    <ToolShell icon={CalendarCheck} title="AI Task Planner" description="Prioritize and time-block your day or week intelligently.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium">Plan horizon</span>
              <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className="select-base">
                <option>Daily</option><option>Weekly</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium">Focus hours / day</span>
              <input value={hours} onChange={(e) => setHours(e.target.value)} className="select-base" />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium">Tasks, deadlines, goals</span>
            <textarea value={tasks} onChange={(e) => setTasks(e.target.value)} placeholder="e.g. Finish Q4 report (due Fri), prep client demo, review 3 PRs, gym, call mom..." className="textarea-base min-h-[180px]" />
          </label>
          <button onClick={onGenerate} disabled={loading || !tasks.trim()} className="btn-primary">
            <Sparkles className="h-4 w-4" /> {loading ? "Planning..." : "Build Plan"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <OutputCard output={output} onChange={setOutput} loading={loading} />
      </div>
    </ToolShell>
  );
}
