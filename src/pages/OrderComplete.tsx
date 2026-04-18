import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Wed 24/03/26\n9:12 PM" },
  { key: "collected", label: "Collected", timestamp: "Thu 25/03/26\n8:42 AM" },
  { key: "processing", label: "Processing", timestamp: "Thu 25/03/26\n1:05 PM" },
  { key: "delivery", label: "Out for delivery", timestamp: "Sat 26/03/26\n11:20 AM" },
  { key: "complete", label: "Delivered", timestamp: "Sat 26/03/26\n4:48 PM" },
];

const OrderComplete = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD135" />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Completed order"
            subtitle="Delivered Sat · 26 Mar 2026 at 4:49 PM"
            stages={stages}
            currentIndex={4}
            completed
          />

          <QuickActions />

          <OrderConfirmations stage="delivered" />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Delivered at door", when: "Sat · 4:48 PM", done: true }}
            defaultOpen={false}
          />

          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default OrderComplete;
