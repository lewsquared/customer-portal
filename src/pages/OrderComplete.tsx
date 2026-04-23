import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "20 Aug, 9:12 pm" },
  { key: "collected", label: "Collected", timestamp: "21 Aug, 8:42 am" },
  { key: "processing", label: "Processing", timestamp: "21 Aug, 1:05 pm" },
  { key: "delivery", label: "Out for delivery", timestamp: "23 Aug, 11:20 am" },
  { key: "complete", label: "Delivered", timestamp: "23 Aug, 4:48 pm" },
];

const OrderComplete = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD135" orderType="laundry" />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Completed order"
            subtitle="Delivered Sat 26/03/26 at 4:49 PM"
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
