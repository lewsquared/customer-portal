import { ChevronLeft, LifeBuoy } from "lucide-react";

interface Props {
  orderId: string;
}

export const OrderHeader = ({ orderId }: Props) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-mint backdrop-blur-md">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Order</span>
          <span className="font-mono text-sm font-semibold text-primary tabular">{orderId}</span>
        </div>

        <button
          aria-label="Support"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-primary shadow-press transition-transform active:scale-95"
        >
          <LifeBuoy className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
};
