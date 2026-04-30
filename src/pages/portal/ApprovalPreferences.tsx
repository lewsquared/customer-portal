import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

type StainPref = "notify" | "auto_cp" | null;
type WfPref = "notify" | "auto_cp" | "return" | null;

const RadioRow = ({
  selected,
  onSelect,
  label,
  sublabel,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  sublabel?: string;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={cn(
      "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
      selected ? "border-primary bg-card" : "border-border bg-card"
    )}
  >
    <div
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        selected ? "border-primary bg-primary" : "border-border bg-background"
      )}
    >
      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-primary">{label}</p>
      {sublabel && (
        <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  </button>
);

export default function ApprovalPreferences() {
  const navigate = useNavigate();
  const order = useOrderData();
  const [stainOpen, setStainOpen] = useState(false);
  const [wfOpen, setWfOpen] = useState(false);
  const [stainPref, setStainPref] = useState<StainPref>(null);
  const [wfPref, setWfPref] = useState<WfPref>(null);

  const hasPref = stainPref !== null || wfPref !== null;

  const handleContinue = () => {
    if (hasPref) {
      try {
        localStorage.setItem(
          "washmen_approval_prefs",
          JSON.stringify({ stainPref, wfPref })
        );
      } catch {}
    }
    navigate(-4);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <div className="flex-1 px-5 pt-10 pb-6">
        {/* Success banner */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Check className="h-7 w-7 text-white" strokeWidth={3} />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-primary">
            You are all done!
          </h1>
        </div>

        {/* Heading */}
        <div className="mt-8">
          <h2 className="text-base font-extrabold text-primary">
            Do you trust us?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enable auto-approvals and skip reviewing items in the future
          </p>
        </div>

        {/* Stain and Damage */}
        <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setStainOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-lg">🧺</span>
            <span className="flex-1 text-sm font-semibold text-primary">
              Stain and Damage Approvals
            </span>
            {stainOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {stainOpen && (
            <div className="space-y-2 border-t border-border px-4 py-4">
              <p className="text-xs text-muted-foreground">
                When we find a stain or damage that requires consent before
                processing, we'll handle it based on your preference.
              </p>
              <RadioRow
                selected={stainPref === "notify"}
                onSelect={() => setStainPref("notify")}
                label="Always notify me so I can decide"
                sublabel="Default — you'll review each item"
              />
              <RadioRow
                selected={stainPref === "auto_cp"}
                onSelect={() => setStainPref("auto_cp")}
                label="Automatically approve for Clean & Press"
                sublabel="Items charged at Clean & Press pricing"
              />
            </div>
          )}
        </div>

        {/* Wash and Fold */}
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setWfOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-lg">👕</span>
            <span className="flex-1 text-sm font-semibold text-primary">
              Wash and Fold Approvals
            </span>
            {wfOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {wfOpen && (
            <div className="space-y-2 border-t border-border px-4 py-4">
              <p className="text-xs text-muted-foreground">
                When we identify items not suitable for Wash & Fold, we'll
                handle them based on your preference.
              </p>
              <RadioRow
                selected={wfPref === "notify"}
                onSelect={() => setWfPref("notify")}
                label="Always notify me so I can decide"
                sublabel="Default — you'll review each item"
              />
              <RadioRow
                selected={wfPref === "auto_cp"}
                onSelect={() => setWfPref("auto_cp")}
                label="Automatically transfer to Clean & Press"
                sublabel="Items charged at Clean & Press pricing"
              />
              <RadioRow
                selected={wfPref === "return"}
                onSelect={() => setWfPref("return")}
                label="Return unprocessed"
                sublabel="Items returned as-is"
              />
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div
        className="border-t border-border bg-background px-5 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-xl bg-primary py-3.5 font-sans text-base font-normal text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          {hasPref ? "Save Preferences" : "Continue"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-4)}
          className="mt-3 w-full rounded-xl border border-border bg-transparent py-3 font-sans text-sm font-semibold text-muted-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          Skip for Now
        </button>
      </div>
    </div>
  );
}
