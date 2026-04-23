import { TriangleAlert } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order Received", timestamp: "Wed 24/03/26\n9:12 PM" },
  { key: "collected", label: "Order Pick Up", timestamp: "Thu 25/03/26\n8:42 AM" },
  {
    key: "items_in_process",
    label: "Items in Process",
    icon: "approval",
    pill: { label: "AWAITING APPROVAL", variant: "attention" },
  },
  { key: "delivery_today", label: "Drop Off Today" },
  { key: "driver_on_the_way", label: "Driver on the Way" },
  { key: "complete", label: "Delivered" },
];

const ApprovalRequired = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" orderType="laundry" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Approval required"
            subtitle="2 items awaiting your review"
            stages={stages}
            currentIndex={2}
            variant="received"
          />

          <ActionCard
            variant="attention"
            icon={<TriangleAlert className="h-5 w-5" strokeWidth={2.4} />}
            title="2 items need approval"
            message="You need to review and approve 2 items before they can be processed."
            countdown="2h 5m left to action"
            primaryAction={{ label: "Review items", variant: "primary" }}
          />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Drop off at door", when: "Sun · 6:00 – 8:00 PM" }}
          />

          <OrderConfirmations stage="items-in" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default ApprovalRequired;
