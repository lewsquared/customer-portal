import { ChevronLeft, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  orderId: string;
  showSupport?: boolean;
}

export const OrderHeader = ({ orderId, showSupport = false }: Props) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-mint backdrop-blur-md">
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <Link
          to="/"
          aria-label="Back to demo"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
        </Link>

        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Laundry Order</span>
          <span className="mt-0.5 font-mono text-base font-bold text-primary tabular">{orderId}</span>
        </div>

        {showSupport ? (
          <button
            aria-label="Contact support"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
          >
            <Headphones className="h-5 w-5" strokeWidth={2.2} />
          </button>
        ) : (
          <span className="h-11 w-11" aria-hidden />
        )}
      </div>
    </header>
  );
};
