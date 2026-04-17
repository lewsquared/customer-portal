import { Pencil, MapPin, Clock } from "lucide-react";

interface Props {
  address: string;
  when: string;
  dropoffNote: string;
}

export const DeliveryCard = ({ address, when, dropoffNote }: Props) => {
  return (
    <section
      className="mx-5 mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Delivery details"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Clock className="h-3 w-3" />
            {dropoffNote}
          </div>
          <div className="mt-0.5 text-sm font-bold text-primary tabular">{when}</div>
          <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        </div>
        <button
          aria-label="Edit delivery"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};
