import { useState } from "react";
import { Check, ChevronDown, Clock, Truck, Home, Package, Pause, ClipboardCheck, History, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StageIcon = "default" | "home" | "truck" | "hold" | "package" | "approval";
export type StagePillVariant = "urgent" | "attention";

export type Stage = {
  key: string;
  label: string;
  timestamp?: string;
  description?: string;
  icon?: StageIcon;
  pill?: { label: string; variant: StagePillVariant };
};

interface Props {
  stages: Stage[];
  currentIndex: number;
  rightSlot?: React.ReactNode;
  onHold?: boolean;
}

const customIconMap: Record<Exclude<StageIcon, "default">, LucideIcon> = {
  home: Home,
  truck: Truck,
  hold: Pause,
  package: Package,
  approval: ClipboardCheck,
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

      {/* Expandable timeline — sits directly on the hero gradient (no wrapper card) */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ol className="relative space-y-2 px-1">
            {stages.map((s, i) => {
              const renderAsCompleteWhenActive = s.key === "complete" || s.key === "collected";
              const completed = i < currentIndex || (i === currentIndex && renderAsCompleteWhenActive);
              const active = i === currentIndex && !renderAsCompleteWhenActive;
              const isLast = i === stages.length - 1;
              const customIcon = s.icon && s.icon !== "default" ? customIconMap[s.icon] : null;

              // Active markers are 32px (h-8 w-8); completed/future are 24px (h-6 w-6)
              const markerSize = active ? "h-8 w-8" : "h-6 w-6";
              // Center connector line on the marker (marker centers at 16px from row-left when active, 12px when small)
              // Use a column with fixed 32px width so all markers center-align under the same axis
              return (
                <li key={s.key} className="relative flex gap-3 py-3">
                  {!isLast && (
                    <span
                      className="absolute left-[15px] top-9 h-[calc(100%-1rem)] w-0.5 rounded-full"
                      style={{
                        background: completed
                          ? "hsl(var(--primary) / 0.6)"
                          : active
                            ? "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--foreground) / 0.15))"
                            : "hsl(var(--foreground) / 0.1)",
                      }}
                    />
                  )}
                  {/* fixed 32px column for marker, marker centered within */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        markerSize,
                        completed && "border-primary bg-primary text-primary-foreground",
                        active && !customIcon && "border-accent bg-card text-primary",
                        active && customIcon && "border-primary bg-card text-primary",
                        !completed && !active && "border-foreground/15 bg-card text-muted-foreground",
                      )}
                    >
                      {completed ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : customIcon ? (
                        (() => {
                          const Icon = customIcon;
                          return <Icon className="h-4 w-4" strokeWidth={2.4} />;
                        })()
                      ) : active ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          active ? "text-primary" : completed ? "text-primary/90" : "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </span>
                      {s.pill && (
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                            s.pill.variant === "urgent"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-warning-dark/15 text-warning-dark",
                          )}
                        >
                          {s.pill.label}
                        </span>
                      )}
                    </div>
                    {s.timestamp && (
                      <div className="mt-0.5 text-[11px] font-medium leading-tight text-muted-foreground tabular">
                        {s.timestamp}
                      </div>
                    )}
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
