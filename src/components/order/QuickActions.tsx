import { Receipt, Headphones, type LucideIcon } from "lucide-react";

const allActions: { icon: LucideIcon; label: string; flex: string; key: string }[] = [
  { key: "receipt", icon: Receipt, label: "View receipt", flex: "flex-[2]" },
  { key: "support", icon: Headphones, label: "Contact support", flex: "flex-[3]" },
];

export const QuickActions = ({ showReceipt = true }: { showReceipt?: boolean }) => {
  const actions = allActions.filter((a) => showReceipt || a.key !== "receipt");
  return (
    <section className="mt-5 animate-fade-in" style={{ animationDelay: "80ms" }}>
      <div className="flex gap-3 px-5">
        {actions.map(({ icon: Icon, label, flex }) => (
          <button
            key={label}
            className={`group ${flex} flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-3 transition-transform duration-100 ease-out hover:border-accent/50 active:duration-75 active:scale-[0.96]`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-lavender-soft text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-primary">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
