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
        className="flex max-h-[90vh] flex-col gap-0 rounded-t-3xl border-t p-0"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Starch</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-primary">How should we starch your shirts?</p>
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
                  "flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-secondary/40",
                  idx > 0 && "border-t border-border/60",
                )}
              >
                <span className={cn("text-sm", isSelected ? "font-semibold text-primary" : "font-medium text-primary")}>
                  {opt.label}
                </span>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-primary bg-primary/10" : "border-border",
                  )}
                  aria-hidden
                >
                  {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
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
