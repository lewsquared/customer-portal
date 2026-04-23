import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const DriverOnTheWay = () => {
  const order = useOrderData();
  const ts = order.stageTimestamps;
  const arriving = ts.driver_on_the_way ?? order.dropoffWindow;

  const stages: Stage[] = [
    { key: "received", label: "Order Received", timestamp: ts.received },
    { key: "collected", label: "Order Pick Up", timestamp: ts.collected },
    { key: "items_in_process", label: "Items in Process", timestamp: ts.items_in_process },
    { key: "delivery_today", label: "Drop Off Today", timestamp: ts.delivery_today ?? arriving },
    {
      key: "driver_on_the_way",
      label: "Driver on the Way",
      icon: "truck",
      timestamp: arriving,
    },
    { key: "complete", label: "Delivered" },
  ];

  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId={order.orderId} orderType={order.orderType} showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Driver on the way"
            subtitle={`Arriving ${arriving}`}
            stages={stages}
            currentIndex={4}
            variant="delivery"
          />

          <DeliveryCard
            dropoffNote={order.pickupNote ?? "Picked up at door"}
            address={order.pickupLocation}
            when={ts.collected ?? order.pickupWindow}
            pickupDone
            dropoff={{ label: order.dropoffNote ?? "Delivery at door", when: arriving }}
          />

          <OrderConfirmations stage="delivery" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default DriverOnTheWay;
