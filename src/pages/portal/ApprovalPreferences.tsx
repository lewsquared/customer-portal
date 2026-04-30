import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useOrderData } from "@/lib/useOrderData";
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
  useOrderData();

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
    : stainAutoApprove !== false || wfPref !== null;

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
    navigate(-4);
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
    ctaLabel = "Skip for Now";
    ctaPrimary = false;
  }

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-12">
        {/* Success banner */}
        <div className="mb-8 flex items-center gap-2.5 rounded-xl bg-success/15 px-4 py-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
          <p className="text-sm font-semibold text-success">You are all done!</p>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center py-4">
          <span className="text-7xl leading-none">🛍️</span>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="font-sans text-xl font-extrabold text-primary">Do you trust us?</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enable auto-approvals and skip approving each item in the future
          </p>
        </div>

        {/* Stain and Damage Approval */}
        <div className="mb-3 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setStainOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-xl">🛍️</span>
            <span className="flex-1 text-sm font-semibold text-primary">Stain and Damage Approval</span>
            {stainOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            )}
          </button>

          {stainOpen && (
            <div className="px-4">
              <p className="border-t border-border py-3 text-sm leading-relaxed text-muted-foreground">
                By activating "Auto-approve" our laundry team will process all items with stains or damages
                without seeking your consent
              </p>
              <div className="flex items-center gap-3 border-t border-border/60 py-3">
                <span className="flex-1 text-sm font-medium text-primary">Auto-Approve</span>
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
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setWfOpen((v) => !v)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-xl">🛍️</span>
            <span className="flex-1 text-sm font-semibold text-primary">Wash & Fold Approval</span>
            {wfOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
            )}
          </button>

          {wfOpen && (
            <div className="px-4 pb-1">
              <p className="border-t border-border py-3 text-sm leading-relaxed text-muted-foreground">
                In order to protect your delicate & expensive items, our team will flag items that we believe
                might not be suitable to Wash & Fold and will require your approval on how to proceed
              </p>
              <RadioRow
                selected={wfPref === "notify"}
                onSelect={() => setWfPref("notify")}
                label="Always notify me of the items in question so I can decide (default)"
              />
              <RadioRow
                selected={wfPref === "auto_cp"}
                onSelect={() => setWfPref("auto_cp")}
                label="Automatically transfer items to the clean & press service and notify me"
              />
              <RadioRow
                selected={wfPref === "always_wash"}
                onSelect={() => setWfPref("always_wash")}
                label="Always wash any items I send in the wash & fold bag, regardless of the risk involved and notify me"
              />
              <RadioRow
                selected={wfPref === "return"}
                onSelect={() => setWfPref("return")}
                label="Do not wash and return unprocessed"
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
          onClick={handleClick}
          className={cn(
            "w-full rounded-xl py-3.5 font-sans text-base transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]",
            ctaPrimary
              ? "bg-primary font-extrabold text-primary-foreground"
              : "border border-border bg-transparent font-semibold text-muted-foreground",
          )}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
