interface Props {
  size?: number;
  className?: string;
}

/**
 * Shared washing machine SVG icon.
 * Extracted from StatusHero for reuse across order surfaces.
 */
export const WashingMachineIcon = ({ size = 96, className = "" }: Props) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="washingMachineFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    {/* body */}
    <rect x="30" y="30" width="68" height="78" rx="12" fill="url(#washingMachineFill)" opacity="0.95" />
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
