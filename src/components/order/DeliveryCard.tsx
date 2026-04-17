import { Pencil, MapPin, ArrowDownToLine, ArrowUpFromLine, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  /** Whether the section is open by default. */
  defaultOpen?: boolean;
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
  <div className="flex items-center gap-3 py-2.5">
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

export const DeliveryCard = ({ address, when, dropoffNote, dropoff, defaultOpen = true }: Props) => {
  return (
    <section
      className="mx-5 mt-4 rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Pickup and drop off details"
    >
      <Accordion type="single" collapsible defaultValue={defaultOpen ? "pickup-dropoff" : undefined} className="w-full">
        <AccordionItem value="pickup-dropoff" className="border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Truck className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold text-primary">Pickup & Drop Off</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="divide-y divide-border/60 pb-1">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
