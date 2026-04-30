import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronLeft, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";
import { ServiceBagIcon } from "@/components/portal/ServiceBagIcon";

const toTitleCase = (s: string) =>
  s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

type Decision = "CP" | "WF" | "approved" | "return" | null;

// Mock images per item id — replace with real facility photos when available
const ITEM_IMAGES: Record<string, { original: string; detail: string }> = {
  a0: {
    original: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  },
  a1: {
    original: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  },
  b0: {
    original: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  },
};

export default function ApprovalItem() {
  const { itemIdx } = useParams();
  // Force a fresh component instance (and fresh state) for each item.
  return <ApprovalItemInner key={itemIdx ?? "0"} />;
}

function ApprovalItemInner() {
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const hasDecision = decision !== null || returnOn;

  const goNext = () => {
    if (!hasDecision) return;
    navigate(isLast ? `/portal/${order.orderId}/approval/confirm` : `/portal/${order.orderId}/approval/${idx + 1}`, {
      state: { order },
    });
  };

  const goBack = () =>
    idx > 0
      ? navigate(`/portal/${order.orderId}/approval/${idx - 1}`, { state: { order } })
      : navigate(`/portal/${order.orderId}/approval`, { state: { order } });

  if (!item) return null;

  const images = ITEM_IMAGES[item.id] ?? ITEM_IMAGES.a0;

  // Type A: original photo only, no stain UI.
  // Type B: original + issue close-up slides, with stain dot on first slide.
  const slides =
    item.approvalType === "B"
      ? [
          { label: "ORIGINAL", labelClass: "bg-primary/80 text-white", src: images.original },
          ...item.issues.map((issue, i) => ({
            label: (issue.type as string) === "damage" ? "DAMAGE" : "STAIN",
            labelClass: "bg-destructive text-white",
            src: i === 0 ? images.detail : images.original,
          })),
        ]
      : [{ label: "ORIGINAL", labelClass: "bg-primary/80 text-white", src: images.original }];

  const showStainUI = item.approvalType === "B";
  const activeIssue = showStainUI && item.issues.length > 0 ? item.issues[Math.max(0, photoIdx - 1)] : null;

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      {/* Header: "Review Your Items" + segmented progress bar */}
      <div className="px-5 pt-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back"
            className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center text-primary active:opacity-70"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <h1 className="text-xl leading-tight text-primary" style={{ fontWeight: 700 }}>Review Your Items</h1>
        </div>
        {/* One segment per item, filled up to current */}
        <div className="mt-3 flex gap-1.5">
          {items.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i <= idx ? "#FF7D19" : "#DFDBDB" }}
            />
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <h2 className="px-5 pt-5 tracking-tight text-primary" style={{ fontSize: "16px", fontWeight: 600, lineHeight: "21px" }}>
          {item.brand} {item.itemType}
        </h2>
        {/* Carousel — swipe enabled, tap to expand */}
        <div
          className="mt-3 overflow-hidden px-5"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const delta = touchStartX - e.changedTouches[0].clientX;
            if (delta > 50 && photoIdx < slides.length - 1) setPhotoIdx(photoIdx + 1);
            if (delta < -50 && photoIdx > 0) setPhotoIdx(photoIdx - 1);
            setTouchStartX(null);
          }}
        >
          <div
            className="flex gap-3 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(calc(${photoIdx} * (-100% - 12px)))` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="relative w-full shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-[#EAF4F4]"
                style={{ height: "260px" }}
                onClick={() => setLightboxSrc(slide.src)}
              >
                <img
                  src={slide.src}
                  alt={slide.label}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Stain dot — Type B only, original slide only */}
                {showStainUI && i === 0 && item.issues[0]?.photoCoords && (
                  <div
                    className="absolute z-10 h-4 w-4 rounded-full bg-destructive shadow-md ring-2 ring-white"
                    style={{
                      left: `${item.issues[0].photoCoords.x}%`,
                      top: `${item.issues[0].photoCoords.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
                {/* Label tag */}
                <div
                  className={cn(
                    "absolute bottom-3 left-3 z-10 rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-widest shadow-sm",
                    slide.labelClass,
                  )}
                >
                  {slide.label}
                </div>
                {/* Service bag icon — bottom-right overlay */}
                <div className="absolute bottom-3 right-3 z-10">
                  <ServiceBagIcon service={(item as any).service ?? "WF"} size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination — only when multiple slides (Type B) */}
        {slides.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 pr-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhotoIdx(i)}
                className={cn(
                  "h-1.5 rounded-full bg-primary transition-all duration-200",
                  i === photoIdx ? "w-5" : "w-1.5 opacity-30",
                )}
              />
            ))}
          </div>
        )}

        {/* Decision content */}
        <div className="px-5 pb-4 pt-4">
          {/*
            TYPE A — WF item not suitable for WF cycle
            User must choose: Send to Clean & Press / Keep as Wash & Fold / Return Uncleaned
          */}
          {item.approvalType === "A" && (
            <>
              {/* Why we're asking — WF suitability reason (no stain UI) */}
              {(item as any).wfReason && (
                <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#FEF2DF" }}>
                  <p className="text-primary" style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>
                    This item isn't suitable for Wash & Fold. We recommend switching it to Clean & Press so it's treated with the care it needs.
                  </p>
                </div>
              )}

              <h2 className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">What would you like to do?</h2>

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
                        "relative w-full rounded-xl border px-4 py-3 text-left transition-all duration-150",
                        sel ? "border-primary bg-card" : "border-border bg-card",
                      )}
                    >
                      {/* Recommended tag — top-right corner, CP only */}
                      {id === "CP" && (
                        <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-xl px-2.5 py-1 text-[10px] font-medium uppercase text-primary" style={{ backgroundColor: "#F5D534" }}>
                          RECOMMENDED
                        </span>
                      )}
                      <div className="pr-2">
                        <p className="text-primary" style={{ fontSize: "14px", fontWeight: 600 }}>
                          {id === "CP" ? "Send to Clean & Press" : "Keep as Wash & Fold"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {id === "CP"
                            ? (item as any).price
                              ? `AED ${(item as any).price} added · best outcome`
                              : "Best outcome"
                            : "Risk acknowledged"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Return Uncleaned — toggle row, red label */}
              <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-sm font-medium text-destructive">Return Uncleaned</p>
                <Switch
                  checked={returnOn}
                  onCheckedChange={(v) => {
                    setReturnOn(v);
                    if (v) setDecision(null);
                  }}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </>
          )}

          {/*
            TYPE B — Item already in CP, processing might worsen stain or damage the item.
            User must consent: Approve for CP / Return Uncleaned
            No "Keep as WF" option — item is already in CP.
          */}
          {item.approvalType === "B" && (
            <>
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#FEF2DF" }}>
                <p className="text-primary" style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>{item.facilityNote}</p>
              </div>

              <h2 className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">What would you like to do?</h2>

              <div className="mt-3">
                {(() => {
                  const sel = decision === "approved" && !returnOn;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setDecision("approved");
                        setReturnOn(false);
                      }}
                      className={cn(
                        "relative w-full rounded-xl border px-4 py-3 text-left transition-all duration-150",
                        sel ? "border-primary bg-card" : "border-border bg-card",
                      )}
                    >
                      <div className="pr-2">
                        <p className="text-primary" style={{ fontSize: "14px", fontWeight: 600 }}>Approve for Clean & Press</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          I understand processing may not remove the stain or could affect the item
                        </p>
                      </div>
                    </button>
                  );
                })()}
              </div>

              {/* Return Uncleaned — toggle row */}
              <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-sm font-medium text-destructive">Return Uncleaned</p>
                <Switch
                  checked={returnOn}
                  onCheckedChange={(v) => {
                    setReturnOn(v);
                    if (v) setDecision(null);
                  }}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky bottom CTA — same for both Type A and B */}
      <div
        className="border-t border-border bg-background px-5 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <button
          type="button"
          disabled={!hasDecision}
          onClick={goNext}
          className={cn(
            "w-full rounded-[6px] h-[42px] font-sans text-[14px] leading-[20px] font-normal transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]",
            hasDecision ? "bg-primary text-primary-foreground" : "cursor-not-allowed bg-[#F2F3F8] text-[#C3C8DB]",
          )}
        >
          {isLast ? "Review Decisions" : "Next Item"}
        </button>
      </div>

      {/* Item detail modal — opens on slide tap */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-background p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-primary active:opacity-70"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {/* Title */}
            <h3 className="pr-10 text-primary" style={{ fontSize: "16px", fontWeight: 600, lineHeight: "21px" }}>
              {item.brand} - {item.itemType}
            </h3>

            {/* Color dots + item number */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {((item as any).colors ?? []).slice(0, 3).map((hex: string, i: number) => (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-full ring-1 ring-border"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({item.itemNumber})</span>
            </div>

            {/* Image with overlays */}
            <div className="relative mt-4 overflow-hidden rounded-2xl bg-[#EAF4F4]" style={{ height: "320px" }}>
              <img
                src={slides[photoIdx]?.src}
                alt={slides[photoIdx]?.label}
                className="h-full w-full object-cover"
              />
              {/* Stain dot — Type B only, original slide only */}
              {showStainUI && photoIdx === 0 && item.issues[0]?.photoCoords && (
                <div
                  className="absolute z-10 h-4 w-4 rounded-full bg-destructive shadow-md ring-2 ring-white"
                  style={{
                    left: `${item.issues[0].photoCoords.x}%`,
                    top: `${item.issues[0].photoCoords.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              {/* Slide label, centered bottom */}
              <div
                className={cn(
                  "absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-lg px-2.5 py-1 text-[10px] font-extrabold tracking-widest shadow-sm",
                  slides[photoIdx]?.labelClass,
                )}
              >
                {slides[photoIdx]?.label}
              </div>
              {/* Service bag icon, bottom-right */}
              <div className="absolute bottom-3 right-3 z-10">
                <ServiceBagIcon service={(item as any).service ?? "WF"} size={36} />
              </div>
            </div>

            {/* Pagination dots — only when multiple slides */}
            {slides.length > 1 && (
              <div className="mt-3 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhotoIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full bg-primary transition-all duration-200",
                      i === photoIdx ? "w-5" : "w-1.5 opacity-30",
                    )}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Issue summary */}
            {(item as any).issueSummary && (
              <div className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: "#FEF2DF" }}>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-white">
                  !
                </div>
                <p className="text-primary" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {(item as any).issueSummary}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
