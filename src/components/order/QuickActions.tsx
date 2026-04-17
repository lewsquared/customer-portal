import { CalendarClock, Headphones, type LucideIcon } from "lucide-react";

const actions: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarClock, label: "Change delivery time" },
  { icon: Headphones, label: "Contact support" },
];

export const QuickActions = () => {
  return (
    <section className="mt-5 animate-fade-in" style={{ animationDelay: "80ms" }}>
      <div className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Quick actions
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="group flex min-w-[88px] flex-1 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-card transition-all duration-200 hover:border-accent/50 active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-soft text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-xs font-semibold text-primary text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
