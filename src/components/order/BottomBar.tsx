import { Navigation, HelpCircle } from "lucide-react";

export const BottomBar = () => {
  return (
    <div className="sticky bottom-0 z-30 mt-6 border-t border-border bg-card/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-press transition-all active:scale-[0.98]">
          <Navigation className="h-4 w-4" />
          Track delivery
        </button>
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-primary transition-all active:scale-[0.98]">
          <HelpCircle className="h-4 w-4" />
          Help
        </button>
      </div>
    </div>
  );
};
