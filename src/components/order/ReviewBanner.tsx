import { ClipboardList, ArrowRight } from "lucide-react";

interface Props {
  count?: number;
}

export const ReviewBanner = ({ count = 3 }: Props) => {
  return (
    <section className="mt-5 px-5 animate-fade-in" style={{ animationDelay: "60ms" }}>
      <button
        type="button"
        className="group flex w-full items-center gap-3 rounded-xl border border-warning/40 bg-warning/15 p-4 text-left transition-transform duration-100 ease-out hover:bg-warning/20 active:duration-75 active:scale-[0.99]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning text-primary">
          <ClipboardList className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-primary leading-tight">
            {count} {count === 1 ? "item needs" : "items need"} your review
          </p>
          <p className="mt-0.5 text-xs font-medium text-primary/70 leading-snug">
            Approve before we start processing
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
      </button>
    </section>
  );
};
