import type { OrderType } from "@/lib/order-types";
import { WashingMachineIcon } from "./WashingMachineIcon";
import theFineryUrl from "@/assets/icons/the-finery.svg";
import laundryBagsUrl from "@/assets/icons/laundry-bags.svg";

interface Props {
  orderType: OrderType;
  size?: number;
  className?: string;
}

export const OrderTypeIcon = ({ orderType, size = 96, className = "" }: Props) => {
  if (orderType === "laundry") {
    return <WashingMachineIcon size={size} className={className} />;
  }

  if (orderType === "shoe_bag") {
    return <ShoeAndBagIcon size={size} className={className} />;
  }

  if (orderType === "finery") {
    return (
      <img
        src={theFineryUrl}
        alt=""
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      />
    );
  }

  // laundry_bag — colorful stacked laundry bags asset
  return (
    <img
      src={laundryBagsUrl}
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  );
};

/**
 * Shoe + bag icon — a tote bag with a small ankle boot in front.
 * Communicates the dual scope of the Shoe & Bag service.
 */
const ShoeAndBagIcon = ({ size, className }: { size: number; className: string }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="shoeBagFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>

    {/* Tote bag (background) */}
    <path
      d="M40 50 L92 50 C95 50 97 52 97 55 L101 102 C101 107 97 110 92 110 L40 110 C35 110 31 107 31 102 L35 55 C35 52 37 50 40 50 Z"
      fill="url(#shoeBagFill)"
      opacity="0.95"
    />
    {/* Bag handles */}
    <path
      d="M50 50 C50 38 54 32 60 32 C66 32 70 38 70 50"
      stroke="hsl(var(--primary))"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M70 50 C70 40 74 35 80 35 C86 35 90 40 90 50"
      stroke="hsl(var(--primary))"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.55"
    />

    {/* Ankle boot (foreground, lower-right) */}
    {/* sole */}
    <rect x="60" y="100" width="56" height="8" rx="3" fill="hsl(var(--indigo-deep))" opacity="0.85" />
    {/* boot upper */}
    <path
      d="M68 100 L68 80 C68 76 71 73 75 73 L88 73 C92 73 95 76 96 80 L100 92 C100 92 110 94 113 96 C116 98 116 100 113 100 Z"
      fill="hsl(var(--card))"
      stroke="hsl(var(--primary))"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* laces / accent */}
    <path
      d="M76 82 L86 82 M76 88 L86 88 M76 94 L86 94"
      stroke="hsl(var(--primary))"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);
