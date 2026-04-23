import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderConfirmations, OrderDetails } from "@/components/order/OrderSections";
import type { Stage } from "@/components/order/StatusTimeline";

const stages: Stage[] = [
  { key: "received", label: "Order Received", timestamp: "Wed 24/03/26\n9:12 PM" },
  { key: "collected", label: "Order Pick Up", timestamp: "Thu 25/03/26\n8:42 AM" },
  { key: "items_in_process", label: "Items in Process", timestamp: "Thu 25/03/26\n1:05 PM" },
  { key: "delivery_today", label: "Drop Off Today", timestamp: "22 Aug, before 08:00 pm" },
  {
    key: "driver_on_the_way",
    label: "Driver on the Way",
    icon: "truck",
    timestamp: "22 Aug, before 08:00 pm",
  },
  { key: "complete", label: "Delivered" },
];

const DriverOnTheWay = () => {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId="CUD138" orderType="laundry" showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Driver on the way"
            subtitle="Arriving 22 Aug, before 08:00 pm"
            stages={stages}
            currentIndex={4}
            variant="delivery"
          />

          <DeliveryCard
            dropoffNote="Picked up at door"
            address="Apt 1402, Marina Heights, Dubai Marina"
            when="Thu · 8:42 AM"
            pickupDone
            dropoff={{ label: "Delivery at door", when: "22 Aug, before 08:00 pm" }}
          />

          <OrderConfirmations stage="delivery" />
          <OrderDetails locked />
        </div>
      </div>
    </main>
  );
};

export default DriverOnTheWay;
