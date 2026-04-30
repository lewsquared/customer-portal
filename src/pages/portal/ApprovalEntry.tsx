import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";

export default function ApprovalEntry() {
  const navigate = useNavigate();
  const order = useOrderData();
  const items = MOCK_PORTAL_DATA.approvalItems;
  const count = items.length;

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      <main className="flex-1 overflow-y-auto px-5 pb-6 pt-4">
        <div className="flex flex-col items-center text-center pt-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-warning/15 text-primary">
            <ClipboardList className="h-10 w-10" strokeWidth={2.2} />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-primary">
            {count} {count === 1 ? "item needs" : "items need"} your review
          </h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            We found a few items that need your decision before we can process them. It only takes a minute.
          </p>
        </div>

        <ul className="mt-8 space-y-2">
          {items.map((item, idx) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
                {idx + 1}
              </span>
              <p className="truncate text-sm font-semibold text-foreground">
                {item.brand} · {item.itemType}
              </p>
            </li>
          ))}
        </ul>
      </main>

      <div
        className="border-t border-border bg-background px-5 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <button
          type="button"
          onClick={() =>
            navigate(`/portal/${order.orderId}/approval/0`, { state: { order } })
          }
          className="w-full rounded-xl bg-primary py-3.5 font-sans text-base font-normal text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          Start Review
        </button>
      </div>
    </div>
  );
}
