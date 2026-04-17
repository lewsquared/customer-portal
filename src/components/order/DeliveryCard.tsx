import { Pencil, MapPin, Clock } from "lucide-react";

interface Props {
  address: string;
  when: string;
  dropoffNote: string;
}

export const DeliveryCard = ({ address, when, dropoffNote }: Props) => {
  return (
    <section
      className="mx-5 mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "160ms" }}
      aria-label="Delivery details"
    >
      {/* Stylized map */}
      <div className="relative h-24 w-full overflow-hidden bg-secondary">
        <MapStrip />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-4 ring-card" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Delivery
            </div>
            <h3 className="mt-1 font-display text-lg font-bold text-primary">{dropoffNote}</h3>
          </div>
          <button
            aria-label="Edit delivery"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary transition-transform active:scale-95"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Row icon={MapPin} label="Where" value={address} />
          <Row icon={Clock} label="When" value={when} />
        </div>
      </div>
    </section>
  );
};

const Row = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
      <Icon className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold text-primary leading-snug">{value}</div>
    </div>
  </div>
);

const MapStrip = () => (
  <svg viewBox="0 0 400 96" preserveAspectRatio="none" className="h-full w-full">
    <rect width="400" height="96" fill="hsl(var(--mint))" />
    <g stroke="hsl(var(--mint-strong))" strokeWidth="6" fill="none" strokeLinecap="round">
      <path d="M-10 30 Q 80 50 160 30 T 410 50" />
      <path d="M-10 70 Q 100 40 220 70 T 410 60" />
    </g>
    <g fill="hsl(var(--card))" opacity="0.7">
      <rect x="40" y="14" width="40" height="22" rx="4" />
      <rect x="120" y="58" width="50" height="20" rx="4" />
      <rect x="240" y="18" width="36" height="22" rx="4" />
      <rect x="320" y="62" width="44" height="22" rx="4" />
    </g>
  </svg>
);
