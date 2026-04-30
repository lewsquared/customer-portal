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

      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 pb-8 pt-4">
        <img
          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80"
          alt="Facility"
          className="h-[260px] w-full object-cover"
        />

        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="text-[1.25rem] text-primary" style={{ lineHeight: 1.25, letterSpacing: "0.002em", fontWeight: 600 }}>
            {count} {count === 1 ? "item needs" : "items need"} your approval
          </h1>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
            A few of your items can't move forward without your decision.
            Anything left unapproved will be returned uncleaned.
          </p>
        </div>
      </main>

      <div
        className="px-6 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <p className="mb-3 text-center text-xs text-muted-foreground">
          Takes less than a minute
        </p>
        <button
          type="button"
          onClick={() =>
            navigate(`/portal/${order.orderId}/approval/0`, { state: { order } })
          }
          className="w-full rounded-[6px] bg-primary h-12 text-[15px] font-normal text-primary-foreground shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-[0.98]"
          style={{ letterSpacing: "0.01em" }}
        >
          Start Review
        </button>
      </div>
    </div>
  );
}
