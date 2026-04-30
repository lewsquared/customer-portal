import { useNavigate, useLocation } from "react-router-dom";
import { Shirt } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { BottomActionBar } from "@/components/order/BottomActionBar";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

export default function ApprovalConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = useOrderData();
  const autoApproved = state?.autoApproved ?? false;
  const items = MOCK_PORTAL_DATA.approvalItems;

  const getDecision = (item: any) => {
    if (autoApproved) return item.approvalType === "B" ? "approved" : "CP";
    return "CP"; // demo fallback — real app reads from state/context
  };

  const decisionColor = (d: string) =>
    d === "CP" || d === "approved" ? "text-primary" : d === "return" ? "text-destructive" : "text-success";

  const decisionLabel = (d: string) =>
    d === "CP"
      ? "Clean & Press"
      : d === "return"
        ? "Return uncleaned"
        : d === "approved"
          ? "Approved for CP"
          : "Wash & Fold";

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <OrderHeader orderId={order.orderId} orderType={order.orderType} onBack={() => navigate(-1)} variant="inline" />

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Decision summary card */}
        <section
          className="mx-5 mt-4 overflow-hidden rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "30ms" }}
        >
          {items.map((item) => {
            const d = getDecision(item);
            return (
              <div key={item.id} className="flex items-center gap-3 border-b border-border/60 px-4 py-3 last:border-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Shirt className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-primary">
                    {item.brand} · {item.itemType}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-bold", decisionColor(d))}>{decisionLabel(d)}</p>
                  {d === "CP" && (item as any).price > 0 && (
                    <p className="text-[10px] text-muted-foreground">+AED {(item as any).price}</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Billing block */}
        <section
          className="mx-5 mt-3 rounded-xl border border-border bg-card p-4 animate-fade-in"
          style={{ animationDelay: "80ms" }}
        >
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Order update</p>
          {[
            ["Original estimate", "AED 45"],
            ["2 items → Clean & Press", "+AED 26"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-1">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-xs font-semibold tabular-nums">{value}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-border pt-2 mt-1">
            <span className="text-sm font-bold text-primary">New total</span>
            <span className="text-sm font-bold text-primary tabular-nums">AED 71</span>
          </div>
        </section>
      </main>

      <BottomActionBar
        primaryLabel="Confirm Decisions"
        onPrimaryClick={() =>
          navigate(`/portal/${order.orderId}/approval/preferences`, {
            state: { order },
          })
        }
        onBack={() => navigate(-1)}
      />
    </div>
  );
}
