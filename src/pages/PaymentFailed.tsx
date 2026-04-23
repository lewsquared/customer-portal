import { TriangleAlert } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { StatusHero } from "@/components/order/StatusHero";
import { ActionCard } from "@/components/order/ActionCard";
import { DeliveryCard } from "@/components/order/DeliveryCard";
import { OrderSections } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";
import type { Stage } from "@/components/order/StatusTimeline";

const PaymentFailed = () => {
  const order = useOrderData();
  const ts = order.stageTimestamps;

  const stages: Stage[] = [
    { key: "received", label: "Order received", timestamp: ts.received },
    { key: "collected", label: "Collected", timestamp: ts.collected },
    { key: "items_in_process", label: "Items in Process", timestamp: ts.items_in_process },
    { key: "delivery_today", label: "Drop Off Today", timestamp: ts.delivery_today },
    {
      key: "driver_on_the_way",
      label: "Driver on the Way",
      icon: "hold",
      pill: { label: "ON HOLD", variant: "urgent" },
    },
    { key: "complete", label: "Delivered" },
  ];

  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId={order.orderId} orderType={order.orderType} showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <StatusHero
            status="Payment required"
            subtitle="Delivery on hold · capture payment to release"
            stages={stages}
            currentIndex={4}
            onHold
          />

          <ActionCard
            variant="urgent"
            icon={<TriangleAlert strokeWidth={2.4} />}
            title="Payment failed"
            message="Your card was declined. We can't deliver your order until payment is captured."
            amountDue={order.amountDue ?? "AED 142.00 due"}
            primaryAction={{ label: "Retry payment", variant: "primary" }}
            secondaryAction={{ label: "Update card", variant: "secondary" }}
          />

          <DeliveryCard
            dropoffNote={order.pickupNote ?? "Picked up at door"}
            address={order.pickupLocation}
            when={ts.collected ?? order.pickupWindow}
            pickupDone
            dropoff={{ label: "Delivery on hold", when: "Pending payment" }}
          />

          <OrderSections stage="delivery" />
        </div>
      </div>
    </main>
  );
};

export default PaymentFailed;
