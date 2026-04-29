import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronLeft, DollarSign, MessageCircle, Shirt } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
  const [photoIdx, setPhotoIdx] = useState(0);
  const hasDecision = decision !== null || returnOn;

  const goNext = () =>
    navigate(
      isLast
        ? `/portal/${order.orderId}/approval/confirm`
        : `/portal/${order.orderId}/approval/${idx + 1}`,
      { state: { order } },
    );
  const goBack = () =>
    idx > 0
      ? navigate(`/portal/${order.orderId}/approval/${idx - 1}`, { state: { order } })
      : navigate(`/portal/${order.orderId}/approval`, { state: { order } });

  if (!item) return null;
  const stain = item.issues?.[0];

  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[2.25rem] md:border md:border-border">
        {/* Top nav */}
        <div className="flex items-start justify-between px-5 pt-6">
          <div className="flex items-start gap-2">
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="-ml-1 mt-1 text-primary"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
            </button>
            <div className="min-w-0">
              <h1 className="font-sans text-2xl font-extrabold leading-tight text-primary">
                Item {idx + 1} of {items.length}
              </h1>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                {item.brand} {item.itemType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Pricing"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-primary"
            >
              <DollarSign className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Chat"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-primary"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Photo carousel — centered card with peek */}
        <div className="mt-5 pl-5">
          <div className="flex items-stretch gap-3 overflow-hidden">
            {/* Main photo */}
            <div className="relative aspect-[3/4] w-[78%] shrink-0 overflow-hidden rounded-2xl bg-secondary">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Shirt className="h-16 w-16" strokeWidth={1.5} />
              </div>
              {stain && (
                <span
                  aria-hidden
                  className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-destructive shadow-md"
                  style={{ left: `${stain.photoCoords.x}%`, top: `${stain.photoCoords.y}%` }}
                />
              )}
              <span className="absolute bottom-3 left-3 rounded-md bg-primary/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Original
              </span>
            </div>
            {/* Peek card */}
            <div className="relative aspect-[3/4] w-[78%] shrink-0 overflow-hidden rounded-2xl bg-secondary">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Shirt className="h-16 w-16" strokeWidth={1.5} />
              </div>
              <span className="absolute bottom-3 left-3 rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground">
                {stain?.type === "damage" ? "Damage" : "Stain"}
              </span>
            </div>
          </div>

          {/* Dot pagination */}
          <div className="mt-4 flex items-center justify-center gap-1.5 pr-5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setPhotoIdx(i)}
                className={cn(
                  "h-1.5 rounded-full bg-primary transition-all duration-200",
                  i === photoIdx ? "w-5" : "w-1.5 opacity-30",
                )}
              />
            ))}
          </div>
        </div>

        {/* Decision content */}
        <div className="flex-1 px-5 pb-10 pt-6">
          {/* TYPE A */}
          {item.approvalType === "A" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {(item as any).issue} · {(item as any).issueLocation}
              </p>
              <div className="mt-2 rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-sm font-medium italic text-primary">
                  "{item.facilityNote}"
                </p>
              </div>

              <h2 className="mt-6 text-base font-bold text-primary">
                What would you like to do?
              </h2>

              <div className="mt-3 flex flex-col gap-2">
                {(["CP", "WF"] as const).map((id) => {
                  const sel = decision === id && !returnOn;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setDecision(id);
                        setReturnOn(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                        sel ? "border-primary bg-primary" : "border-border bg-card",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          sel
                            ? "border-primary-foreground bg-primary-foreground"
                            : "border-muted-foreground/40",
                        )}
                      >
                        {sel && <Check className="h-3 w-3 text-primary" strokeWidth={3} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-sm font-bold",
                            sel ? "text-primary-foreground" : "text-primary",
                          )}
                        >
                          {id === "CP" ? "Send to Clean & Press" : "Keep as Wash & Fold"}
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-xs font-medium",
                            sel ? "text-primary-foreground/80" : "text-muted-foreground",
                          )}
                        >
                          {id === "CP"
                            ? (item as any).price
                              ? `AED ${(item as any).price} added · best outcome`
                              : "Best outcome"
                            : "Risk acknowledged"}
                        </p>
                      </div>
                      {id === "CP" && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide",
                            sel
                              ? "bg-primary-foreground text-primary"
                              : "bg-warning text-warning-foreground",
                          )}
                        >
                          Rec.
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Return uncleaned toggle */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-primary">Return uncleaned</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                    Item returned as-is
                  </p>
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
                type="button"
                disabled={!hasDecision}
                onClick={goNext}
                className={cn(
                  "mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]",
                  hasDecision
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                {isLast ? "Review decisions" : "Next item"}
              </button>
            </div>
          )}

          {/* TYPE B */}
          {item.approvalType === "B" && (
            <div>
              <p className="text-sm font-medium leading-relaxed text-primary">
                {item.facilityNote}
              </p>

              <button
                type="button"
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
                type="button"
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
    </main>
  );
}
