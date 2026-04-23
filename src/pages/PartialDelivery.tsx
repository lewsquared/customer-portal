import { Package } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order Received", timestamp: "20 Aug, 9:12 pm" },
  { key: "collected", label: "Order Pick Up", timestamp: "21 Aug, 8:42 am" },
  { key: "items_in_process", label: "Items in Process", timestamp: "21 Aug, 1:05 pm" },
  { key: "approval_done", label: "2 items needed approval", icon: "approval", timestamp: "22 Aug, 10:00 am" },
  { key: "delivery_today", label: "Drop Off Today", timestamp: "23 Aug, 6:00 pm" },
  { key: "partially_delivered", label: "Order Partially Delivered", icon: "package" },
  { key: "pending_item_delivery", label: "Pending Item Delivery" },
  { key: "complete", label: "Delivered" },
];

const PartialDelivery = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" orderType="laundry" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Order partially delivered"
            subtitle="3 items pending · coming tomorrow"
            stages={stages}
            currentIndex={5}
            variant="complete"
          />

          <ActionCard
            variant="attention"
            icon={<Package className="h-5 w-5" strokeWidth={2.4} />}
            title="3 items pending delivery"
            message="Your remaining items will be delivered tomorrow before 08:00 pm."
            primaryAction={{ label: "View pending items", variant: "primary" }}
          />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Partially delivered", when: "Sat · 6:42 PM", done: true }}
          />

          <OrderConfirmations stage="delivery" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default PartialDelivery;
