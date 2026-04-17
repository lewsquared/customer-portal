import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { QuickActions } from "@/components/order/QuickActions";
import { DeliveryCard } from "@/components/order/DeliveryCard";

import { OrderSections } from "@/components/order/OrderSections";
import { BottomBar } from "@/components/order/BottomBar";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order received", timestamp: "Wed 9:12 PM", description: "We got your request and scheduled pickup." },
  { key: "collected", label: "Collected", timestamp: "Thu 8:42 AM", description: "Driver picked up 1 bag from your address." },
  { key: "processing", label: "Processing", timestamp: "Thu 1:05 PM", description: "Wash, dry, and iron in progress at the facility." },
  { key: "delivery", label: "Out for delivery", timestamp: "Today, anytime", description: "Driver is heading your way today." },
  { key: "complete", label: "Delivered", description: "Your order will be marked complete on drop-off." },
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
          />

          <QuickActions />

          <DeliveryCard
            dropoffNote="Delivery at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Sat · Anytime today"
          />

          <ReceiptCard
            itemCount={18}
            services={["Wash & Fold", "Iron", "Eco rinse"]}
            total="AED 142.00"
          />

          <OrderSections />
        </div>

        <BottomBar />
      </div>
    </main>
  );
};

export default Index;
