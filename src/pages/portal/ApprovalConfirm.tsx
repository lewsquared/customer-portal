import { useNavigate, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { APPROVAL_ITEM_IMAGES, MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { getAllDecisions, type ApprovalDecision } from "@/lib/approvalDecisions";
import { cn } from "@/lib/utils";

const toTitleCase = (s: string) =>
  s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());

export default function ApprovalConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { autoApproved?: boolean } | null };
  const order = useOrderData();
  const autoApproved = state?.autoApproved ?? false;
  const items = MOCK_PORTAL_DATA.approvalItems;

  const stored = getAllDecisions();

  const decisionFor = (item: any, idx: number): ApprovalDecision => {
    if (autoApproved) return item.approvalType === "B" ? "approved" : "CP";
    return stored.get(idx) ?? "CP";
  };

  const labelFor: Record<ApprovalDecision, string> = {
    CP: "Moved to Clean & Press",
    WF: "Keeping in Wash & Fold",
    approved: "Approved for Clean & Press",
    return: "Returning uncleaned",
  };

  const colorFor: Record<ApprovalDecision, string> = {
    CP: "text-primary",
    WF: "text-muted-foreground",
    approved: "text-primary",
    return: "text-destructive",
  };

  const tagFor: Record<ApprovalDecision, string> = {
    CP: "bg-washmen-light-green text-washmen-primary",
    WF: "bg-washmen-light-aqua text-washmen-primary",
    approved: "bg-washmen-light-green text-washmen-primary",
    return: "bg-washmen-light-red text-destructive",
  };

  const cpItems = items.filter((it, i) => decisionFor(it, i) === "CP");
  const cpAddedTotal = cpItems.reduce((sum, it: any) => sum + (it.price ?? 0), 0);
  const returnItems = items.filter((it, i) => decisionFor(it, i) === "return");
  const originalEstimate = 45;
  const newTotal = originalEstimate + cpAddedTotal;

  const goEditItem = (idx: number) => {
    navigate(`/portal/${order.orderId}/approval/${idx}`, {
      state: { order, editMode: true },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      <div className="flex-1 px-6 pb-8 pt-4">
        <h1 className="text-[22px] font-bold tracking-tight text-primary">
          Confirm your items
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {autoApproved
            ? "All items auto-approved."
            : "Tap any item to change your decision before confirming."}
        </p>

        <ul className="mt-6 space-y-3">
          {items.map((item, idx) => {
            const d = decisionFor(item, idx);
            const img = APPROVAL_ITEM_IMAGES[item.id]?.original;
            return (
              <li key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => goEditItem(idx)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors active:bg-muted/40"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                    {img ? (
                      <img src={img} alt={item.brand} className="h-full w-full object-cover" />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-primary" style={{ fontSize: "15px", fontWeight: 600, lineHeight: "21px", letterSpacing: "0em" }}>
                      {toTitleCase(`${item.brand} - ${(item as any).itemType}`)}
                    </h3>
                    {d === "CP" && (item as any).price > 0 && (
                      <p className="mt-1 text-primary leading-tight" style={{ fontSize: "14px", fontWeight: 100 }}>
                        +AED {(item as any).price}
                      </p>
                    )}
                    <div className="mt-2.5">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-normal leading-tight",
                        tagFor[d]
                      )}>
                        {labelFor[d]}
                      </span>
                    </div>
                  </div>
                  <span
                    aria-label="Edit decision"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground"
                  >
                    <Pencil className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-2xl border border-border bg-card px-4 py-4">
          <div className="flex items-center justify-between py-1.5 text-sm text-muted-foreground">
            <span>Original estimate</span>
            <span className="font-medium text-foreground">AED {originalEstimate}</span>
          </div>
          {cpItems.length > 0 && (
            <div className="flex items-center justify-between py-1.5 text-sm text-muted-foreground">
              <span>{cpItems.length} {cpItems.length === 1 ? "item" : "items"} → Clean & Press</span>
              <span className="font-medium text-foreground">+AED {cpAddedTotal}</span>
            </div>
          )}
          {returnItems.length > 0 && (
            <div className="flex items-center justify-between py-1.5 text-sm text-muted-foreground">
              <span>{returnItems.length} {returnItems.length === 1 ? "item" : "items"} → Returning uncleaned</span>
              <span className="font-medium text-foreground">No charge</span>
            </div>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-semibold text-foreground">New total</span>
            <span className="text-lg font-extrabold text-primary">AED {newTotal}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl px-4 py-3" style={{ backgroundColor: "#FEF2DF" }}>
          <p className="text-primary" style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>
            Processing begins immediately after confirmation. The new total above will be added to your final invoice.
          </p>
        </div>
      </div>

      <div
        className="px-6 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <button
          type="button"
          onClick={() => navigate(`/portal/${order.orderId}/approval/preferences`, { state: { order } })}
          className="w-full rounded-[6px] bg-primary h-12 text-base font-semibold text-primary-foreground shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
