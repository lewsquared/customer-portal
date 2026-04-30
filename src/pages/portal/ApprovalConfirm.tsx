import { useNavigate, useLocation } from "react-router-dom";
import { Shirt } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";

import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

export default function ApprovalConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { autoApproved?: boolean } | null };
  const order = useOrderData();
  const autoApproved = state?.autoApproved ?? false;
  const items = MOCK_PORTAL_DATA.approvalItems;

  const getDecision = (item: any) =>
    autoApproved ? (item.approvalType === "B" ? "approved" : "CP") : "CP";

  const color = (d: string) =>
    d === "CP" || d === "approved"
      ? "text-primary"
      : d === "return"
      ? "text-destructive"
      : "text-success";

  const label = (d: string) =>
    d === "CP"
      ? "Clean & Press"
      : d === "return"
      ? "Return uncleaned"
      : d === "approved"
      ? "Approved for CP"
      : "Wash & Fold";

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      <div className="flex-1 px-6 pb-8 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Final step
        </p>
        <h1 className="mt-2 text-[22px] font-bold tracking-tight text-primary">
          Review your decisions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {autoApproved ? "All items auto-approved." : "Confirm before we continue processing."}
        </p>

        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {items.map((item) => {
            const d = getDecision(item);
            return (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Shirt className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.brand}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.itemType}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-semibold", color(d))}>{label(d)}</p>
                  {d === "CP" && (item as any).price > 0 && (
                    <p className="text-[11px] text-muted-foreground">
                      +AED {(item as any).price}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-2xl border border-border bg-card px-4 py-4">
          {[
            ["Original estimate", "AED 45"],
            ["2 items → Clean & Press", "+AED 26"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="flex items-center justify-between py-1.5 text-sm text-muted-foreground"
            >
              <span>{l}</span>
              <span className="font-medium text-foreground">{v}</span>
            </div>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-semibold text-foreground">New total</span>
            <span className="text-lg font-extrabold text-primary">AED 71</span>
          </div>
        </div>
      </div>

      <div
        className="px-6 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <button
          type="button"
          onClick={() => navigate(`/portal/${order.orderId}/approval/preferences`, { state: { order } })}
          className="w-full rounded-[6px] bg-primary h-12 text-base font-normal text-primary-foreground shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]"
        >
          Confirm Decisions
        </button>
      </div>
    </div>
  );
}
