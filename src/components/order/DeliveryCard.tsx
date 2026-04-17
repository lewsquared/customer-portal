import { Pencil, MapPin, Calendar } from "lucide-react";

interface DropoffSection {
  label: string;
  when: string;
}

interface Props {
  address: string;
  when: string;
  dropoffNote: string;
  /** Optional second editable section (e.g. Drop off at door) shown below the first. */
  dropoff?: DropoffSection;
}

export const DeliveryCard = ({ address, when, dropoffNote, dropoff }: Props) => {
  return (
    <section
      className="mx-5 mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Delivery details"
    >
      {/* Pickup */}
      <div className="border-b border-border/60 px-4 py-2.5">
        <h3 className="font-display text-sm font-bold text-primary">{dropoffNote}</h3>
      </div>
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Calendar className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary tabular">{when}</span>
        <button
          aria-label="Edit pickup time"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Optional drop off */}
      {dropoff && (
        <>
          <div className="border-b border-border/60 px-4 py-2.5">
            <h3 className="font-display text-sm font-bold text-primary">{dropoff.label}</h3>
          </div>
          <div className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary tabular">
              {dropoff.when}
            </span>
            <button
              aria-label="Edit drop off time"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}

      {/* Address */}
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <MapPin className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{address}</span>
      </div>
    </section>
  );
};
