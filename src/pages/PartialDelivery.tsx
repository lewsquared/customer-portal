import { Package } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const PartialDelivery = () => {
  const order = useOrderData();
  const ts = order.stageTimestamps;
  const pending = order.itemsPending ?? 3;
  const noun = pending === 1 ? "item" : "items";

  const stages: Stage[] = [
    { key: "received", label: "Order Received", timestamp: ts.received },
    { key: "collected", label: "Order Pick Up", timestamp: ts.collected },
    { key: "items_in_process", label: "Items in Process", timestamp: ts.items_in_process },
    {
      key: "approval_done",
      label: "2 items needed approval",
      icon: "approval",
      timestamp: ts.approval_completed ?? "22 Aug, 10:00 am",
    },
    { key: "delivery_today", label: "Drop Off Today", timestamp: ts.delivery_today },
    { key: "partially_delivered", label: "Order Partially Delivered", icon: "package" },
    { key: "pending_item_delivery", label: "Pending Item Delivery" },
    { key: "complete", label: "Delivered" },
  ];

  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId={order.orderId} orderType={order.orderType} showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Order partially delivered"
            subtitle={`${pending} ${noun} pending · coming tomorrow`}
            stages={stages}
            currentIndex={5}
            variant="complete"
          />

          <ActionCard
            variant="attention"
            icon={<Package strokeWidth={2.4} />}
            title={`${pending} ${noun} pending delivery`}
            message="Your remaining items will be delivered tomorrow before 08:00 pm."
            primaryAction={{ label: "View pending items", variant: "primary" }}
          />

          <DeliveryCard
            dropoffNote={order.pickupNote ?? "Picked up at door"}
            address={order.pickupLocation}
            when={ts.collected ?? order.pickupWindow}
            pickupDone
            dropoff={{ label: "Partially delivered", when: order.dropoffWindow, done: true }}
          />

          <OrderConfirmations stage="delivery" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default PartialDelivery;
