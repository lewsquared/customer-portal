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
        <h1 className="text-xl leading-tight text-primary" style={{ fontWeight: 700 }}>
          Confirm Your Items
        </h1>
        <p className="mt-1 text-[0.875rem] leading-tight text-muted-foreground">
          {autoApproved
            ? "All items have been auto-approved based on your preferences."
            : "Tap any item to change your decision before confirming."}
        </p>

        <ul className="mt-6 space-y-3">
          {items.map((item, idx) => {
            const d = decisionFor(item, idx);
            const img = APPROVAL_ITEM_IMAGES[item.id]?.original;
            return (
              <li key={item.id} className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => goEditItem(idx)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors active:bg-muted/40"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                    {img ? (
                      <img src={img} alt={item.brand} className="h-full w-full object-cover" />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-primary" style={{ fontSize: "13px", fontWeight: 600, lineHeight: "18px", letterSpacing: "0em" }}>
                      {toTitleCase(`${item.brand} - ${(item as any).itemType}`)}
                    </h3>
                    {d === "CP" && (item as any).price > 0 && (
                      <p className="mt-1 text-primary leading-tight" style={{ fontSize: "12px", fontWeight: 100 }}>
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

        {(cpAddedTotal > 0 || returnItems.length > 0) && (
          <div className="mt-5 rounded-xl rounded-b-none border border-border bg-card px-4 py-3">
            {cpAddedTotal > 0 && (
              <p className="text-primary" style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>
                <span style={{ fontWeight: 600 }}>AED {cpAddedTotal}</span> will be added to your final bill for the {cpItems.length === 1 ? "item" : `${cpItems.length} items`} moving to Clean & Press
              </p>
            )}
            {returnItems.length > 0 && (
              <p className={cn("text-primary", cpAddedTotal > 0 && "mt-1.5")} style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>
                {returnItems.length === 1 ? "1 item" : `${returnItems.length} items`} will be returned uncleaned at no charge
              </p>
            )}
          </div>
        )}

        <div className="rounded-xl rounded-t-none px-4 py-3" style={{ backgroundColor: "#FEF2DF" }}>
          <p className="text-primary" style={{ fontSize: "11px", lineHeight: "15px", fontWeight: 100 }}>
            Processing will begin immediately after confirmation. The new total above will be added to your final invoice.
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
          className="w-full rounded-[6px] bg-primary h-[42px] text-[14px] leading-[20px] font-normal text-primary-foreground shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
