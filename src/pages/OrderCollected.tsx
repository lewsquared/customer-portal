import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderDetails, OrderConfirmations } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Wed 9:12 PM" },
  { key: "collected", label: "Collected", timestamp: "Just now" },
  { key: "processing", label: "Processing" },
  { key: "delivery", label: "Out for delivery" },
  { key: "complete", label: "Delivered" },
];

const OrderCollected = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Order collected"
            subtitle="Your laundry is on its way to our facility"
            stages={stages}
            currentIndex={1}
            variant="delivery"
          />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Today · 8:42 AM"
            pickupDone
            dropoff={{ label: "Drop off at door", when: "Sun · 6:00 – 8:00 PM" }}
            defaultOpen={false}
          />

          <OrderConfirmations stage="collected" />

          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default OrderCollected;
