import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top on every pathname change.
 * Handles both the window and any inner scroll containers marked with data-scroll-root.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll — 'smooth' looks janky on route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // Defensive: reset any inner scroll containers
    document.querySelectorAll<HTMLElement>("[data-scroll-root]").forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};
