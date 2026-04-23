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
 * Shoe + bag icon — side-by-side composition.
 * A tote on the left and an ankle boot on the right, both solid primary fill,
 * sharing a common baseline. Reads clearly at 48×48.
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
    {/* Tote bag (left) */}
    {/* handles */}
    <path
      d="M22 56 C22 42 28 36 36 36 C44 36 50 42 50 56"
      stroke="hsl(var(--primary))"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* body — bottom at y=100 */}
    <path
      d="M16 56 L56 56 L60 100 L12 100 Z"
      fill="hsl(var(--primary))"
    />

    {/* Ankle boot (right) — sole at y=100 */}
    {/* upper */}
    <path
      d="M76 100 L76 60 C76 56 79 54 82 54 L94 54 C97 54 100 56 100 60 L100 84 L116 92 C119 93.5 119 96 116 96 L100 96 L100 100 Z"
      fill="hsl(var(--primary))"
    />
    {/* sole */}
    <rect x="74" y="100" width="46" height="6" rx="2" fill="hsl(var(--primary))" />
  </svg>
);

