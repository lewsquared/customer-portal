import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";

export type DoorbellPickup = "none" | "concierge" | "call";
export type DoorbellDropoff = "none" | "door-handle" | "concierge" | "knock" | "call";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickup: DoorbellPickup;
  dropoff: DoorbellDropoff;
  onApply: (pickup: DoorbellPickup, dropoff: DoorbellDropoff) => void;
}

const PICKUP_OPTIONS: { value: DoorbellPickup; label: string }[] = [
  { value: "none", label: "No Preference" },
  { value: "concierge", label: "At concierge / reception" },
  { value: "call", label: "Call me when you arrive" },
];

const DROPOFF_OPTIONS: { value: DoorbellDropoff; label: string }[] = [
  { value: "none", label: "No Preference" },
  { value: "door-handle", label: "Hang on door handle" },
  { value: "concierge", label: "At concierge / reception" },
  { value: "knock", label: "Knock on the door" },
  { value: "call", label: "Call me when you arrive" },
];

function RadioRow<T extends string>({
  selected,
  value,
  label,
  onSelect,
}: {
  selected: T;
  value: T;
  label: string;
  onSelect: (v: T) => void;
}) {
  const isSelected = selected === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="flex w-full items-center gap-3 py-3.5 text-left transition-transform active:scale-[0.99]"
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          isSelected ? "border-primary" : "border-muted-foreground/40",
        )}
      >
        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
        {label}
      </span>
    </button>
  );
}

export function DoorbellInstructionsSheet({ open, onOpenChange, pickup, dropoff, onApply }: Props) {
  const [localPickup, setLocalPickup] = useState<DoorbellPickup>(pickup);
  const [localDropoff, setLocalDropoff] = useState<DoorbellDropoff>(dropoff);

  useEffect(() => {
    if (open) {
      setLocalPickup(pickup);
      setLocalDropoff(dropoff);
    }
  }, [open, pickup, dropoff]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col gap-0 rounded-t-3xl border-t p-5 max-h-[85vh]"
      >
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="text-lg font-bold text-primary">Doorbell Instructions</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-2">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-primary">Pick Up</p>
                <p className="text-xs font-medium text-muted-foreground">Do you have any pickup instructions?</p>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {PICKUP_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <RadioRow<DoorbellPickup>
                    selected={localPickup}
                    value={opt.value}
                    label={opt.label}
                    onSelect={setLocalPickup}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="my-4 h-px w-full bg-border" />

          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Shirt className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-primary">Delivery</p>
                <p className="text-xs font-medium text-muted-foreground">Do you have any delivery instructions?</p>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {DROPOFF_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <RadioRow<DoorbellDropoff>
                    selected={localDropoff}
                    value={opt.value}
                    label={opt.label}
                    onSelect={setLocalDropoff}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          onClick={() => {
            onApply(localPickup, localDropoff);
            onOpenChange(false);
          }}
          className="mt-4 h-12 flex-shrink-0 text-sm font-semibold"
        >
          Apply
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function doorbellSummary(pickup: DoorbellPickup, dropoff: DoorbellDropoff) {
  const p = PICKUP_OPTIONS.find((o) => o.value === pickup)?.label ?? "No Preference";
  const d = DROPOFF_OPTIONS.find((o) => o.value === dropoff)?.label ?? "No Preference";
  return { pickup: p, dropoff: d };
}
