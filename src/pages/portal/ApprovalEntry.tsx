import { useNavigate } from "react-router-dom";
import { OrderHeader } from "@/components/order/OrderHeader";
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

      {/* Hero placeholder image — full width, matches SC/BC layout */}
      <div className="relative mx-5 mt-2 aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
        <img
          src="/placeholder.svg"
          alt="Items needing approval"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Item count badge */}
        <div className="absolute right-3 top-3 flex h-9 min-w-9 items-center justify-center rounded-full bg-destructive px-2.5 text-sm font-extrabold text-destructive-foreground ring-4 ring-background">
          {items.length}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-primary">
          Our team needs<br />your approval
        </h1>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Our experts have assessed {items.length} item{items.length !== 1 ? "s" : ""} and
          recommended the services needed.
        </p>

        <div className="mt-8">
          <button
            onClick={() =>
              navigate(`/portal/${order.orderId}/approval/0`, { state: { order } })
            }
            className="w-full rounded-xl bg-primary py-3.5 text-base font-extrabold text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
          >
            Start Review
          </button>

          <button
            onClick={() =>
              navigate(`/portal/${order.orderId}/approval/confirm`, {
                state: { order, autoApproved: true },
              })
            }
            className="mt-3 w-full text-center text-sm font-semibold text-muted-foreground active:opacity-70"
          >
            Approve all for processing
          </button>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Takes less than 1 minute!
          </p>
        </div>
      </div>
    </div>
  );
}
