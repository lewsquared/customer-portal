import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, ListChecks, Sparkles, MessageSquare, Camera, Plus, Pencil, WashingMachine, Shirt, BedDouble, Footprints, Crown, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

type Confirmation = {
  key: string;
  label: string;
  subtitle: string;
  status: "done" | "pending";
};

export type OrderStage = "received" | "collected" | "items-in" | "delivery" | "delivered";

const buildConfirmations = (stage: OrderStage): Confirmation[] => {
  const pickupDone = stage !== "received";
  const itemsDone = stage === "items-in" || stage === "delivery" || stage === "delivered";
  const dropDone = stage === "delivered";
  return [
    {
      key: "pickup",
      label: "Proof of pick up",
      subtitle: pickupDone ? "Tap to view photos" : "Available after pickup",
      status: pickupDone ? "done" : "pending",
    },
    {
      key: "items",
      label: "Items received at Washmen",
      subtitle: itemsDone ? "Tap to view photos" : "Available after items received",
      status: itemsDone ? "done" : "pending",
    },
    {
      key: "drop",
      label: "Proof of drop off",
      subtitle: dropDone ? "Tap to view photos" : "Available after delivery",
      status: dropDone ? "done" : "pending",
    },
  ];
};

export const OrderConfirmations = ({ stage = "delivery" }: { stage?: OrderStage }) => {
  const confirmations = buildConfirmations(stage);
  const doneCount = confirmations.filter((c) => c.status === "done").length;
  return (
    <section
      key="confirmations"
      className="mx-5 mt-4 rounded-3xl border border-border bg-card shadow-card animate-fade-in p-5"
      style={{ animationDelay: "260ms" }}
    >
      <div>
        <h3 className="font-display text-base font-bold text-primary leading-tight">Order Confirmations</h3>
        <p className="mt-1 text-xs font-medium text-muted-foreground leading-relaxed">
          We capture photos at every step — from your doorstep to our facility and back.
        </p>
      </div>

      <ul className="mt-4 divide-y divide-border">
        {confirmations.map((c) => {
          const done = c.status === "done";
          return (
            <li key={c.key}>
              <button
                type="button"
                disabled={!done}
                className={cn(
                  "flex w-full items-center gap-3 py-3 text-left transition-colors",
                  done ? "hover:bg-secondary/40 -mx-2 px-2 rounded-xl" : "opacity-50 cursor-not-allowed",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    done
                      ? "bg-secondary text-primary"
                      : "border border-dashed border-muted-foreground/40 text-muted-foreground",
                  )}
                >
                  {done ? (
                    <Camera className="h-4 w-4" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-bold", done ? "text-primary" : "text-muted-foreground")}>
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">{c.subtitle}</p>
                </div>
                {done && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const OrderDetails = ({
  defaultOpen,
  locked = false,
}: {
  defaultOpen?: "services" | "instructions";
  /** When true, services can no longer be added/edited (after order received). */
  locked?: boolean;
}) => {
  return (
    <section
      className="mx-5 mt-4 rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <Accordion type="single" collapsible defaultValue={defaultOpen} className="w-full">
        <AccordionItem value="services" className="border-b last:border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="font-display text-base font-bold text-primary">Services Selection</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mb-3 space-y-2.5">
              {/* Wash & Fold (selected) with Press & Hang add-on */}
              <li className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-3 p-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.18)] text-primary">
                    <WashingMachine className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-primary leading-tight">Wash & Fold</p>
                    <button className="mt-0.5 text-[11px] font-semibold text-primary underline underline-offset-2">
                      Learn More
                    </button>
                  </div>
                  <span
                    aria-label="Wash & Fold selected"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>

                {/* nested add-on */}
                <div className="flex items-start gap-3 px-3 pb-3 pt-1 border-t border-border/60">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground">
                    <Shirt className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-muted-foreground leading-tight">Press & Hang</p>
                      <span className="rounded-md bg-warning px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-warning-foreground">
                        New
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">Press tops after washing</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">All T-Shirts / Polos</p>
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                        + AED 9 /item
                      </span>
                    </div>
                    <button className="mt-1.5 text-[11px] font-medium text-muted-foreground underline underline-offset-2">
                      View Terms & Conditions
                    </button>
                  </div>
                  <button
                    aria-label="Edit Press & Hang"
                    disabled={locked}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-transform active:scale-95",
                      locked && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>

              {[
                { label: "Clean & Press", Icon: Crown, tint: "bg-[hsl(140_70%_92%)] text-[hsl(140_60%_35%)]" },
                { label: "Bed & Bath", Icon: BedDouble, tint: "bg-[hsl(330_80%_94%)] text-[hsl(330_60%_45%)]" },
                { label: "Press Only", Icon: Wind, tint: "bg-secondary text-primary" },
                { label: "Shoe & Bag Care", Icon: Footprints, tint: "bg-[hsl(28_90%_92%)] text-[hsl(28_70%_45%)]" },
                { label: "The Finery", Icon: Crown, tint: "bg-primary text-primary-foreground" },
              ].map(({ label, Icon, tint }) => (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
                    locked && "opacity-60",
                  )}
                >
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", tint)}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <p className="min-w-0 flex-1 text-sm font-bold text-primary">{label}</p>
                  <button
                    aria-label={`Add ${label}`}
                    disabled={locked}
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-transform active:scale-95",
                      locked && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </li>
              ))}
            </ul>
            {locked && (
              <p className="mb-3 text-center text-[11px] font-medium text-muted-foreground">
                Service selection is locked once your order is collected.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instructions" className="border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="font-display text-base font-bold text-primary">Order Instructions</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 rounded-2xl bg-secondary/60 p-3 text-sm text-muted-foreground">
              Please ring the doorbell twice. Leave the bag at the door if no one answers.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

/** Backward-compatible combined view (used by the live order page). */
export const OrderSections = ({
  stage = "delivery",
  detailsFirst = false,
}: {
  stage?: OrderStage;
  detailsFirst?: boolean;
}) => {
  const locked = stage !== "received";
  return (
    <>
      {detailsFirst ? (
        <>
          <OrderDetails locked={locked} />
          <OrderConfirmations stage={stage} />
        </>
      ) : (
        <>
          <OrderConfirmations stage={stage} />
          <OrderDetails locked={locked} />
        </>
      )}
    </>
  );
};
