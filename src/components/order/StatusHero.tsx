import { StatusTimeline, type Stage } from "./StatusTimeline";

interface Props {
  status: string;
  subtitle: string;
  stages: Stage[];
  currentIndex: number;
}

export const StatusHero = ({ status, subtitle, stages, currentIndex }: Props) => {
  return (
    <section
      className="relative mx-5 mt-2 overflow-hidden rounded-3xl bg-gradient-hero p-6 shadow-hero animate-fade-in"
      aria-label="Order status"
    >
      <div className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 opacity-90 animate-float">
        <LaundryBag />
      </div>

      <div className="relative max-w-[70%]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Live
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-primary">
          {status}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground tabular">{subtitle}</p>
      </div>

      <div className="relative mt-6">
        <StatusTimeline stages={stages} currentIndex={currentIndex} />
      </div>
    </section>
  );
};

const LaundryBag = () => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <defs>
      <linearGradient id="bag" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#bag)"
      opacity="0.95"
    />
    <path
      d="M52 44 C52 30 56 24 64 24 C72 24 76 30 76 44"
      stroke="hsl(var(--primary))"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="56" cy="74" r="4" fill="hsl(var(--card))" opacity="0.9" />
    <circle cx="72" cy="84" r="3" fill="hsl(var(--card))" opacity="0.7" />
    <circle cx="62" cy="92" r="2.5" fill="hsl(var(--card))" opacity="0.6" />
  </svg>
);
