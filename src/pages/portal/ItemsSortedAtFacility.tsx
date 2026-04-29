import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, Shirt, Clock, X } from "lucide-react";
import { Drawer } from "vaul";
import { OrderHeader } from "@/components/order/OrderHeader";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

const STATUS_CFG = {
  cleaned:        { label: "items cleaned",       hdr: "bg-success/10 border border-success/30",             dot: "bg-success",     pill: "bg-success/15 text-success",         text: "Cleaned",        defaultOpen: true,  review: false },
  may_be_delayed: { label: "items may be delayed", hdr: "bg-surface-attention-soft border border-warning/40", dot: "bg-warning",     pill: "bg-warning/15 text-warning-dark",    text: "May be delayed", defaultOpen: false, review: true  },
  delayed:        { label: "items delayed",        hdr: "bg-warning/10 border border-warning/30",             dot: "bg-warning",     pill: "bg-warning/10 text-warning-dark",    text: "Delayed",        defaultOpen: false, review: false },
  uncleaned:      { label: "items uncleaned",      hdr: "bg-destructive/10 border border-destructive/30",     dot: "bg-destructive", pill: "bg-destructive/10 text-destructive", text: "Uncleaned",      defaultOpen: false, review: false },
} as const;

type StatusKey = keyof typeof STATUS_CFG;

export default function ItemsSortedAtFacility() {
  const navigate = useNavigate();
  const order = useOrderData();
  const allItems = MOCK_PORTAL_DATA.facilityItems;
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ cleaned: true });
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const byStatus = (s: string) => allItems.filter((i) => i.status === s);

  return (
    <div className="min-h-screen bg-background pb-12">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      <div className="px-5 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
            <Shirt className="h-4.5 w-4.5" />
          </span>
          <h1 className="text-base font-bold text-primary">Items Sorted at Facility</h1>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Updated as items are sorted · Tap an item to see details
        </p>
      </div>

      <div className="space-y-4 px-5">
        {(["cleaned", "may_be_delayed", "delayed", "uncleaned"] as const).map((status) => {
          const items = byStatus(status);
          if (!items.length) return null;
          const cfg = STATUS_CFG[status];
          const isOpen = openSections[status] ?? cfg.defaultOpen;

          return (
            <section key={status}>
              <button
                onClick={() => setOpenSections((v) => ({ ...v, [status]: !isOpen }))}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left",
                  cfg.hdr
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {items.length} {cfg.label}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className="overflow-hidden rounded-xl border border-border bg-card text-left transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
                    >
                      <div className="relative flex aspect-square items-center justify-center bg-secondary text-3xl">
                        ▦
                        {item.issues?.[0] && (
                          <span
                            className="absolute h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-card"
                            style={{
                              left: `${item.issues[0].photoCoords?.x ?? 50}%`,
                              top: `${item.issues[0].photoCoords?.y ?? 50}%`,
                            }}
                          />
                        )}
                        {(item as any).rejectedBy && (
                          <span className="absolute right-1.5 top-1.5 rounded-full bg-card/90 px-1.5 py-0.5 text-[9px] font-semibold text-foreground">
                            By {(item as any).rejectedBy}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 px-3 py-2.5">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item.brand}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{item.itemType}</p>
                        <div className="flex flex-wrap items-center gap-1 pt-0.5">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                              cfg.pill
                            )}
                          >
                            {cfg.text}
                          </span>
                          {item.issues?.[0] && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                              {item.issues[0].type}
                            </span>
                          )}
                        </div>
                        {cfg.review && (
                          <div className="pt-1.5">
                            <span className="inline-block rounded-full bg-warning px-2.5 py-1 text-[10px] font-semibold text-warning-foreground">
                              Review
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <Drawer.Root open={!!activeItem} onOpenChange={(o) => !o && setActiveItem(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col rounded-t-3xl border-t border-border bg-card">
            {activeItem && (
              <>
                <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-muted" />
                <div className="relative px-5 pt-3 pb-3 text-center">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="absolute right-4 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <Drawer.Title className="text-sm font-bold text-primary">
                    {activeItem.brand} — {activeItem.itemType}
                  </Drawer.Title>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    ● ({activeItem.itemNumber})
                  </p>
                </div>

                <div className="space-y-5 overflow-y-auto px-5 pb-8 pt-2">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                      <div className="flex h-full w-full items-center justify-center text-6xl">▦</div>
                      {activeItem.issues?.slice(0, 2).map((iss: any, i: number) => (
                        <span
                          key={i}
                          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive ring-2 ring-card"
                          style={{ left: `${iss.photoCoords?.x ?? 50}%`, top: `${iss.photoCoords?.y ?? 50}%` }}
                          aria-label={iss.type === "stain" ? "Stained" : "Damaged"}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-secondary"
                        />
                      ))}
                    </div>
                  </div>

                  {activeItem.issues?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                          !
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          Hard stain & damage
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2.5">
                        <Clock className="h-4 w-4 shrink-0 text-warning-dark" />
                        <span className="text-xs font-semibold text-foreground">
                          Items might be delayed
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Time log</p>
                    <div className="space-y-0">
                      {activeItem.timeline.map((ev: any, i: number) => (
                        <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                          {i < activeItem.timeline.length - 1 && (
                            <span className="absolute left-[7px] top-4 h-full w-px bg-border" />
                          )}
                          <span
                            className={cn(
                              "relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                              ev.done
                                ? "border-success bg-success text-success-foreground"
                                : "border-border bg-card"
                            )}
                          >
                            {ev.done && <Check className="h-2.5 w-2.5" />}
                          </span>
                          <div className="flex-1">
                            <p
                              className={cn(
                                "text-xs",
                                ev.isHighlight
                                  ? "font-semibold text-destructive"
                                  : "font-medium text-foreground"
                              )}
                            >
                              {ev.event}
                            </p>
                            <p className="text-[11px] text-muted-foreground">{ev.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
