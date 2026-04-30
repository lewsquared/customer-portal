const STORAGE_KEY = "washmen_order_status_overrides";

export const setOrderStatus = (orderId: string, status: string): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    map[orderId] = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
};

export const getOrderStatus = (orderId: string): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, string>;
    return map[orderId] ?? null;
  } catch {
    return null;
  }
};
