import { Pencil, MapPin, ArrowDownToLine, ArrowUpFromLine, Truck } from "lucide-react";

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

const Row = ({
  icon,
  label,
  value,
  ariaLabel,
  editable = true,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  ariaLabel?: string;
  editable?: boolean;
}) => (
  <div className="flex items-center gap-3 px-5 py-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold text-primary tabular">{value}</p>
    </div>
    {editable && (
      <button
        aria-label={ariaLabel}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

export const DeliveryCard = ({ address, when, dropoffNote, dropoff }: Props) => {
  return (
    <section
      className="mx-5 mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Pickup and drop off details"
    >
      <div className="flex items-start gap-3 px-5 pt-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Truck className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-primary leading-tight">
            Pickup & Drop Off
          </h3>
          <p className="mt-1 text-xs font-medium text-muted-foreground leading-relaxed">
            When we'll collect and return your order.
          </p>
        </div>
      </div>

      <div className="mt-3 divide-y divide-border/60 border-t border-border/60">
        <Row
          icon={<ArrowUpFromLine className="h-4 w-4" />}
          label={dropoffNote}
          value={when}
          ariaLabel="Edit pickup time"
        />
        {dropoff && (
          <Row
            icon={<ArrowDownToLine className="h-4 w-4" />}
            label={dropoff.label}
            value={dropoff.when}
            ariaLabel="Edit drop off time"
          />
        )}
        <Row
          icon={<MapPin className="h-4 w-4" />}
          label="Where"
          value={address}
          editable={false}
        />
      </div>
    </section>
  );
};
