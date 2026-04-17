import { CreditCard, AlertTriangle, RefreshCw, ArrowRight } from "lucide-react";

interface Props {
  amount?: string;
  reason?: string;
}

export const PaymentFailedBanner = ({
  amount = "AED 142.00",
  reason = "Your card was declined",
}: Props) => {
  return (
    <section className="mt-5 px-5 animate-fade-in" style={{ animationDelay: "60ms" }}>
      <div className="overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/10 shadow-card">
        <div className="flex items-start gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
            <AlertTriangle className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-destructive leading-tight">Payment failed</p>
            <p className="mt-0.5 text-xs font-medium text-destructive/80 leading-snug">
              {reason}. We can't deliver your order until payment is captured.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <CreditCard className="h-3.5 w-3.5 text-destructive/70" />
              <span className="text-xs font-semibold text-destructive tabular">{amount} due</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t border-destructive/20 bg-card/60 p-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-destructive px-3 py-2.5 text-sm font-bold text-destructive-foreground shadow-press transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
            Retry payment
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-xl border border-destructive/30 bg-card px-3 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5 active:scale-[0.98]"
          >
            Update card
          </button>
        </div>
      </div>
    </section>
  );
};
