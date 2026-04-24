import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ShirtCrease = "sleave";
export type PantsCrease = "front";
export type KanduraCrease = "placeholder-kandura-1" | "placeholder-kandura-2";
export type GathraCrease = "placeholder-gathra-1" | "placeholder-gathra-2";

export interface CreasesState {
  shirt: ShirtCrease[];
  pants: PantsCrease[];
  kandura: KanduraCrease[];
  gathra: GathraCrease[];
}

export const EMPTY_CREASES: CreasesState = { shirt: [], pants: [], kandura: [], gathra: [] };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: CreasesState;
  onApply: (value: CreasesState) => void;
}

const SHIRT_OPTIONS: { value: ShirtCrease; label: string }[] = [
  { value: "sleave", label: "Sleave creases" },
];

const PANTS_OPTIONS: { value: PantsCrease; label: string }[] = [
  { value: "front", label: "Front creases" },
];

const KANDURA_OPTIONS: { value: KanduraCrease; label: string }[] = [
  { value: "placeholder-kandura-1", label: "Sleeve crease" },
  { value: "placeholder-kandura-2", label: "Front crease" },
];

const GATHRA_OPTIONS: { value: GathraCrease; label: string }[] = [
  { value: "placeholder-gathra-1", label: "Center crease" },
  { value: "placeholder-gathra-2", label: "Side crease" },
];

type GarmentKey = "shirt" | "pants" | "kandura" | "gathra";

function CreaseOption({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-secondary/40"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </button>
  );
}

function GarmentSection<T extends string>({
  title,
  options,
  selected,
  onToggle,
  expanded,
  onToggleExpanded,
}: {
  title: string;
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggleExpanded}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/40"
      >
        <span className="text-sm font-bold text-primary">{title}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {expanded && (
        <div className="bg-background/50">
          {options.map((opt) => (
            <CreaseOption
              key={opt.value}
              label={opt.label}
              checked={selected.includes(opt.value)}
              onToggle={() => onToggle(opt.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CreasesSheet({ open, onOpenChange, value, onApply }: Props) {
  const [local, setLocal] = useState<CreasesState>(value);
  const [expanded, setExpanded] = useState<Record<GarmentKey, boolean>>({
    shirt: true,
    pants: true,
    kandura: false,
    gathra: false,
  });

  useEffect(() => {
    if (open) setLocal(value);
  }, [open, value]);

  function toggle<T extends string>(key: GarmentKey, v: T) {
    setLocal((s) => {
      const current = (s[key] as unknown as T[]) ?? [];
      const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
      return { ...s, [key]: next } as CreasesState;
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-screen max-h-screen flex-col gap-0 border-0 p-0"
      >
        <SheetHeader className="flex-shrink-0 border-b border-border p-4 text-center">
          <SheetTitle className="text-base font-bold text-primary">Creases</SheetTitle>
        </SheetHeader>

        <div className="flex-shrink-0 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-base">
              👖
            </span>
            <p className="text-sm font-semibold text-primary">How should we crease your items?</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto border-t border-border">
          <GarmentSection
            title="Shirt"
            options={SHIRT_OPTIONS}
            selected={local.shirt}
            onToggle={(v) => toggle("shirt", v)}
            expanded={expanded.shirt}
            onToggleExpanded={() => setExpanded((e) => ({ ...e, shirt: !e.shirt }))}
          />
          <GarmentSection
            title="Pants"
            options={PANTS_OPTIONS}
            selected={local.pants}
            onToggle={(v) => toggle("pants", v)}
            expanded={expanded.pants}
            onToggleExpanded={() => setExpanded((e) => ({ ...e, pants: !e.pants }))}
          />
          <GarmentSection
            title="Kandura"
            options={KANDURA_OPTIONS}
            selected={local.kandura}
            onToggle={(v) => toggle("kandura", v)}
            expanded={expanded.kandura}
            onToggleExpanded={() => setExpanded((e) => ({ ...e, kandura: !e.kandura }))}
          />
          <GarmentSection
            title="Gathra"
            options={GATHRA_OPTIONS}
            selected={local.gathra}
            onToggle={(v) => toggle("gathra", v)}
            expanded={expanded.gathra}
            onToggleExpanded={() => setExpanded((e) => ({ ...e, gathra: !e.gathra }))}
          />
        </div>

        <div className="flex-shrink-0 border-t border-border p-4">
          <Button
            onClick={() => {
              onApply(local);
              onOpenChange(false);
            }}
            className="h-12 w-full text-sm font-semibold"
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function creasesSummary(value: CreasesState): string {
  const parts: string[] = [];
  if (value.shirt.length > 0) parts.push("Shirts sleave creases");
  if (value.pants.length > 0) parts.push("Pants front creases");
  if (value.kandura.length > 0) parts.push("Kandura");
  if (value.gathra.length > 0) parts.push("Gathra");
  if (parts.length === 0) return "None";
  return parts.join(", ");
}
