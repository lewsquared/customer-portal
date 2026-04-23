import type { OrderStatus, OrderType } from "./order-types";

export interface OrderCardData {
  orderId: string;
  orderType: OrderType;
  status: OrderStatus;
  timestamp: string;
}

export const MOCK_ACTIVE_ORDERS: OrderCardData[] = [
  {
    orderId: "CUI398",
    orderType: "laundry",
    status: "received",
    timestamp: "23 Apr 2026, 09:14 AM",
  },
  {
    orderId: "SHB201",
    orderType: "shoe_bag",
    status: "items_in_process",
    timestamp: "22 Apr 2026, 03:48 PM",
  },
  {
    orderId: "TFY104",
    orderType: "finery",
    status: "collected",
    timestamp: "22 Apr 2026, 11:02 AM",
  },
  {
    orderId: "CUI376",
    orderType: "laundry",
    status: "approval_required",
    timestamp: "21 Apr 2026, 06:30 PM",
  },
];

export const MOCK_PAST_ORDERS: OrderCardData[] = [
  {
    orderId: "CUI355",
    orderType: "laundry",
    status: "complete",
    timestamp: "Completed on 18 Apr 2026, 04:12 PM",
  },
  {
    orderId: "CUI341",
    orderType: "laundry",
    status: "complete",
    timestamp: "Completed on 14 Apr 2026, 02:55 PM",
  },
  {
    orderId: "TFY092",
    orderType: "finery",
    status: "complete",
    timestamp: "Completed on 11 Apr 2026, 06:20 PM",
  },
  {
    orderId: "CUI318",
    orderType: "laundry",
    status: "complete",
    timestamp: "Completed on 06 Apr 2026, 12:41 PM",
  },
  {
    orderId: "LBG044",
    orderType: "laundry_bag",
    status: "complete",
    timestamp: "Completed on 02 Apr 2026, 10:08 AM",
  },
  {
    orderId: "CUI297",
    orderType: "laundry",
    status: "complete",
    timestamp: "Completed on 28 Mar 2026, 05:33 PM",
  },
];
