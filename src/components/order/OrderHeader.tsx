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

export const OrderHeader = ({ orderId, orderType, showSupport = false, onBack, variant = "standalone" }: OrderHeaderProps) => {
  const headerGradient = orderType === "finery" ? "bg-gradient-surface-finery" : "bg-gradient-surface-mint";
  const bgClass = variant === "inline" ? "bg-transparent" : `sticky top-0 z-30 ${headerGradient} backdrop-blur-md`;
  return (
    <header className={bgClass}>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>
        ) : (
          <Link
            to="/orders"
            aria-label="Back to orders"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {ORDER_TYPE_LABEL[orderType]}
          </p>
          <p className="font-display text-base font-extrabold tracking-tight text-primary tabular leading-tight">
            {orderId}
          </p>
        </div>

        {showSupport ? (
          <button
            aria-label="Contact support"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
          >
            <Headphones className="h-5 w-5" strokeWidth={2.2} />
          </button>
        ) : (
          <span className="h-11 w-11 shrink-0" aria-hidden />
        )}
      </div>
    </header>
  );
};
