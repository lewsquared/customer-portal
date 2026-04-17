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

const wrapperOffset: Record<HeroVariant, string> = {
  received: "mt-5",
  processing: "mt-5",
  delivery: "mt-5",
  complete: "mt-5",
  hold: "mt-5",
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
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur ${
                onHold ? "bg-destructive/15 text-destructive" : "bg-card/70 text-primary"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${onHold ? "bg-destructive animate-pulse" : `bg-success ${completed ? "" : "animate-pulse"}`}`}
              />
              {onHold ? "On hold" : completed ? "Completed" : "Live"}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-primary animate-fade-in">
              {status}
            </h1>
          </div>

          <div className={`pointer-events-none shrink-0 h-24 w-24 opacity-95 ${wrapperAnim[v]} ${wrapperOffset[v]}`}>
            <HeroArt variant={v} />
          </div>
        </div>

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
    {/* body */}
    <rect x="30" y="30" width="68" height="78" rx="12" fill="url(#bag)" opacity="0.95" />
    {/* control panel */}
    <rect x="36" y="36" width="56" height="9" rx="4" fill="hsl(var(--card))" opacity="0.4" />
    <circle cx="46" cy="40" r="1.8" fill="hsl(var(--card))" />
    <circle cx="54" cy="40" r="1.8" fill="hsl(var(--card))" />
    {/* drum */}
    <circle cx="64" cy="74" r="22" fill="hsl(var(--card))" opacity="0.95" />
    <g className="animate-spin-slow" style={{ transformOrigin: "64px 74px" }}>
      <circle cx="64" cy="74" r="17" fill="hsl(var(--secondary))" />
      <circle cx="56" cy="66" r="3" fill="hsl(var(--accent))" opacity="0.85" />
      <circle cx="72" cy="70" r="2.2" fill="hsl(var(--primary))" opacity="0.6" />
      <circle cx="60" cy="82" r="2.6" fill="hsl(var(--accent))" opacity="0.7" />
      <circle cx="73" cy="80" r="1.8" fill="hsl(var(--primary))" opacity="0.5" />
    </g>
  </svg>
);

const DeliveryTruck = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    {/* truck body */}
    <rect x="14" y="32" width="60" height="42" rx="8" fill="url(#bag)" opacity="0.95" />
    {/* cab */}
    <path d="M74 42 L96 42 L110 60 L110 74 L74 74 Z" fill="hsl(var(--primary))" opacity="0.9" />
    {/* window */}
    <rect x="80" y="48" width="22" height="14" rx="3" fill="hsl(var(--card))" opacity="0.7" />
    {/* wheels */}
    <circle cx="36" cy="82" r="9" fill="hsl(var(--indigo-deep))" />
    <circle cx="36" cy="82" r="3.5" fill="hsl(var(--card))" />
    <circle cx="92" cy="82" r="9" fill="hsl(var(--indigo-deep))" />
    <circle cx="92" cy="82" r="3.5" fill="hsl(var(--card))" />
    {/* speed lines */}
    <path d="M2 60 L18 60" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    <path d="M0 70 L14 70" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const ShirtHanger = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}

    {/* soft ground shadow */}
    <ellipse cx="64" cy="116" rx="42" ry="4" fill="hsl(var(--indigo-deep))" opacity="0.12" />

    {/* welcome mat */}
    <rect x="22" y="108" width="84" height="8" rx="2" fill="hsl(var(--accent))" opacity="0.55" />
    <rect x="26" y="110" width="76" height="4" rx="1.5" fill="hsl(var(--card))" opacity="0.5" />

    {/* parcel box */}
    <rect x="34" y="58" width="60" height="50" rx="4" fill="url(#bag)" />
    {/* box top edge highlight */}
    <rect x="34" y="58" width="60" height="6" rx="2" fill="hsl(var(--card))" opacity="0.18" />
    {/* tape vertical */}
    <rect x="61" y="58" width="6" height="50" fill="hsl(var(--card))" opacity="0.25" />
    {/* tape horizontal */}
    <rect x="34" y="78" width="60" height="6" fill="hsl(var(--card))" opacity="0.25" />

    {/* garment bag draped on top of parcel */}
    <path d="M58 44 C58 40 62 38 64 40" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path
      d="M50 50 L78 50 L82 60 L46 60 Z"
      fill="url(#bagSuccess)"
      opacity="0.95"
    />
    <path d="M64 50 L64 60" stroke="hsl(var(--card))" strokeWidth="1" opacity="0.5" />

    {/* fragile / handle-with-care label */}
    <rect x="42" y="92" width="20" height="8" rx="1.5" fill="hsl(var(--card))" opacity="0.85" />
    <rect x="44" y="95" width="16" height="1.5" rx="0.75" fill="hsl(var(--primary))" opacity="0.5" />

    {/* delivered seal — green check */}
    <circle cx="92" cy="46" r="14" fill="hsl(var(--success))" />
    <circle cx="92" cy="46" r="14" stroke="hsl(var(--card))" strokeWidth="2" fill="none" />
    <path
      d="M85 46 L91 52 L100 40"
      stroke="hsl(var(--card))"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* sparkles */}
    <circle cx="22" cy="34" r="2" fill="hsl(var(--accent))" className="animate-sparkle" />
    <circle cx="110" cy="74" r="1.8" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "400ms" }} />
    <circle cx="20" cy="86" r="1.6" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "750ms" }} />
  </svg>
);

const PhoneConfirm = () => (
  <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
    {bagDefs}
    {/* phone body — iPhone-like proportions */}
    <rect x="30" y="14" width="68" height="100" rx="14" fill="hsl(var(--primary))" />
    {/* inner bezel */}
    <rect x="33" y="17" width="62" height="94" rx="12" fill="hsl(var(--indigo-deep))" opacity="0.6" />
    {/* screen */}
    <rect x="36" y="20" width="56" height="88" rx="9" fill="hsl(var(--card))" />
    {/* dynamic island / notch */}
    <rect x="55" y="24" width="18" height="5" rx="2.5" fill="hsl(var(--indigo-deep))" />
    {/* check badge */}
    <circle cx="64" cy="60" r="17" fill="url(#bagSuccess)" />
    <path
      d="M55 60 L62 67 L74 53"
      stroke="hsl(var(--card))"
      strokeWidth="3.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* status lines */}
    <rect x="46" y="86" width="36" height="3" rx="1.5" fill="hsl(var(--secondary))" />
    <rect x="52" y="94" width="24" height="3" rx="1.5" fill="hsl(var(--secondary))" opacity="0.7" />
    {/* side buttons */}
    <rect x="28" y="36" width="2" height="10" rx="1" fill="hsl(var(--indigo-deep))" opacity="0.7" />
    <rect x="28" y="52" width="2" height="14" rx="1" fill="hsl(var(--indigo-deep))" opacity="0.7" />
    <rect x="98" y="44" width="2" height="18" rx="1" fill="hsl(var(--indigo-deep))" opacity="0.7" />
    {/* sparkles */}
    <circle cx="18" cy="34" r="2.2" fill="hsl(var(--accent))" className="animate-sparkle" />
    <circle cx="112" cy="38" r="2" fill="hsl(var(--accent))" className="animate-sparkle" style={{ animationDelay: "350ms" }} />
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
