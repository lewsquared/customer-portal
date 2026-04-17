import { Check } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type Stage = {
  key: string;
  label: string;
  timestamp?: string;
};

interface Props {
  stages: Stage[];
  currentIndex: number; // index of active stage
}

export const HorizontalStepper = ({ stages, currentIndex }: Props) => {
  const segments = stages.length - 1;
  // Progress fills up to the active dot's center
  const progressPct = segments === 0 ? 0 : (currentIndex / segments) * 100;

  return (
    <div className="w-full">
      <div className="relative px-3 pt-2">
        {/* Track */}
        <div className="absolute left-3 right-3 top-[18px] h-1.5 rounded-full bg-foreground/10" />
        {/* Animated progress */}
        <div
          className="absolute left-3 top-[18px] h-1.5 rounded-full bg-gradient-progress animate-progress-fill"
          style={{ ["--progress-target" as string]: `calc(${progressPct}% - ${progressPct === 100 ? 24 : 0}px)` }}
        />

        <div className="relative flex items-start justify-between">
          {stages.map((s, i) => {
            const completed = i < currentIndex;
            const active = i === currentIndex;
            return <StepDot key={s.key} stage={s} completed={completed} active={active} index={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

const StepDot = ({
  stage,
  completed,
  active,
  index,
}: {
  stage: Stage;
  completed: boolean;
  active: boolean;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const interactive = completed || active;

  const dot = (
    <button
      type="button"
      disabled={!interactive}
      onClick={() => interactive && setOpen((v) => !v)}
      className={cn(
        "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
        "animate-scale-in",
        completed && "border-primary bg-primary text-primary-foreground",
        active && "border-accent bg-card text-primary shadow-press animate-pulse-ring",
        !completed && !active && "border-foreground/15 bg-card text-muted-foreground",
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={stage.label}
    >
      {completed ? (
        <Check className="h-4 w-4" strokeWidth={3} />
      ) : (
        <span className={cn("h-2 w-2 rounded-full", active ? "bg-accent" : "bg-foreground/25")} />
      )}
    </button>
  );

  return (
    <div className="flex w-0 flex-1 flex-col items-center gap-2 first:items-start last:items-end">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{dot}</PopoverTrigger>
        {stage.timestamp && (
          <PopoverContent className="w-auto px-3 py-2 text-xs font-medium" side="top">
            <div className="font-semibold text-primary">{stage.label}</div>
            <div className="tabular text-muted-foreground">{stage.timestamp}</div>
          </PopoverContent>
        )}
      </Popover>
      <span
        className={cn(
          "text-[11px] font-medium leading-tight text-center max-w-[64px]",
          active || completed ? "text-primary" : "text-muted-foreground",
        )}
      >
        {stage.label}
      </span>
    </div>
  );
};
