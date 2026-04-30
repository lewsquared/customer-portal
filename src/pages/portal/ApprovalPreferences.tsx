import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useOrderData } from "@/lib/useOrderData";
import { setOrderStatus } from "@/lib/order-status-override";
import { cn } from "@/lib/utils";
import extraBagsIcon from "@/assets/icons/extra-bags.png";
import washFoldIcon from "@/assets/icons/wash-fold.png";
import bagsGroupIcon from "@/assets/icons/bags-group.png";

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
    <span className="flex-1 text-[12px] leading-tight text-primary">{label}</span>
    <div
      className={cn(
        "h-5 w-5 shrink-0 rounded-full transition-colors",
        selected ? "border-[5px] border-primary bg-background" : "border-2 border-border bg-background",
      )}
    />
  </button>
);

export default function ApprovalPreferences() {
  const navigate = useNavigate();
  const order = useOrderData();

  const [stainOpen, setStainOpen] = useState(false);
  const [wfOpen, setWfOpen] = useState(false);
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
  if (hasChanges) {
    ctaLabel = "Apply";
  } else if (hasSaved) {
    ctaLabel = "Continue";
  } else {
    ctaLabel = "Skip For Now";
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
        <img src={bagsGroupIcon} alt="" className="mx-auto h-16 w-auto object-contain" />
        <h1 className="mt-3 text-center text-xl leading-tight text-primary" style={{ fontWeight: 700 }}>
          Skip Approvals Next Time?
        </h1>
        <p className="mt-1 text-center text-[0.875rem] leading-tight text-muted-foreground">
          Set your preferences once and we'll handle these decisions for you on future orders.
        </p>

        {/* Stain and Damage Approval */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setStainOpen((v) => !v)}
            className="flex h-[52px] w-full items-center gap-3 px-4 text-left"
          >
            <img src={extraBagsIcon} alt="" className="h-7 w-7 shrink-0 object-contain" />
            <span className="flex-1 text-[13px] font-medium text-primary">
              Stain And Damage Approvals
            </span>
            {stainOpen ? (
              <ChevronUp className="h-5 w-5 text-primary" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <ChevronDown className="h-5 w-5 text-primary" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </button>

          {stainOpen && (
            <div className="px-4 pb-1">
              <p className="border-t border-border py-3 text-[12px] leading-tight text-muted-foreground">
                When enabled, our team will process items with stains or damage without asking for your approval each time.
              </p>
              <div className="flex items-center gap-3 border-t border-border py-3">
                <span className="flex-1 text-[12px] font-medium text-primary">Auto-approve</span>
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
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => setWfOpen((v) => !v)}
            className="flex h-[52px] w-full items-center gap-3 px-4 text-left"
          >
            <img src={washFoldIcon} alt="" className="h-7 w-7 shrink-0 object-contain" />
            <span className="flex-1 text-[13px] font-medium text-primary">
              Wash & Fold Approvals
            </span>
            {wfOpen ? (
              <ChevronUp className="h-5 w-5 text-primary" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <ChevronDown className="h-5 w-5 text-primary" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </button>

          {wfOpen && (
            <div className="px-4 pb-1">
              <p className="border-t border-border py-3 text-[12px] leading-tight text-muted-foreground">
                In order to protect your delicate & expensive items, our team will flag items that we believe might not be suitable to Wash & Fold and will require your approval on how to proceed
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
        className="px-6 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <button
          type="button"
          onClick={handleClick}
          className="w-full rounded-[6px] h-[42px] text-[14px] leading-[20px] bg-primary font-normal text-primary-foreground shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
