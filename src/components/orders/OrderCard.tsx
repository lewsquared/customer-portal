import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  ORDER_TYPE_LABEL,
  STATUS_LABEL,
  STATUS_TO_CATEGORY,
  type OrderStatus,
  type OrderType,
} from "@/lib/order-types";
import { OrderTypeIcon } from "@/components/order/OrderTypeIcon";

export interface OrderCardProps {
  orderId: string;
  orderType: OrderType;
  status: OrderStatus;
  timestamp: string;
}

const STATUS_TO_ROUTE: Record<OrderStatus, string> = {
  received: "/order-received",
  collected: "/order-collected",
  items_in_process: "/processing",
  delivery_today: "/out-for-delivery", // temporary — proper delivery page later
  complete: "/order-complete",
  payment_failed: "/payment-failed",
  // TODO: route to proper state pages
  approval_required: "/order-received",
  driver_on_the_way: "/order-received",
  partially_delivered: "/order-received",
  pending_item_delivery: "/order-received",
  cancelled: "/order-received",
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

export const OrderCard = ({ orderId, orderType, status, timestamp }: OrderCardProps) => {
  const isCompleted = STATUS_TO_CATEGORY[status] === "completed";
  const route = STATUS_TO_ROUTE[status];
  const cardBg = cardBgForStatus(status);
  const isApproval = status === "approval_required";

  return (
    <Link
      to={route}
      className={`flex items-center gap-3 rounded-xl ${
        isCompleted ? "border border-border" : ""
      } ${cardBg} p-4 shadow-card transition-transform active:scale-[0.99]`}
    >
      {/* Icon tile — always white, regardless of status or type */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card">
        <OrderTypeIcon orderType={orderType} size={36} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <span className="font-bold text-primary">{ORDER_TYPE_LABEL[orderType]}</span>{" "}
          <span className="font-medium text-primary/70">{orderId}</span>
        </p>
        <p
          className={`mt-0.5 truncate text-xs ${
            isApproval ? "font-bold text-warning-dark" : "text-muted-foreground"
          }`}
        >
          {isCompleted ? timestamp : STATUS_LABEL[status]}
        </p>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </Link>
  );
};
