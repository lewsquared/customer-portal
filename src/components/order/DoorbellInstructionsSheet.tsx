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
  isFirst,
}: {
  selected: T;
  value: T;
  label: string;
  onSelect: (v: T) => void;
  isFirst: boolean;
}) {
  const isSelected = selected === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-secondary/40",
        !isFirst && "border-t border-border/60",
      )}
    >
      <span className={cn("text-sm text-primary", isSelected ? "font-semibold" : "font-medium")}>
        {label}
      </span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          isSelected ? "border-primary bg-primary/10" : "border-muted-foreground/40",
        )}
      >
        {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
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
        className="flex max-h-[90vh] flex-col gap-0 rounded-t-3xl border-t p-0"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Doorbell Instructions</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-primary">Do you have any pickup instructions?</p>
          </div>
          <div>
            {PICKUP_OPTIONS.map((opt, idx) => (
              <RadioRow<DoorbellPickup>
                key={opt.value}
                selected={localPickup}
                value={opt.value}
                label={opt.label}
                onSelect={setLocalPickup}
                isFirst={idx === 0}
              />
            ))}
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Shirt className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-primary">Do you have any delivery instructions?</p>
          </div>
          <div>
            {DROPOFF_OPTIONS.map((opt, idx) => (
              <RadioRow<DoorbellDropoff>
                key={opt.value}
                selected={localDropoff}
                value={opt.value}
                label={opt.label}
                onSelect={setLocalDropoff}
                isFirst={idx === 0}
              />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-border/60 bg-background px-5 pt-4">
          <Button
            onClick={() => {
              onApply(localPickup, localDropoff);
              onOpenChange(false);
            }}
            className="h-12 w-full text-sm font-semibold"
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function doorbellSummary(pickup: DoorbellPickup, dropoff: DoorbellDropoff) {
  const p = PICKUP_OPTIONS.find((o) => o.value === pickup)?.label ?? "No Preference";
  const d = DROPOFF_OPTIONS.find((o) => o.value === dropoff)?.label ?? "No Preference";
  return { pickup: p, dropoff: d };
}
