import { Receipt, Headphones, type LucideIcon } from "lucide-react";

const actions: { icon: LucideIcon; label: string }[] = [
  { icon: Receipt, label: "View receipt" },
  { icon: Headphones, label: "Contact support" },
];

export const QuickActions = () => {
  return (
    <section className="mt-5 animate-fade-in" style={{ animationDelay: "80ms" }}>
      <div className="flex gap-3 px-5">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 shadow-card transition-all duration-200 hover:border-accent/50 active:scale-[0.97]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender-soft text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-semibold text-primary">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
