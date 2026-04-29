import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronLeft, Shirt } from "lucide-react";
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
      { state: { order } }
    );
  const goBack = () =>
    idx > 0
      ? navigate(`/portal/${order.orderId}/approval/${idx - 1}`, { state: { order } })
      : navigate(`/portal/${order.orderId}/approval`, { state: { order } });

  if (!item) return null;
  const stain = item.issues?.[0];

  const slides = [
    { label: "ORIGINAL", labelClass: "bg-primary/80 text-primary-foreground" },
    { label: (stain?.type as string) === "damage" ? "DAMAGE" : "STAIN", labelClass: "bg-destructive text-destructive-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="px-5 pt-6">
        {/* Stepper nav — NO $ or chat icons */}
        <div className="flex items-start gap-2">
          <button
            onClick={goBack}
            aria-label="Back"
            className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center text-primary active:opacity-60"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-extrabold tracking-tight text-primary">
              Item {idx + 1} of {items.length}
            </h1>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground truncate">
              {item.brand} {item.itemType}
            </p>
          </div>
        </div>

        {/* Carousel — compact fixed height, proper slide logic, peek effect */}
        <div className="mt-5 overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(calc(${photoIdx * -72}% - ${photoIdx * 12}px))` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="relative w-[72%] shrink-0 aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
                <div className="flex h-full w-full items-center justify-center">
                  <Shirt className="h-20 w-20 text-muted-foreground/30" strokeWidth={1.25} />
                </div>
                {/* Stain dot — first slide only */}
                {i === 0 && stain && (
                  <div
                    className="absolute h-3 w-3 rounded-full bg-destructive ring-2 ring-background"
                    style={{ left: `${stain.photoCoords?.x ?? 50}%`, top: `${stain.photoCoords?.y ?? 50}%`, transform: "translate(-50%, -50%)" }}
                  />
                )}
                <span className={cn("absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider", slide.labelClass)}>
                  {slide.label}
                </span>
              </div>
            ))}
          </div>

          {/* Dot pagination */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                className={cn(
                  "h-1.5 rounded-full bg-primary transition-all duration-200",
                  i === photoIdx ? "w-5" : "w-1.5 opacity-30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Decision content */}
        <div className="mt-6">
          {/* TYPE A — WF→CP */}
          {item.approvalType === "A" && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                {(item as any).issue} · {(item as any).issueLocation}
              </p>
              <div className="mt-2 rounded-xl bg-secondary p-4">
                <p className="text-sm italic text-foreground leading-relaxed">
                  "{item.facilityNote}"
                </p>
              </div>

              <h2 className="mt-6 text-base font-extrabold text-primary">
                What would you like to do?
              </h2>

              <div className="mt-3 flex flex-col gap-2">
                {(["CP", "WF"] as const).map((id) => {
                  const sel = decision === id && !returnOn;
                  return (
                    <button
                      key={id}
                      onClick={() => { setDecision(id); setReturnOn(false); }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                        sel ? "border-primary bg-primary" : "border-border bg-card"
                      )}
                    >
                      <span className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        sel ? "border-primary-foreground bg-primary-foreground" : "border-muted-foreground"
                      )}>
                        {sel && <Check className="h-3 w-3 text-primary" strokeWidth={3} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-bold", sel ? "text-primary-foreground" : "text-primary")}>
                          {id === "CP" ? "Send to Clean & Press" : "Keep as Wash & Fold"}
                        </p>
                        <p className={cn("text-xs", sel ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {id === "CP"
                            ? (item as any).price ? `AED ${(item as any).price} added · best outcome` : "Best outcome"
                            : "Risk acknowledged"}
                        </p>
                      </div>
                      {id === "CP" && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
                          sel ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                        )}>
                          Rec.
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Return uncleaned toggle */}
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-primary">Return uncleaned</p>
                  <p className="text-xs text-muted-foreground">Item returned as-is</p>
                </div>
                <Switch
                  checked={returnOn}
                  onCheckedChange={(v) => { setReturnOn(v); if (v) setDecision(null); }}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <button
                onClick={goNext}
                disabled={!hasDecision}
                className="mt-6 w-full rounded-xl bg-primary py-3.5 text-base font-extrabold text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
              >
                {isLast ? "Review decisions" : "Next item"}
              </button>
            </div>
          )}

          {/* TYPE B — CP damage consent */}
          {item.approvalType === "B" && (
            <div>
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-sm italic text-foreground leading-relaxed">
                  {item.facilityNote}
                </p>
              </div>
              <button
                onClick={() => { setDecision("approved"); goNext(); }}
                className="mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold text-[#1A1A1A] transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
                style={{ background: "hsl(var(--cp-green))" }}
              >
                Approve for Clean & Press
              </button>
              <button
                onClick={() => { setDecision("return"); goNext(); }}
                className="mt-3 w-full rounded-xl bg-surface-attention-soft py-3.5 text-sm font-extrabold text-destructive transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
              >
                Return Uncleaned
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
