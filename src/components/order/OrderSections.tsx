import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Camera, ListChecks, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Confirmation = {
  key: string;
  label: string;
  status: "done" | "pending";
  time?: string;
};

const confirmations: Confirmation[] = [
  { key: "pickup", label: "Proof of pickup", status: "done", time: "Thu 8:42 AM" },
  { key: "items", label: "Items received", status: "done", time: "Thu 11:10 AM" },
  { key: "drop", label: "Proof of drop-off", status: "pending" },
];

export const OrderSections = () => {
  return (
    <section
      className="mx-5 mt-4 rounded-3xl border border-border bg-card shadow-card animate-fade-in"
      style={{ animationDelay: "280ms" }}
    >
      <Accordion type="single" collapsible defaultValue="confirmations" className="w-full">
        <AccordionItem value="confirmations" className="border-b last:border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Camera className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold text-primary">Order confirmations</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mb-3 space-y-2">
              {confirmations.map((c) => (
                <li
                  key={c.key}
                  className="flex items-center justify-between rounded-2xl bg-secondary/60 px-3 py-2.5"
                >
                  <span className="text-sm font-semibold text-primary">{c.label}</span>
                  <Badge status={c.status} time={c.time} />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="services" className="border-b last:border-b-0 px-5">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <ListChecks className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold text-primary">Services selection</span>
            </div>
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

const Badge = ({ status, time }: { status: "done" | "pending"; time?: string }) => {
  const done = status === "done";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tabular",
        done ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
      )}
    >
      {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
      {done ? time ?? "Done" : "Pending"}
    </span>
  );
};
