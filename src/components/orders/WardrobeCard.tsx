import { ChevronRight, Search, Shirt } from "lucide-react";

export const WardrobeCard = () => {
  return (
    <div className="relative flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
      {/* Icon tile */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-mint">
        <Shirt className="h-7 w-7 text-primary" strokeWidth={2.2} />
        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-card text-primary">
          <Search className="h-3 w-3" strokeWidth={2.6} />
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pr-6">
        <p className="font-sans text-base font-bold text-primary">My Wardrobe</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Browse and track items sent to the following services:
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip className="bg-surface-mint text-primary">Clean &amp; Press</Chip>
          <Chip className="bg-muted text-foreground/70">Press Only</Chip>
          <Chip className="bg-surface-attention-urgent text-primary">Bed &amp; Bath</Chip>
        </div>
      </div>

      {/* BETA badge */}
      <span className="absolute right-3 top-3 rounded-full bg-warning px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-indigo-deep">
        Beta
      </span>

      {/* Chevron */}
      <ChevronRight className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

const Chip = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${className}`}>
    {children}
  </span>
);
