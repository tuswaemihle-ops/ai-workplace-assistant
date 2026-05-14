import type { LucideIcon } from "lucide-react";

export function ToolShell({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function OutputCard({
  output,
  onChange,
  loading,
}: {
  output: string;
  onChange: (v: string) => void;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          AI Output (editable)
        </span>
        {output && !loading && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-xs font-medium text-brand hover:underline"
          >
            Copy
          </button>
        )}
      </div>
      <textarea
        value={loading ? "Generating..." : output}
        onChange={(e) => onChange(e.target.value)}
        readOnly={loading}
        placeholder="Your AI-generated content will appear here. You can edit it freely."
        className="min-h-[280px] w-full resize-y bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
