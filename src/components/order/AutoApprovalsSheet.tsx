import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check, Shirt, WashingMachine } from "lucide-react";
import { cn } from "@/lib/utils";

export type WashFoldApproval =
  | "notify"
  | "transfer-clean-press"
  | "wash-anyway"
  | "do-not-wash";

export interface AutoApprovalsState {
  stainDamageApprove: boolean;
  washFold: WashFoldApproval;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: AutoApprovalsState;
  onApply: (value: AutoApprovalsState) => void;
}

const WF_OPTIONS: { value: WashFoldApproval; label: string }[] = [
  { value: "notify", label: "Always notify me of the items in question so I can decide (default)" },
  { value: "transfer-clean-press", label: "Automatically transfer items to the clean & press service and notify me" },
  { value: "wash-anyway", label: "Always wash any item I send in the wash & fold bag, regardless of the risk involved and notify me" },
  { value: "do-not-wash", label: "Do not wash and return unprocessed" },
];

export function AutoApprovalsSheet({ open, onOpenChange, value, onApply }: Props) {
  const [local, setLocal] = useState<AutoApprovalsState>(value);

  useEffect(() => {
    if (open) setLocal(value);
  }, [open, value]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[90vh] flex-col gap-0 rounded-t-3xl border-t p-0"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Auto-Approvals</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Shirt className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold text-primary">Stain and Damage Approval</p>
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
              By activating "Auto-approve" our laundry team will process all items with stains or damages without seeking your consent for your Clean & Press and Bed & Bath order
            </p>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <p className="text-sm font-semibold text-primary">Auto-approve</p>
              </div>
              <button
                type="button"
                onClick={() => setLocal((s) => ({ ...s, stainDamageApprove: !s.stainDamageApprove }))}
                aria-label="Toggle auto-approve"
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors",
                  local.stainDamageApprove ? "bg-primary" : "bg-muted",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-6 w-6 rounded-full bg-background shadow transition-transform",
                    local.stainDamageApprove ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
          </div>

          <div className="my-5 h-px w-full bg-border" />

          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <WashingMachine className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold text-primary">Wash and Fold Approval</p>
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
              In order to protect your delicate &amp; expensive items, our team will flag items that we believe might not be suitable to Wash &amp; Fold and will require your approval on how to proceed
            </p>
            <ul className="mt-2 divide-y divide-border">
              {WF_OPTIONS.map((opt) => {
                const isSelected = local.washFold === opt.value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => setLocal((s) => ({ ...s, washFold: opt.value }))}
                      className="flex w-full items-start gap-3 py-4 text-left"
                    >
                      <span className={cn("flex-1 text-sm leading-snug", isSelected ? "font-semibold text-primary" : "text-foreground")}>
                        {opt.label}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-border p-4">
          <Button
            onClick={() => {
              onApply(local);
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
