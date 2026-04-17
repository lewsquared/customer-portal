import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { UpsellBanner } from "@/components/order/UpsellBanner";
import { OrderDetails, OrderConfirmations } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Just now" },
  { key: "collected", label: "Collected" },
  { key: "processing", label: "Processing" },
  { key: "delivery", label: "Out for delivery" },
  { key: "complete", label: "Completed order" },
];

const OrderReceived = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Order received"
            subtitle="We'll pick up your laundry soon"
            stages={stages}
            currentIndex={0}
            cancellable
          />

          <UpsellBanner />

          <OrderDetails defaultOpen="services" />

          <DeliveryCard
            dropoffNote="Pickup at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Tomorrow · 8:00 – 10:00 AM"
            dropoff={{ label: "Drop off at door", when: "Sun · 6:00 – 8:00 PM" }}
          />

          <OrderConfirmations stage="received" />
        </div>
      </div>
    </main>
  );
};

export default OrderReceived;
