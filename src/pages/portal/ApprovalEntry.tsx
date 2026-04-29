import { useNavigate } from "react-router-dom";
import { OrderHeader } from "@/components/order/OrderHeader";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";

export default function ApprovalEntry() {
  const navigate = useNavigate();
  const order = useOrderData();
  const items = MOCK_PORTAL_DATA.approvalItems;

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      {/* Hero image */}
      <div className="relative mx-5 mt-3 overflow-hidden rounded-2xl" style={{ height: 240 }}>
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80"
          alt="Items needing approval"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col items-center px-6 pt-7 text-center">
        <h1 className="font-sans text-2xl font-extrabold text-primary">
          {items.length} Item{items.length !== 1 ? "s" : ""} Need Your Approval
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We need a quick confirmation before we can continue processing your order.
        </p>
        <p className="mt-5 text-xs text-muted-foreground">Takes under a minute</p>
      </div>

      {/* Sticky bottom CTA */}
      <div
        className="border-t border-border bg-background px-5 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <button
          type="button"
          onClick={() =>
            navigate(`/portal/${order.orderId}/approval/0`, { state: { order } })
          }
          className="w-full rounded-xl bg-primary py-3.5 font-sans text-base font-extrabold text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          Start Review
        </button>
      </div>
    </div>
  );
}
