import { Package } from "lucide-react";

import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, ServicesSelection, OrderInstructions } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const PendingItemDelivery = () => {
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
    { key: "partially_delivered", label: "Order Partially Delivered", timestamp: ts.partially_delivered },
    { key: "pending_item_delivery", label: "Pending Item Delivery", icon: "truck" },
    { key: "complete", label: "Delivered" },
  ];

  return (
    <main className="h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="min-h-[calc(100%+120px)]">
          <StatusHero
            status="Pending item delivery"
            subtitle="Today, before 08:00 pm"
            orderType={order.orderType}
            orderId={order.orderId}
            showSupport
            stages={stages}
            currentIndex={6}
            variant="delivery"
          />

          <ActionCard
            variant="attention"
            icon={<Package strokeWidth={2.4} />}
            title={`Pending delivery today`}
            message={`Your remaining ${pending} ${noun} arrive today before 08:00 pm.`}
            primaryAction={{ label: "View pending items", variant: "primary" }}
          />

          <DeliveryCard
            dropoffNote={order.pickupNote ?? "Picked up at door"}
            address={order.pickupLocation}
            when={ts.collected ?? order.pickupWindow}
            pickupDone
            dropoff={{ label: "Remaining items", when: "Today · before 08:00 PM" }}
          />

          <OrderConfirmations stage="delivery" orderId={order.orderId} order={order} />
          <ServicesSelection locked />
          <OrderInstructions locked />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendingItemDelivery;
