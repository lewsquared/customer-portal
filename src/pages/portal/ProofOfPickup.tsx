import { useNavigate } from "react-router-dom";
import { OrderHeader } from "@/components/order/OrderHeader";
import { PhotoGrid } from "@/components/portal/PhotoGrid";
import { InfoBlock } from "@/components/portal/InfoBlock";
import { SERVICE_COLORS, SERVICE_LABELS, MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";

export default function ProofOfPickup() {
  const navigate = useNavigate();
  const order = useOrderData();
  const data = MOCK_PORTAL_DATA.pickup;

  return (
    <div className="min-h-screen bg-background pb-12">
      <OrderHeader
        orderId={order.id}
        orderType={order.type}
        onBack={() => navigate(-1)}
        variant="inline"
      />
      <div className="space-y-6 px-5 pt-2">
        <InfoBlock
          rows={[
            { label: "Picked up", value: data.timestamp },
            { label: "Address", value: data.address },
            { label: "Handover", value: data.handoverMethod === "door" ? "Left at door" : "Handed to customer" },
          ]}
        />

        <PhotoGrid photos={data.photos} />

        <section className="rounded-2xl border border-border bg-card p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">Bags collected</p>
          <ul className="space-y-2">
            {data.bags.map((bag) => (
              <li key={bag.serviceType} className="flex items-center gap-3 text-sm">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: SERVICE_COLORS[bag.serviceType] }}
                />
                <span className="flex-1 font-medium text-foreground">
                  {SERVICE_LABELS[bag.serviceType]}
                </span>
                <span className="text-muted-foreground">
                  {bag.count} bag{bag.count !== 1 ? "s" : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
