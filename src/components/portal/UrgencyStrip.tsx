import { cn } from "@/lib/utils";

export const UrgencyStrip = ({
  count,
  timeLeft,
  urgent = false,
}: {
  count: number;
  timeLeft: string;
  urgent?: boolean;
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
      urgent
        ? "border-destructive/30 bg-destructive/10"
        : "border-warning/30 bg-warning/10"
    )}
  >
    <p className="text-sm font-semibold text-foreground">
      {count} items need your decision
    </p>
    <p
      className={cn(
        "text-xs font-medium",
        urgent ? "text-destructive" : "text-warning-dark"
      )}
    >
      ⏱ {timeLeft}
    </p>
  </div>
);
