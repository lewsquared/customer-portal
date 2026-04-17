import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronRight, ListChecks, Sparkles, MessageSquare, Camera } from "lucide-react";
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

export const OrderDetails = ({ defaultOpen }: { defaultOpen?: "services" | "instructions" }) => {
  return (
    <section
      className="mx-5 mt-4 rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <Accordion type="single" collapsible defaultValue={defaultOpen} className="w-full">
        <AccordionItem value="services" className="border-b last:border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <span className="font-display text-base font-bold text-primary">Services selection</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mb-3 space-y-2">
              {[
                { label: "Wash & Fold", note: "Gentle cycle" },
                { label: "Iron", note: "Crisp finish" },
                { label: "Eco rinse", note: "Hypoallergenic" },
              ].map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between rounded-2xl bg-secondary/60 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-primary">{s.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.note}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instructions" className="border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <MessageSquare className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold text-primary">Order instructions</span>
            </div>
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
}) => (
  <>
    {detailsFirst ? (
      <>
        <OrderDetails />
        <OrderConfirmations stage={stage} />
      </>
    ) : (
      <>
        <OrderConfirmations stage={stage} />
        <OrderDetails />
      </>
    )}
  </>
);
