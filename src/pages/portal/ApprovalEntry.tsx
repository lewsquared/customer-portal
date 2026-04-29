import { useNavigate } from "react-router-dom";
import { Shirt } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { UrgencyStrip } from "@/components/portal/UrgencyStrip";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";

export default function ApprovalEntry() {
  const navigate = useNavigate();
  const order = useOrderData();
  const items = MOCK_PORTAL_DATA.approvalItems;

  return (
    <div className="min-h-screen bg-background pb-12">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />

      <div className="px-5 pt-2">
        <UrgencyStrip count={items.length} timeLeft="2h 45m left" />
      </div>

      <div className="flex flex-col items-center px-6 pt-10 text-center">
        <div className="relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secondary">
            <Shirt className="h-14 w-14 text-primary" strokeWidth={1.75} />
          </div>
          <div className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-sm font-extrabold text-destructive-foreground ring-4 ring-background">
            {items.length}
          </div>
        </div>

        <p className="mt-6 text-base font-semibold text-muted-foreground">{items.length} Items</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-primary">
          Need Your Approval
        </h1>

        <button
          onClick={() =>
            navigate(`/portal/${order.orderId}/approval/0`, { state: { order } })
          }
          className="mt-8 w-full rounded-xl bg-primary py-3.5 text-base font-extrabold text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          Let's Start
        </button>

        <button
          onClick={() =>
            navigate(`/portal/${order.orderId}/approval/confirm`, {
              state: { order, autoApproved: true },
            })
          }
          className="mt-3 text-xs font-semibold text-muted-foreground active:opacity-70"
        >
          Approve all for processing
        </button>

        <p className="mt-4 text-[11px] text-muted-foreground">Takes less than 1 minute!</p>
      </div>
    </div>
  );
}
