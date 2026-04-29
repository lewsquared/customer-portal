import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Shirt, Package } from "lucide-react";
import { OrderHeader } from "@/components/order/OrderHeader";
import { PhotoGrid } from "@/components/portal/PhotoGrid";
import { InfoBlock } from "@/components/portal/InfoBlock";
import { MOCK_PORTAL_DATA } from "@/lib/portal-mock-data";
import { useOrderData } from "@/lib/useOrderData";
import { cn } from "@/lib/utils";

interface PkgItem {
  brand: string;
  stainStatus?: "removed" | "not-removed";
}
interface Pkg {
  label: string;
  count: number;
  items: PkgItem[] | null;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  packages: Pkg[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openPkg: Record<number, boolean>;
  setOpenPkg: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

const Section = ({ icon, title, packages, open, setOpen, openPkg, setOpenPkg }: SectionProps) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <button
      onClick={() => setOpen((v) => !v)}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        {icon}
      </span>
      <span className="flex-1 text-sm font-semibold text-foreground">{title}</span>
      <span className="text-xs text-muted-foreground">{packages.length}</span>
      <ChevronDown
        className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
      />
    </button>

    {open && (
      <div className="border-t border-border">
        {packages.map((pkg, pi) => (
          <div key={pi} className="border-b border-border last:border-b-0">
            <button
              onClick={() => setOpenPkg((v) => ({ ...v, [pi]: !v[pi] }))}
              className="flex w-full items-center justify-between px-5 py-3 text-left"
            >
              <span className="text-sm font-medium text-foreground">{pkg.label}</span>
              <span className="text-xs text-muted-foreground">
                {pkg.count} Item{pkg.count !== 1 ? "s" : ""} {openPkg[pi] ? "▾" : "▸"}
              </span>
            </button>

            {openPkg[pi] && (
              <div className="bg-muted/30 px-5 pb-4 pt-1">
                {pkg.items ? (
                  <ul className="space-y-2">
                    {pkg.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🛍</span>
                          <span className="text-sm font-medium text-foreground">{item.brand}</span>
                        </div>
                        {item.stainStatus && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                              item.stainStatus === "removed"
                                ? "bg-success/15 text-success"
                                : "bg-destructive/15 text-destructive"
                            )}
                          >
                            Stain {item.stainStatus === "removed" ? "removed" : "not removed"}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs italic text-muted-foreground">
                    Photos not available for large packages
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function ProofOfDelivery() {
  const navigate = useNavigate();
  const order = useOrderData();
  const data = MOCK_PORTAL_DATA.delivery;
  const [openFolded, setOpenFolded] = useState(false);
  const [openHung, setOpenHung] = useState(false);
  const [openFoldedPkg, setOpenFoldedPkg] = useState<Record<number, boolean>>({});
  const [openHungPkg, setOpenHungPkg] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-background pb-12">
      <OrderHeader
        orderId={order.orderId}
        orderType={order.orderType}
        onBack={() => navigate(-1)}
        variant="inline"
      />
      <div className="space-y-6 px-5 pt-2">
        <InfoBlock
          rows={[
            { label: "Delivered", value: data.timestamp },
            { label: "Address", value: data.address },
            { label: "Handover", value: data.handoverMethod === "door" ? "Left at door" : "Handed to customer" },
          ]}
        />

        <PhotoGrid photos={data.photos} />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Delivery Packages</h2>
          <Section
            icon={<Package className="h-5 w-5" />}
            title="Folded"
            packages={data.foldedPackages}
            open={openFolded}
            setOpen={setOpenFolded}
            openPkg={openFoldedPkg}
            setOpenPkg={setOpenFoldedPkg}
          />
          <Section
            icon={<Shirt className="h-5 w-5" />}
            title="Hung"
            packages={data.hungPackages}
            open={openHung}
            setOpen={setOpenHung}
            openPkg={openHungPkg}
            setOpenPkg={setOpenHungPkg}
          />
        </div>
      </div>
    </div>
  );
}
