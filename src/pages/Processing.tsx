import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";

import { DeliveryCard } from "@/components/order/DeliveryCard";
import { ReviewBanner } from "@/components/order/ReviewBanner";
import { OrderSections } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Wed 24 Mar '26\n9:12 PM" },
  { key: "collected", label: "Collected", timestamp: "Thu 25 Mar '26\n8:42 AM" },
  { key: "processing", label: "Processing", timestamp: "Thu 25 Mar '26\n1:05 PM" },
  { key: "delivery", label: "Out for delivery" },
  { key: "complete", label: "Delivered" },
];

const Processing = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD137" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Cleaning at our facility"
            subtitle="Your laundry is being cared for"
            stages={stages}
            currentIndex={2}
            variant="processing"
          />

          <ReviewBanner count={3} />

          

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Drop off at door", when: "Sat · Anytime today" }}
          />

          <OrderSections stage="items-in" />
        </div>
      </div>
    </main>
  );
};

export default Processing;
