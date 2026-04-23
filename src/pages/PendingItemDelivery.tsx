import { Package } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order Received", timestamp: "Wed 24/03/26\n9:12 PM" },
  { key: "collected", label: "Order Pick Up", timestamp: "Thu 25/03/26\n8:42 AM" },
  { key: "items_in_process", label: "Items in Process", timestamp: "Thu 25/03/26\n1:05 PM" },
  { key: "approval_done", label: "2 items needed approval", icon: "approval", timestamp: "Fri 26/03/26\n10:00 AM" },
  { key: "delivery_today", label: "Drop Off Today", timestamp: "Sat 27/03/26\n6:00 PM" },
  { key: "partially_delivered", label: "Order Partially Delivered", timestamp: "Sat 27/03/26\n6:42 PM" },
  { key: "pending_item_delivery", label: "Pending Item Delivery", icon: "truck" },
  { key: "complete", label: "Delivered" },
];

const PendingItemDelivery = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" orderType="laundry" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Pending item delivery"
            subtitle="Today, before 08:00 pm"
            stages={stages}
            currentIndex={6}
            variant="delivery"
          />

          <ActionCard
            variant="attention"
            icon={<Package className="h-5 w-5" strokeWidth={2.4} />}
            title="Pending delivery today"
            message="Your remaining items arrive today before 08:00 pm."
            primaryAction={{ label: "View pending items", variant: "primary" }}
          />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Remaining items", when: "Today · before 08:00 PM" }}
          />

          <OrderConfirmations stage="delivery" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default PendingItemDelivery;
