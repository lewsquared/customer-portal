import { ArrowRight, Sparkles } from "lucide-react";
import shoeImage from "@/assets/shoe-cleaning.jpg";

export const UpsellBanner = () => {
  return (
    <section
      className="mx-5 mt-5 animate-fade-in"
      style={{ animationDelay: "120ms" }}
      aria-label="Featured service"
    >
      <button
        type="button"
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary to-surface-lavender-soft p-4 text-left shadow-card transition-all active:scale-[0.99]"
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-card">
          <img
            src={shoeImage}
            alt="Sneaker cleaning service"
            width={800}
            height={512}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1 rounded-full bg-card/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary backdrop-blur">
            <Sparkles className="h-2.5 w-2.5" />
            New
          </div>
          <h3 className="mt-1 font-sans text-base font-bold leading-tight text-primary">
            Sneaker & leather care
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
            Restore your kicks. Add to your next pickup.
          </p>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </section>
  );
};
