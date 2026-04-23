import type { OrderType } from "@/lib/order-types";
import { LaundryBagIcon } from "./LaundryBagIcon";

interface Props {
  orderType: OrderType;
  size?: number;
  className?: string;
}

export const OrderTypeIcon = ({ orderType, size = 96, className = "" }: Props) => {
  if (orderType === "laundry") {
    return <LaundryBagIcon size={size} className={className} />;
  }

  if (orderType === "shoe_bag") {
    return <ShoeIcon size={size} className={className} />;
  }

  if (orderType === "finery") {
    return <FineryBadge size={size} className={className} />;
  }

  // laundry_bag — bag with rainbow gradient fill
  return <RainbowBag size={size} className={className} />;
};

const ShoeIcon = ({ size, className }: { size: number; className: string }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="shoeFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    {/* Sneaker silhouette — side view */}
    <path
      d="M14 82 C14 76 18 72 24 72 L42 72 L56 58 C60 54 65 52 70 52 L82 52 C92 52 100 58 104 66 L112 78 C116 84 116 90 110 94 L24 94 C18 94 14 90 14 84 Z"
      fill="url(#shoeFill)"
      opacity="0.95"
    />
    {/* sole stripe */}
    <rect x="14" y="90" width="100" height="6" rx="3" fill="hsl(var(--indigo-deep))" opacity="0.65" />
    {/* laces */}
    <path
      d="M58 64 L72 60 M62 70 L78 66 M68 76 L86 72"
      stroke="hsl(var(--card))"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* toe cap */}
    <path
      d="M96 72 C100 72 104 76 104 80 L104 86 L92 86 Z"
      fill="hsl(var(--card))"
      opacity="0.35"
    />
    {/* heel detail */}
    <circle cx="26" cy="82" r="3" fill="hsl(var(--card))" opacity="0.55" />
  </svg>
);

const FineryBadge = ({ size, className }: { size: number; className: string }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="fineryFill" cx="0.35" cy="0.3" r="0.85">
        <stop offset="0%" stopColor="hsl(var(--finery-accent))" />
        <stop offset="60%" stopColor="hsl(var(--finery-primary))" />
        <stop offset="100%" stopColor="hsl(var(--finery-primary))" />
      </radialGradient>
    </defs>
    <circle cx="64" cy="64" r="56" fill="url(#fineryFill)" />
    <circle cx="64" cy="64" r="52" fill="none" stroke="hsl(var(--finery-accent))" strokeWidth="1.5" opacity="0.55" />
    <text
      x="64"
      y="78"
      textAnchor="middle"
      fontFamily="'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
      fontWeight="800"
      fontSize="42"
      letterSpacing="-2"
      fill="hsl(var(--finery-primary-foreground))"
    >
      TF
    </text>
  </svg>
);

const RainbowBag = ({ size, className }: { size: number; className: string }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rainbowBagFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(0 85% 65%)" />
        <stop offset="25%" stopColor="hsl(38 92% 60%)" />
        <stop offset="50%" stopColor="hsl(150 65% 55%)" />
        <stop offset="75%" stopColor="hsl(210 85% 60%)" />
        <stop offset="100%" stopColor="hsl(280 70% 60%)" />
      </linearGradient>
    </defs>
    <path
      d="M40 44 L88 44 C92 44 95 47 95 51 L100 102 C100 108 96 112 90 112 L38 112 C32 112 28 108 28 102 L33 51 C33 47 36 44 40 44 Z"
      fill="url(#rainbowBagFill)"
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
