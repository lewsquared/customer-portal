import { Pencil, MapPin, Calendar } from "lucide-react";

interface DropoffSection {
  label: string;
  when: string;
}

interface Props {
  address: string;
  when: string;
  dropoffNote: string;
  /** Optional second editable row (e.g. Drop off at door). */
  dropoff?: DropoffSection;
}

const TimeRow = ({ label, when, ariaLabel }: { label: string; when: string; ariaLabel: string }) => (
  <div className="flex items-center gap-3 px-4 py-2.5">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
      <Calendar className="h-3.5 w-3.5" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold text-primary tabular">{when}</p>
    </div>
    <button
      aria-label={ariaLabel}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  </div>
);

export const DeliveryCard = ({ address, when, dropoffNote, dropoff }: Props) => {
  return (
    <section
      className="mx-5 mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Delivery details"
    >
      <div className="divide-y divide-border/60">
        <TimeRow label={dropoffNote} when={when} ariaLabel="Edit pickup time" />
        {dropoff && <TimeRow label={dropoff.label} when={dropoff.when} ariaLabel="Edit drop off time" />}
        <div className="flex items-center gap-3 px-4 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <MapPin className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{address}</span>
        </div>
      </div>
    </section>
  );
};
