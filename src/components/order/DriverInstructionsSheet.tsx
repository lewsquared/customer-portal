import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PickupInstruction = "none" | "concierge" | "call";
export type DropoffInstruction = "none" | "door-handle" | "concierge" | "knock" | "call";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickup: PickupInstruction;
  dropoff: DropoffInstruction;
  onApply: (pickup: PickupInstruction, dropoff: DropoffInstruction) => void;
}

const PICKUP_OPTIONS: { value: PickupInstruction; label: string }[] = [
  { value: "none", label: "No preference" },
  { value: "concierge", label: "At concierge / reception" },
  { value: "call", label: "Call me when you arrive" },
];

const DROPOFF_OPTIONS: { value: DropoffInstruction; label: string }[] = [
  { value: "none", label: "No preference" },
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
      className="w-full flex items-center gap-3 py-3 text-left active:scale-[0.99] transition-transform"
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

export function DriverInstructionsSheet({ open, onOpenChange, pickup, dropoff, onApply }: Props) {
  const [localPickup, setLocalPickup] = useState<PickupInstruction>(pickup);
  const [localDropoff, setLocalDropoff] = useState<DropoffInstruction>(dropoff);

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
          <SheetTitle className="text-lg font-bold text-primary">Driver Instructions</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-2">
          <div>
            <div className="mb-1">
              <p className="text-sm font-bold text-primary">Pick Up</p>
              <p className="text-xs font-medium text-muted-foreground">Any pickup instructions?</p>
            </div>
            <ul className="divide-y divide-border">
              {PICKUP_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <RadioRow
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
            <div className="mb-1">
              <p className="text-sm font-bold text-primary">Drop Off</p>
              <p className="text-xs font-medium text-muted-foreground">Any delivery instructions?</p>
            </div>
            <ul className="divide-y divide-border">
              {DROPOFF_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <RadioRow
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
          className="mt-4 h-12 text-sm font-semibold flex-shrink-0"
        >
          Apply
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function instructionSummary(pickup: PickupInstruction, dropoff: DropoffInstruction): string {
  if (pickup === "none" && dropoff === "none") return "Tap to add instructions";
  const p = PICKUP_OPTIONS.find((o) => o.value === pickup)?.label ?? "No preference";
  const d = DROPOFF_OPTIONS.find((o) => o.value === dropoff)?.label ?? "No preference";
  return `Pick Up: ${p} · Drop Off: ${d}`;
}
