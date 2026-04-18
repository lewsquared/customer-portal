import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { DelayBanner } from "@/components/order/DelayBanner";

import { OrderSections } from "@/components/order/OrderSections";

import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Wed 24 Mar '26\n9:12 PM" },
  { key: "collected", label: "Collected", timestamp: "Thu 25 Mar '26\n8:42 AM" },
  { key: "processing", label: "Processing", timestamp: "Thu 25 Mar '26\n1:05 PM" },
  { key: "delivery", label: "Out for delivery", timestamp: "Sat 26 Mar '26\nAnytime" },
  { key: "complete", label: "Delivered" },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD137" />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Out for delivery"
            subtitle="Today, Sat · Anytime during the day"
            stages={stages}
            currentIndex={3}
            variant="delivery"
          />

          <DelayBanner count={2} />

          <QuickActions />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Delivery at door", when: "Sat · Anytime today" }}
          />

          <OrderSections />
        </div>
      </div>
    </main>
  );
};

export default Index;
