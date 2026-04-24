
import { StatusHero } from "@/components/order/StatusHero";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { AddBagInstructionsCard } from "@/components/order/AddBagInstructionsCard";
import { ServicesSelection, OrderInstructions, OrderConfirmations } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const OrderCollected = () => {
  const order = useOrderData();
  const ts = order.stageTimestamps;

  const stages: Stage[] = [
    { key: "received", label: "Order received", timestamp: ts.received },
    { key: "collected", label: "Collected", timestamp: ts.collected },
    { key: "processing", label: "Processing" },
    { key: "delivery", label: "Out for delivery" },
    { key: "complete", label: "Delivered" },
  ];

  return (
    <main className="h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="min-h-[calc(100%+120px)]">
            <StatusHero
              status="Order collected"
              subtitle="Your laundry is on its way to our facility"
              orderType={order.orderType}
              orderId={order.orderId}
              showSupport
              stages={stages}
              currentIndex={1}
              variant="delivery"
            />

            <AddBagInstructionsCard />

            <DeliveryCard
              dropoffNote={order.pickupNote ?? "Picked up at door"}
              address={order.pickupLocation}
              when={ts.collected ?? order.pickupWindow}
              pickupDone
              dropoff={{ label: order.dropoffNote ?? "Drop off at door", when: order.dropoffWindow }}
              defaultOpen={false}
            />

            <OrderConfirmations stage="collected" />

            <ServicesSelection locked />
            <OrderInstructions locked />
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderCollected;
