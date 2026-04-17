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
  complete: "animate-float",
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
  if (variant === "complete") return <ShirtHanger />;
  if (variant === "hold") return <CardAlert />;
  if (variant === "received") return <PhoneConfirm />;
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

const ShirtHanger = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    {/* hanger hook */}
    <path
      d="M64 18 C64 12 68 10 72 13 C76 16 74 22 68 24"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* hanger bar */}
    <path
      d="M28 44 L64 26 L100 44"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* shirt body */}
    <path
      d="M28 44 L44 36 L52 44 C52 50 60 52 64 52 C68 52 76 50 76 44 L84 36 L100 44 L94 60 L84 56 L84 108 C84 110 82 112 80 112 L48 112 C46 112 44 110 44 108 L44 56 L34 60 Z"
      fill="url(#bagSuccess)"
      opacity="0.95"
    />
    {/* check badge */}
    <circle cx="92" cy="92" r="14" fill="hsl(var(--card))" />
    <circle cx="92" cy="92" r="14" stroke="hsl(var(--success))" strokeWidth="2" fill="none" />
    <path
      d="M85 92 L91 98 L100 86"
      stroke="hsl(var(--success))"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* sparkles */}
    <circle cx="22" cy="30" r="2" fill="hsl(var(--accent))" className="animate-sparkle" />
    <circle cx="106" cy="28" r="2.5" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "400ms" }} />
  </svg>
);

const PhoneConfirm = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    {/* phone body */}
    <rect x="32" y="14" width="56" height="92" rx="10" fill="hsl(var(--primary))" />
    {/* screen */}
    <rect x="37" y="22" width="46" height="76" rx="5" fill="hsl(var(--card))" />
    {/* speaker */}
    <rect x="54" y="18" width="12" height="2" rx="1" fill="hsl(var(--card))" opacity="0.5" />
    {/* check badge inside screen */}
    <circle cx="60" cy="56" r="16" fill="url(#bagSuccess)" />
    <path
      d="M52 56 L58 62 L70 50"
      stroke="hsl(var(--card))"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* status lines */}
    <rect x="44" y="80" width="32" height="3" rx="1.5" fill="hsl(var(--secondary))" />
    <rect x="48" y="88" width="24" height="3" rx="1.5" fill="hsl(var(--secondary))" opacity="0.7" />
    {/* hand / thumb holding phone */}
    <path
      d="M82 70 C92 70 100 76 100 86 L100 116 L70 116 L70 100 C70 92 74 86 82 84 Z"
      fill="hsl(35 50% 78%)"
    />
    <path
      d="M86 72 C92 72 96 76 96 82 L96 88 L82 88 L82 80 C82 76 84 72 86 72 Z"
      fill="hsl(35 55% 84%)"
    />
    {/* sparkles */}
    <circle cx="22" cy="30" r="2.2" fill="hsl(var(--accent))" className="animate-sparkle" />
    <circle cx="106" cy="34" r="2" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "350ms" }} />
    <circle cx="18" cy="62" r="1.8" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "700ms" }} />
  </svg>
);

const CardAlert = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    {/* card body */}
    <rect x="14" y="38" width="92" height="60" rx="8" fill="url(#bagAlert)" opacity="0.95" />
    {/* magnetic stripe */}
    <rect x="14" y="50" width="92" height="10" fill="hsl(var(--indigo-deep))" opacity="0.55" />
    {/* chip */}
    <rect x="24" y="68" width="14" height="11" rx="2" fill="hsl(var(--card))" opacity="0.85" />
    <path d="M24 73 L38 73 M31 68 L31 79" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.7" />
    {/* number dots */}
    <g fill="hsl(var(--card))" opacity="0.75">
      <circle cx="48" cy="86" r="1.4" />
      <circle cx="52" cy="86" r="1.4" />
      <circle cx="56" cy="86" r="1.4" />
      <circle cx="60" cy="86" r="1.4" />
      <circle cx="68" cy="86" r="1.4" />
      <circle cx="72" cy="86" r="1.4" />
      <circle cx="76" cy="86" r="1.4" />
      <circle cx="80" cy="86" r="1.4" />
    </g>
    {/* alert badge */}
    <circle cx="98" cy="34" r="16" fill="hsl(var(--destructive))" />
    <circle cx="98" cy="34" r="16" stroke="hsl(var(--card))" strokeWidth="2.5" fill="none" />
    <rect x="96" y="24" width="4" height="12" rx="2" fill="hsl(var(--card))" />
    <circle cx="98" cy="42" r="2.2" fill="hsl(var(--card))" />
  </svg>
);
