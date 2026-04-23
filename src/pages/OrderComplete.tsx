import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const OrderComplete = () => {
  const order = useOrderData();
  const ts = order.stageTimestamps;

  const stages: Stage[] = [
    { key: "received", label: "Order received", timestamp: ts.received },
    { key: "collected", label: "Collected", timestamp: ts.collected },
    { key: "processing", label: "Processing", timestamp: ts.items_in_process },
    { key: "delivery", label: "Out for delivery", timestamp: ts.delivery_today },
    { key: "complete", label: "Delivered", timestamp: ts.complete },
  ];

  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId={order.orderId} orderType={order.orderType} />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Completed order"
            subtitle={ts.complete ? `Delivered ${ts.complete}` : "Delivered"}
            orderType={order.orderType}
            stages={stages}
            currentIndex={4}
            completed
          />

          <QuickActions />

          <OrderConfirmations stage="delivered" />

          <DeliveryCard
            dropoffNote={order.pickupNote ?? "Picked up at door"}
            address={order.pickupLocation}
            when={ts.collected ?? order.pickupWindow}
            pickupDone
            dropoff={{
              label: order.dropoffNote ?? "Delivered at door",
              when: ts.complete ?? order.dropoffWindow,
              done: true,
            }}
            defaultOpen={false}
          />

          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default OrderComplete;
