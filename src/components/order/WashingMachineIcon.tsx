interface Props {
  size?: number;
  className?: string;
}

/**
 * Shared washing machine SVG icon — simplified for card use.
 * Static (no spin), no control panel. The animated hero version lives in StatusHero.
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
    <rect x="26" y="22" width="76" height="84" rx="12" fill="url(#washingMachineFill)" opacity="0.95" />
    {/* drum */}
    <circle cx="64" cy="68" r="26" fill="hsl(var(--card))" opacity="0.95" />
    <circle cx="64" cy="68" r="20" fill="hsl(var(--secondary))" />
    {/* suds */}
    <circle cx="56" cy="60" r="3" fill="hsl(var(--accent))" opacity="0.85" />
    <circle cx="72" cy="64" r="2.2" fill="hsl(var(--primary))" opacity="0.6" />
    <circle cx="60" cy="76" r="2.6" fill="hsl(var(--accent))" opacity="0.7" />
  </svg>
);
