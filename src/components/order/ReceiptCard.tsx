import { ChevronRight, Receipt } from "lucide-react";

interface Props {
  itemCount: number;
  services: string[];
  total: string;
}

export const ReceiptCard = ({ itemCount, services, total }: Props) => {
  return (
    <section
      className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5 shadow-card animate-fade-in"
      style={{ animationDelay: "220ms" }}
      aria-label="Receipt summary"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <Receipt className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Receipt
            </div>
            <div className="text-sm font-bold text-primary">
              {itemCount} items · <span className="tabular">{total}</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-accent-foreground/80 hover:text-primary">
          View full
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {services.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-lavender-soft px-3 py-1 text-xs font-semibold text-primary"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
};
