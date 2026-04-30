import { SERVICE_COLORS, SERVICE_LABELS } from "@/lib/portal-mock-data";
import { cn } from "@/lib/utils";

type Service = "CP" | "WF" | "PO" | "BB" | "SC";

interface ServiceBagIconProps {
  service: Service;
  size?: number;
  className?: string;
}

export function ServiceBagIcon({ service, size = 32, className }: ServiceBagIconProps) {
  const fill = SERVICE_COLORS[service] ?? "#B6BCD1";
  const label = SERVICE_LABELS[service] ?? "Service";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className={cn("shrink-0", className)}
    >
      <path
        d="M11 4 L13 7 L10 9 L22 9 L19 7 L21 4 L23 5 C26 7 28 14 28 19 C28 24 23 28 16 28 C9 28 4 24 4 19 C4 14 6 7 9 5 Z"
        fill={fill}
        stroke="#1A1437"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M11 17 L13 22 L15 18 L17 22 L19 17"
        fill="none"
        stroke="#1A1437"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
