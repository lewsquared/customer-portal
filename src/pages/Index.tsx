import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { DelayBanner } from "@/components/order/DelayBanner";

import { OrderSections } from "@/components/order/OrderSections";

import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "20 Aug, 9:12 pm" },
  { key: "collected", label: "Collected", timestamp: "21 Aug, 8:42 am" },
  { key: "processing", label: "Processing", timestamp: "21 Aug, 1:05 pm" },
  { key: "delivery", label: "Out for delivery", timestamp: "23 Aug, anytime" },
  { key: "complete", label: "Delivered" },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD137" orderType="laundry" />

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
