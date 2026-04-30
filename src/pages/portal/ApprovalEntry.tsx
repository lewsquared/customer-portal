import { useNavigate } from "react-router-dom";
import { OrderHeader } from "@/components/order/OrderHeader";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";

export default function ApprovalEntry() {
  const navigate = useNavigate();
  const order = useOrderData();
  const count = MOCK_PORTAL_DATA.approvalItems.length;

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate("/approval-required")}
        variant="inline"
      />

      <main className="flex-1 overflow-y-auto px-5 pb-6 pt-2">
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80"
          alt="Facility"
          className="h-[240px] w-full rounded-2xl object-cover"
        />

        <div className="mt-8 flex flex-col items-center text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-primary">
            {count} {count === 1 ? "Item" : "Items"} Need Your Approval
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Takes less than 1 minute!
          </p>
        </div>
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
