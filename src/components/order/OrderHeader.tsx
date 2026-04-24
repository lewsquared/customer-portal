import { ChevronLeft, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { ORDER_TYPE_LABEL, type OrderType } from "@/lib/order-types";

interface OrderHeaderProps {
  orderId: string;
  orderType: OrderType;
  showSupport?: boolean;
  onBack?: () => void;
  variant?: "standalone" | "inline";
}

export const OrderHeader = ({
  orderId,
  orderType,
  showSupport = false,
  onBack,
  variant = "standalone",
}: OrderHeaderProps) => {
  const headerGradient = orderType === "finery" ? "bg-gradient-surface-finery" : "bg-gradient-surface-mint";
  const bgClass = variant === "inline" ? "bg-transparent" : `sticky top-0 z-30 ${headerGradient} backdrop-blur-md`;

  const backButton = onBack ? (
    <button
      type="button"
      onClick={onBack}
      aria-label="Back"
      className="absolute left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-90"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
    </button>
  ) : (
    <Link
      to="/orders"
      aria-label="Back to orders"
      className="absolute left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-90"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
    </Link>
  );

  return (
    <header className={bgClass}>
      <div className={`relative flex items-center justify-center px-5 min-h-[60px] ${variant === "inline" ? "pt-4 pb-5" : "pt-6 pb-5"}`}>
        {backButton}

        <div className="inline-block w-max mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {ORDER_TYPE_LABEL[orderType]}
          </p>
          <div className="grid leading-tight">
            <span
              className="row-start-1 col-start-1 block text-center text-base font-extrabold tracking-tight text-primary tabular whitespace-nowrap"
              style={{ opacity: 1 - morph }}
            >
              {orderId}
            </span>
            <span
              className="row-start-1 col-start-1 block text-center text-base font-extrabold tracking-tight text-primary whitespace-nowrap"
              style={{ opacity: morph }}
              aria-hidden={morph < 0.5}
            >
              {status ?? orderId}
            </span>
          </div>
        </div>

        {showSupport && (
          <button
            aria-label="Contact support"
            className="absolute right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-90"
          >
            <Headphones className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  );
};
