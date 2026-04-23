import { useLocation } from "react-router-dom";
import { FALLBACK_ORDER } from "./mock-orders";
import type { OrderData } from "./order-types";

/**
 * Reads the order data passed through Link state.
 * Falls back to FALLBACK_ORDER if no state is present
 * (direct URL navigation, page refresh, or Demo gallery).
 */
export const useOrderData = (): OrderData => {
  const location = useLocation();
  const order = (location.state as { order?: OrderData } | null)?.order;
  return order ?? FALLBACK_ORDER;
};
