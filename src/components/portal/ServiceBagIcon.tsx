import { SERVICE_LABELS } from "@/lib/portal-mock-data";
import { cn } from "@/lib/utils";
import washFoldIcon from "@/assets/service-washfold.png";
import cleanPressIcon from "@/assets/service-cleanpress.png";
import bedBathIcon from "@/assets/service-bedbath.png";

type Service = "CP" | "WF" | "PO" | "BB" | "SC";

const SERVICE_ICONS: Partial<Record<Service, string>> = {
  WF: washFoldIcon,
  CP: cleanPressIcon,
  BB: bedBathIcon,
};

// Preload all service bag icons immediately so they appear instantly when rendered.
if (typeof window !== "undefined") {
  Object.values(SERVICE_ICONS).forEach((src) => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  });
}

interface ServiceBagIconProps {
  service: Service;
  size?: number;
  className?: string;
}

export function ServiceBagIcon({ service, size = 32, className }: ServiceBagIconProps) {
  const src = SERVICE_ICONS[service];
  const label = SERVICE_LABELS[service] ?? "Service";

  if (!src) return null;

  return (
    <img
      src={src}
      alt={label}
      width={size}
      height={size}
      loading="eager"
      decoding="sync"
      // @ts-expect-error - fetchpriority is a valid HTML attribute
      fetchpriority="high"
      className={cn("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
