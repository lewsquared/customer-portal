import type { OrderType } from "@/lib/order-types";
import theFineryUrl from "@/assets/icons/the-finery.svg";
import laundryBagsUrl from "@/assets/icons/laundry-bags.svg";
import laundryUrl from "@/assets/icons/laundry.svg";
import shoeBagUrl from "@/assets/icons/shoe-bag-care.svg";

interface Props {
  orderType: OrderType;
  size?: number;
  className?: string;
}

export const OrderTypeIcon = ({ orderType, size = 96, className = "" }: Props) => {
  if (orderType === "laundry") {
    return (
      <img
        src={laundryUrl}
        alt=""
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      />
    );
  }

  if (orderType === "shoe_bag") {
    return (
      <img
        src={shoeBagUrl}
        alt=""
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      />
    );
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
