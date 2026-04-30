import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useOrderData } from "@/lib/useOrderData";
import { setOrderStatus } from "@/lib/order-status-override";
import { cn } from "@/lib/utils";

type WfPref = "notify" | "auto_cp" | "always_wash" | "return" | null;

interface SavedPrefs {
  stainAutoApprove: boolean;
  wfPref: WfPref;
}

const STORAGE_KEY = "washmen_approval_prefs";

interface RadioRowProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
}

const RadioRow = ({ selected, onSelect, label }: RadioRowProps) => (
  <button
    type="button"
    onClick={onSelect}
    className="flex w-full items-center gap-3 border-t border-border/60 py-3 text-left"
  >
    <span className="flex-1 text-sm text-primary">{label}</span>
    <div
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        selected ? "border-primary bg-primary" : "border-border bg-background",
      )}
    >
      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </div>
  </button>
);

export default function ApprovalPreferences() {
  const navigate = useNavigate();
  const order = useOrderData();

  const [stainOpen, setStainOpen] = useState(true);
  const [wfOpen, setWfOpen] = useState(true);
  const [stainAutoApprove, setStainAutoApprove] = useState(false);
  const [wfPref, setWfPref] = useState<WfPref>("notify");

  const [loaded, setLoaded] = useState<SavedPrefs | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedPrefs;
        setStainAutoApprove(!!parsed.stainAutoApprove);
        setWfPref((parsed.wfPref ?? null) as WfPref);
        setLoaded({
          stainAutoApprove: !!parsed.stainAutoApprove,
          wfPref: (parsed.wfPref ?? null) as WfPref,
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const hasSaved = loaded !== null;
  const hasChanges = loaded
    ? loaded.stainAutoApprove !== stainAutoApprove || loaded.wfPref !== wfPref
    : stainAutoApprove !== false || wfPref !== "notify";

  const handleClick = () => {
    if (hasChanges) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ stainAutoApprove, wfPref }),
        );
      } catch {
        // ignore
      }
    }
    setOrderStatus(order.orderId, "items_in_process");
    navigate("/orders");
  };

  let ctaLabel: string;
  let ctaPrimary: boolean;
  if (hasChanges) {
    ctaLabel = "Apply";
    ctaPrimary = true;
  } else if (hasSaved) {
    ctaLabel = "Continue";
    ctaPrimary = true;
  } else {
    ctaLabel = "Skip For Now";
    ctaPrimary = false;
  }

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-14">
        {/* Confirmation */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
          <p className="text-sm font-semibold text-foreground">
            Decisions submitted
          </p>
        </div>

        {/* Heading */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Optional
        </p>
        <h1 className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-primary">
          Skip approvals next time?
        </h1>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
          Set your preferences once and we'll handle these decisions for you on future orders.
        </p>

        {/* Stain and Damage Approval */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setStainOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-4 text-left"
          >
            <span className="flex-1 text-sm font-semibold text-primary">
              Stain & damage approval
            </span>
            {stainOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            )}
          </button>

          {stainOpen && (
            <div className="px-4 pb-1">
              <p className="border-t border-border py-3 text-sm leading-relaxed text-muted-foreground">
                When enabled, our team will process items with stains or damage without asking for your approval each time.
              </p>
              <div className="flex items-center gap-3 border-t border-border py-3">
                <span className="flex-1 text-sm font-medium text-primary">Auto-approve</span>
                <Switch
                  checked={stainAutoApprove}
                  onCheckedChange={setStainAutoApprove}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Wash & Fold Approval */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setWfOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-4 text-left"
          >
            <span className="flex-1 text-sm font-semibold text-primary">
              Wash & Fold approval
            </span>
            {wfOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            )}
          </button>

          {wfOpen && (
            <div className="px-4 pb-1">
              <p className="border-t border-border py-3 text-sm leading-relaxed text-muted-foreground">
                Choose how we should handle delicate or expensive items flagged as unsuitable for Wash & Fold.
              </p>
              <RadioRow
                selected={wfPref === "notify"}
                onSelect={() => setWfPref("notify")}
                label="Notify me so I can decide (default)"
              />
              <RadioRow
                selected={wfPref === "auto_cp"}
                onSelect={() => setWfPref("auto_cp")}
                label="Move flagged items to Clean & Press and notify me"
              />
              <RadioRow
                selected={wfPref === "always_wash"}
                onSelect={() => setWfPref("always_wash")}
                label="Wash everything regardless of risk and notify me"
              />
              <RadioRow
                selected={wfPref === "return"}
                onSelect={() => setWfPref("return")}
                label="Return flagged items unprocessed"
              />
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div
        className="px-6 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "w-full rounded-[6px] h-[42px] text-[14px] leading-[20px] transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]",
            ctaPrimary
              ? "bg-primary font-normal text-primary-foreground shadow-press"
              : "font-normal text-muted-foreground hover:text-foreground",
          )}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
