import { ChevronRight } from "lucide-react";
import wardrobeUrl from "@/assets/icons/my_wardrobe.svg";

export const WardrobeCard = () => {
  return (
    <div className="relative flex items-start gap-2 overflow-hidden rounded-xl border border-border bg-card p-4">
      {/* Icon tile */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-mint">
        <img src={wardrobeUrl} alt="" width={24} height={24} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pr-6">
        <p className="font-sans text-base font-bold text-primary">My Wardrobe</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Browse and track items sent to the following services:
        </p>
        <div className="mt-2 flex flex-nowrap gap-1.5">
          <Chip className="bg-washmen-light-green text-primary">Clean &amp; Press</Chip>
          <Chip className="bg-washmen-stroke text-foreground/70">Press Only</Chip>
          <Chip className="bg-washmen-light-pink text-primary">Bed &amp; Bath</Chip>
        </div>
      </div>

      {/* BETA badge — corner tab */}
      <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-warning px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-deep">
        Beta
      </span>

      {/* Chevron */}
      <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2.5} />
    </div>
  );
};

const Chip = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ${className}`}>
    {children}
  </span>
);
