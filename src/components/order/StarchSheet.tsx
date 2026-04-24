import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type StarchLevel = "none" | "light" | "medium" | "hard";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: StarchLevel;
  onApply: (value: StarchLevel) => void;
}

const OPTIONS: { value: StarchLevel; label: string }[] = [
  { value: "none", label: "None" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export function StarchSheet({ open, onOpenChange, value, onApply }: Props) {
  const [local, setLocal] = useState<StarchLevel>(value);

  useEffect(() => {
    if (open) setLocal(value);
  }, [open, value]);

  const choose = (v: StarchLevel) => {
    setLocal(v);
    onApply(v);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col gap-0 rounded-t-3xl border-t p-0 max-h-[85vh]"
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Starch</SheetTitle>
        </SheetHeader>

        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-sm font-semibold text-primary">How should we starch your shirts?</p>
          </div>
        </div>

        <div className="pb-4">
          {OPTIONS.map((opt, idx) => {
            const isSelected = local === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(opt.value)}
                className={cn(
                  "flex w-full items-center gap-4 px-5 py-4 text-left transition-colors",
                  idx > 0 && "border-t border-border/60",
                  isSelected && "bg-secondary/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function starchLabel(value: StarchLevel) {
  return OPTIONS.find((o) => o.value === value)?.label ?? "None";
}
