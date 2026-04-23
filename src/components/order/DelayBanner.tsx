import { Clock } from "lucide-react";

interface Props {
  count?: number;
}

export const DelayBanner = ({ count = 2 }: Props) => {
  return (
    <section
      className="mx-5 mt-4 animate-fade-in"
      style={{ animationDelay: "100ms" }}
      aria-label="Possible delivery delay"
    >
      <div className="relative flex items-start gap-3 overflow-hidden rounded-xl border border-warning/30 bg-warning/10 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warning/20 text-warning">
          <Clock className="h-4.5 w-4.5" strokeWidth={2.5} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-sm font-bold leading-tight text-primary">
            {count} {count === 1 ? "item" : "items"} may be delayed
          </h3>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            We'll confirm shortly if your drop-off time needs to shift.
          </p>
        </div>
      </div>
    </section>
  );
};
