import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronLeft, Shirt } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { UrgencyStrip } from "@/components/portal/UrgencyStrip";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

type Decision = "CP" | "WF" | "approved" | "return" | null;

export default function ApprovalItem() {
  const { itemIdx } = useParams();
  const navigate = useNavigate();
  const order = useOrderData();
  const idx = parseInt(itemIdx ?? "0", 10);
  const items = MOCK_PORTAL_DATA.approvalItems;
  const item = items[idx];
  const isLast = idx === items.length - 1;
  const [decision, setDecision] = useState<Decision>(null);
  const [returnOn, setReturnOn] = useState(false);
  const hasDecision = decision !== null || returnOn;

  const goNext = () =>
    navigate(
      isLast
        ? `/portal/${order.orderId}/approval/confirm`
        : `/portal/${order.orderId}/approval/${idx + 1}`,
      { state: { order } }
    );
  const goBack = () =>
    idx > 0
      ? navigate(`/portal/${order.orderId}/approval/${idx - 1}`, { state: { order } })
      : navigate(`/portal/${order.orderId}/approval`, { state: { order } });

  if (!item) return null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="flex items-center gap-3 px-4 pt-4">
        <button
          type="button"
          onClick={goBack}
          aria-label="Back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-press"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Item {idx + 1} of {items.length}
          </p>
          <p className="text-sm font-bold text-primary">
            {item.brand} {item.itemType}
          </p>
        </div>
        <div className="h-10 w-10" />
      </div>

      <div className="mt-4 flex gap-1.5 px-5">
        {items.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full",
              i <= idx ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      <div className="px-5 pt-4">
        <UrgencyStrip count={items.length - idx} timeLeft="2h 45m left" />
      </div>

      <div className="px-5 pt-4">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
            <div className="flex h-full w-full items-center justify-center">
              <Shirt className="h-16 w-16 text-muted-foreground" strokeWidth={1.5} />
            </div>
            {item.issues?.[0] && (
              <span
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive ring-2 ring-card"
                style={{
                  left: `${item.issues[0].photoCoords?.x ?? 50}%`,
                  top: `${item.issues[0].photoCoords?.y ?? 50}%`,
                }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-secondary" />
            ))}
          </div>
        </div>

        {item.approvalType === "A" && (
          <div className="mt-5">
            <span className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-[11px] font-semibold text-destructive">
              {(item as any).issue} · {(item as any).issueLocation}
            </span>
            <div className="mt-3 rounded-xl border border-border bg-muted/40 px-3.5 py-3">
              <p className="text-xs italic text-muted-foreground">"{item.facilityNote}"</p>
            </div>

            <p className="mt-5 text-sm font-semibold text-foreground">
              What would you like to do?
            </p>

            <div className="mt-3">
              {(["CP", "WF"] as const).map((id) => {
                const sel = decision === id && !returnOn;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setDecision(id);
                      setReturnOn(false);
                    }}
                    className={cn(
                      "mb-2 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                      sel ? "border-primary bg-primary/10" : "border-border bg-card"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        sel ? "border-primary bg-primary" : "border-border"
                      )}
                    >
                      {sel && <Check className="h-3 w-3 text-primary-foreground" />}
                    </span>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm",
                          sel ? "font-semibold text-primary" : "font-medium text-foreground"
                        )}
                      >
                        {id === "CP" ? "Send to Clean & Press" : "Keep as Wash & Fold"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {id === "CP"
                          ? (item as any).price
                            ? `AED ${(item as any).price} added · best outcome`
                            : "Best outcome"
                          : "Risk acknowledged"}
                      </p>
                    </div>
                    {id === "CP" && (
                      <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                        Rec.
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Return uncleaned</p>
                <p className="text-[11px] text-muted-foreground">Item returned as-is</p>
              </div>
              <Switch
                checked={returnOn}
                onCheckedChange={(v) => {
                  setReturnOn(v);
                  if (v) setDecision(null);
                }}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <button
              disabled={!hasDecision}
              onClick={goNext}
              className={cn(
                "mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]",
                hasDecision
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isLast ? "Review decisions" : "Next item"}
            </button>
          </div>
        )}

        {item.approvalType === "B" && (
          <div className="mt-5">
            <p className="text-sm leading-relaxed text-foreground">{item.facilityNote}</p>

            <button
              onClick={() => {
                setDecision("approved");
                goNext();
              }}
              className="mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold text-[#1A1A1A] transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
              style={{ background: "hsl(var(--cp-green))" }}
            >
              Approve for Clean & Press
            </button>
            <button
              onClick={() => {
                setDecision("return");
                goNext();
              }}
              className="mt-3 w-full rounded-xl bg-surface-attention-soft py-3.5 text-sm font-extrabold text-destructive transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
            >
              Return Uncleaned
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
