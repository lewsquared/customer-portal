import { StatusTimeline, type Stage } from "./StatusTimeline";

export type HeroVariant = "received" | "processing" | "delivery" | "complete" | "hold";

interface Props {
  status: string;
  subtitle: string;
  stages: Stage[];
  currentIndex: number;
  cancellable?: boolean;
  completed?: boolean;
  onHold?: boolean;
  variant?: HeroVariant;
}

const wrapperAnim: Record<HeroVariant, string> = {
  received: "animate-float",
  processing: "animate-sway",
  delivery: "animate-truck-roll",
  complete: "animate-bounce-soft",
  hold: "animate-shake",
};

export const StatusHero = ({
  status,
  subtitle,
  stages,
  currentIndex,
  cancellable = false,
  completed = false,
  onHold = false,
  variant = "received",
}: Props) => {
  const v: HeroVariant = onHold ? "hold" : completed ? "complete" : variant;

  return (
    <section
      className="relative mx-5 mt-2 overflow-hidden rounded-3xl bg-gradient-hero p-6 shadow-hero animate-fade-in"
      aria-label="Order status"
    >
      <div className={`pointer-events-none absolute -right-2 -top-2 h-32 w-32 opacity-90 ${wrapperAnim[v]}`}>
        <HeroArt variant={v} />
      </div>

      <div className="relative">
        <div
          className={`inline-flex max-w-[70%] items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur ${
            onHold ? "bg-destructive/15 text-destructive" : "bg-card/70 text-primary"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${onHold ? "bg-destructive animate-pulse" : `bg-success ${completed ? "" : "animate-pulse"}`}`}
          />
          {onHold ? "On hold" : completed ? "Completed" : "Live"}
        </div>
        <h1 className="mt-3 max-w-[70%] font-display text-3xl font-extrabold leading-tight text-primary animate-fade-in">
          {status}
        </h1>
        <p className="mt-1.5 whitespace-nowrap text-sm text-muted-foreground tabular animate-fade-in" style={{ animationDelay: "80ms" }}>
          {subtitle}
        </p>
      </div>

      <div className="relative mt-6">
        <StatusTimeline
          stages={stages}
          currentIndex={currentIndex}
          onHold={onHold}
          rightSlot={
            cancellable ? (
              <button
                type="button"
                aria-label="Cancel order"
                className="inline-flex items-center rounded-full border border-destructive/30 bg-card/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-destructive shadow-press backdrop-blur transition-all hover:bg-destructive hover:text-destructive-foreground active:scale-95"
              >
                Cancel
              </button>
            ) : undefined
          }
        />
      </div>
    </section>
  );
};

const HeroArt = ({ variant }: { variant: HeroVariant }) => {
  if (variant === "processing") return <WashingMachine />;
  if (variant === "delivery") return <DeliveryTruck />;
  if (variant === "complete") return <DoneBag />;
  if (variant === "hold") return <AlertBag />;
  return <LaundryBag />;
};

const bagDefs = (
  <defs>
    <linearGradient id="bag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(var(--primary))" />
      <stop offset="100%" stopColor="hsl(var(--accent))" />
    </linearGradient>
    <linearGradient id="bagAlert" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(var(--destructive))" />
      <stop offset="100%" stopColor="hsl(var(--accent))" />
    </linearGradient>
    <linearGradient id="bagSuccess" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(var(--success))" />
      <stop offset="100%" stopColor="hsl(var(--accent))" />
    </linearGradient>
  </defs>
);

const LaundryBag = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#bag)"
      opacity="0.95"
    />
    <path d="M52 44 C52 30 56 24 64 24 C72 24 76 30 76 44" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="56" cy="74" r="4" fill="hsl(var(--card))" opacity="0.9" />
    <circle cx="72" cy="84" r="3" fill="hsl(var(--card))" opacity="0.7" />
    <circle cx="62" cy="92" r="2.5" fill="hsl(var(--card))" opacity="0.6" />
  </svg>
);

const WashingMachine = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    <rect x="24" y="22" width="80" height="92" rx="14" fill="url(#bag)" opacity="0.95" />
    <rect x="32" y="30" width="64" height="10" rx="5" fill="hsl(var(--card))" opacity="0.4" />
    <circle cx="44" cy="35" r="2" fill="hsl(var(--card))" />
    <circle cx="54" cy="35" r="2" fill="hsl(var(--card))" />
    <circle cx="64" cy="76" r="26" fill="hsl(var(--card))" opacity="0.95" />
    <g className="origin-center" style={{ transformOrigin: "64px 76px" }}>
      <g className="animate-spin-slow" style={{ transformOrigin: "64px 76px" }}>
        <circle cx="64" cy="76" r="20" fill="hsl(var(--secondary))" />
        <circle cx="56" cy="68" r="3.5" fill="hsl(var(--accent))" opacity="0.85" />
        <circle cx="72" cy="72" r="2.5" fill="hsl(var(--primary))" opacity="0.6" />
        <circle cx="60" cy="84" r="3" fill="hsl(var(--accent))" opacity="0.7" />
        <circle cx="74" cy="82" r="2" fill="hsl(var(--primary))" opacity="0.5" />
      </g>
    </g>
  </svg>
);

const DeliveryTruck = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    <rect x="14" y="50" width="60" height="42" rx="8" fill="url(#bag)" opacity="0.95" />
    <path d="M74 60 L96 60 L110 78 L110 92 L74 92 Z" fill="hsl(var(--primary))" opacity="0.85" />
    <rect x="80" y="66" width="22" height="14" rx="3" fill="hsl(var(--card))" opacity="0.6" />
    <circle cx="36" cy="98" r="9" fill="hsl(var(--indigo-deep))" />
    <circle cx="36" cy="98" r="3.5" fill="hsl(var(--card))" />
    <circle cx="92" cy="98" r="9" fill="hsl(var(--indigo-deep))" />
    <circle cx="92" cy="98" r="3.5" fill="hsl(var(--card))" />
    <path d="M6 84 L20 84" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <path d="M2 76 L16 76" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
  </svg>
);

const DoneBag = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#bagSuccess)"
      opacity="0.95"
    />
    <path d="M52 44 C52 30 56 24 64 24 C72 24 76 30 76 44" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="64" cy="80" r="18" fill="hsl(var(--card))" opacity="0.95" />
    <path d="M55 80 L62 87 L74 73" stroke="hsl(var(--success))" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="96" cy="40" r="2.5" fill="hsl(var(--accent))" className="animate-sparkle" />
    <circle cx="30" cy="36" r="2" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "300ms" }} />
    <circle cx="100" cy="80" r="2" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "600ms" }} />
  </svg>
);

const AlertBag = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#bagAlert)"
      opacity="0.95"
    />
    <path d="M52 44 C52 30 56 24 64 24 C72 24 76 30 76 44" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="64" cy="80" r="18" fill="hsl(var(--card))" opacity="0.95" />
    <rect x="62" y="70" width="4" height="12" rx="2" fill="hsl(var(--destructive))" />
    <circle cx="64" cy="88" r="2.4" fill="hsl(var(--destructive))" />
  </svg>
);
