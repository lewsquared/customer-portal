interface Props {
  size?: number;
  className?: string;
}

/**
 * Shared laundry bag SVG icon.
 * Extracted from StatusHero for reuse across the order surfaces.
 */
export const LaundryBagIcon = ({ size = 96, className = "" }: Props) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="laundryBagFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#laundryBagFill)"
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
