import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  ORDER_TYPE_LABEL,
  STATUS_LABEL,
  STATUS_TO_CATEGORY,
  type OrderData,
  type OrderStatus,
} from "@/lib/order-types";
import { OrderTypeIcon } from "@/components/order/OrderTypeIcon";

export interface OrderCardProps {
  order: OrderData;
}

const STATUS_TO_ROUTE: Record<OrderStatus, string> = {
  received: "/order-received",
  collected: "/order-collected",
  items_in_process: "/processing",
  delivery_today: "/out-for-delivery",
  driver_on_the_way: "/driver-on-the-way",
  approval_required: "/approval-required",
  partially_delivered: "/partial-delivery",
  pending_item_delivery: "/pending-item-delivery",
  payment_failed: "/payment-failed",
  complete: "/order-complete",
  cancelled: "/cancelled",
  // TODO: build dedicated /laundry-bag-requested page
  laundry_bag_requested: "/order-received",
};

const cardBgForStatus = (status: OrderStatus): string => {
  const cat = STATUS_TO_CATEGORY[status];
  switch (cat) {
    case "in_flight":
      return "bg-surface-in-flight";
    case "needs_attention_soft":
      return "bg-surface-attention-soft";
    case "needs_attention_urgent":
      return "bg-surface-attention-urgent";
    case "special":
      return "bg-surface-special";
    case "completed":
      return "bg-card";
  }
};

const tileBgForStatus = (status: OrderStatus): string => {
  const category = STATUS_TO_CATEGORY[status];
  switch (category) {
    case "in_flight":
      return "bg-tile-in-flight";
    case "needs_attention_soft":
      return "bg-tile-attention-soft";
    case "needs_attention_urgent":
      return "bg-tile-attention-urgent";
    case "special":
      return "bg-tile-special";
    default:
      return "bg-card"; // past orders stay white
  }
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const { orderId, orderType, status, listTimestamp } = order;
  const isCompleted = STATUS_TO_CATEGORY[status] === "completed";
  const route = STATUS_TO_ROUTE[status];
  const cardBg = cardBgForStatus(status);
  const tileBg = tileBgForStatus(status);
  const isApproval = status === "approval_required";
  const isPaymentFailed = status === "payment_failed";

  return (
    <Link
      to={route}
      state={{ order }}
      className={`flex items-center gap-3 rounded-xl border border-black/[0.06] ${cardBg} px-3.5 py-3.5 transition-transform active:scale-[0.99]`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${tileBg}`}>
        <OrderTypeIcon orderType={orderType} size={32} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm tracking-tight">
          <span className="font-semibold text-primary">{ORDER_TYPE_LABEL[orderType]}</span>{" "}
          <span className="font-medium text-primary/70">{orderId}</span>
        </p>
        <p
          className={`mt-0.5 truncate text-xs ${
            isApproval
              ? "font-bold text-warning-dark"
              : isPaymentFailed
                ? "font-bold text-destructive"
                : "text-muted-foreground"
          }`}
        >
          {isCompleted ? listTimestamp : STATUS_LABEL[status]}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
    </Link>
  );
};
