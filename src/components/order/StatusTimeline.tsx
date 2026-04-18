import { useState } from "react";
import { Check, ChevronDown, Clock, Truck, Package, Sparkles, Home, PackageCheck, History, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Stage = {
  key: string;
  label: string;
  timestamp?: string;
  description?: string;
};

interface Props {
  stages: Stage[];
  currentIndex: number;
  rightSlot?: React.ReactNode;
  onHold?: boolean;
}

const iconForKey: Record<string, LucideIcon> = {
  received: Package,
  collected: Truck,
  processing: Sparkles,
  delivery: Home,
  complete: PackageCheck,
};

export const StatusTimeline = ({ stages, currentIndex, rightSlot, onHold = false }: Props) => {
  const [open, setOpen] = useState(false);
  const segments = stages.length - 1;
  const progressPct = segments === 0 ? 0 : (currentIndex / segments) * 100;

  return (
    <div className="w-full">
      {/* Slim progress bar with step markers */}
      <div className="relative">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-gradient-progress animate-progress-fill"
            style={{ ["--progress-target" as string]: `${progressPct}%`, width: `${progressPct}%` }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 -top-0.5 flex justify-between px-0">
          {stages.map((s, i) => {
            const done = i <= currentIndex;
            return (
              <span
                key={s.key}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-2 transition-colors",
                  done ? "border-primary bg-primary" : "border-foreground/20 bg-card",
                  i === currentIndex && "ring-2 ring-accent/50",
                )}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-press backdrop-blur transition-all active:scale-[0.97]"
        >
          <History className="h-3.5 w-3.5" />
          {open ? "Hide timeline" : "View timeline"}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
        {rightSlot}
      </div>

      {/* Expandable timeline */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ol className="relative space-y-1 rounded-2xl bg-card/60 p-3 backdrop-blur">
            {stages.map((s, i) => {
              const isCompleteStage = s.key === "complete";
              // Treat the active "complete" stage as fully completed visually (blue checkmark).
              const completed = i < currentIndex || (i === currentIndex && isCompleteStage);
              const active = i === currentIndex && !isCompleteStage;
              const Icon = iconForKey[s.key] ?? Clock;
              const isLast = i === stages.length - 1;
              return (
                <li key={s.key} className="relative flex gap-3 pb-2">
                  {!isLast && (
                    <span
                      className={cn(
                        "absolute left-[15px] top-8 h-[calc(100%-1rem)] w-0.5 rounded-full",
                        completed ? "bg-primary/60" : active ? "bg-gradient-to-b from-primary to-foreground/15" : "bg-foreground/10",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      completed && "border-primary bg-primary text-primary-foreground",
                      active && "border-accent bg-card text-primary",
                      !completed && !active && "border-foreground/15 bg-card text-muted-foreground",
                    )}
                  >
                    {completed ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          active ? "text-primary" : completed ? "text-primary/90" : "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </span>
                      {active && s.key !== "complete" ? (
                        onHold ? (
                          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                            <span className="h-1 w-1 rounded-full bg-destructive animate-pulse" />
                            On hold
                          </span>
                        ) : (
                          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                            <span className="h-1 w-1 rounded-full bg-success animate-pulse" />
                            HERE
                          </span>
                        )
                      ) : s.timestamp ? (
                        <span className="shrink-0 whitespace-pre-line text-right text-[11px] font-medium leading-tight text-muted-foreground tabular">
                          {s.timestamp}
                        </span>
                      ) : null}
                    </div>
                    {s.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{s.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
