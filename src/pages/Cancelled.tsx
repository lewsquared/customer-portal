import { FileX } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { OrderConfirmations } from "@/components/order/OrderSections";
import { useOrderData } from "@/lib/useOrderData";

const Cancelled = () => {
  const order = useOrderData();
  const cancelledAt = order.cancelledAt ?? "—";

  return (
    <main className="h-screen bg-background font-sans antialiased">
      <div className="mx-auto flex h-screen max-w-md flex-col bg-background shadow-hero md:my-6 md:h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[2.25rem] md:border md:border-border">
        <OrderHeader orderId={order.orderId} orderType={order.orderType} showSupport />

        <div className="flex-1 overflow-y-auto pb-4">
          <section className="mx-5 mt-2 rounded-xl border border-border bg-muted p-5 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted-foreground/15 text-muted-foreground">
                <FileX className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">Cancelled</h2>
                <p className="mt-1 text-sm text-muted-foreground tabular">{cancelledAt}</p>
              </div>
            </div>
          </section>

          <OrderConfirmations stage="received" />
        </div>
      </div>
    </main>
  );
};

export default Cancelled;
