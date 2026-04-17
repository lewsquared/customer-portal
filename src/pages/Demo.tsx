import { Link } from "react-router-dom";
import { Package, PackageOpen, Truck, PackageCheck, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";

const Demo = () => {
  return (
    <main className="min-h-screen bg-gradient-mint font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <div className="mb-10 text-center animate-fade-in">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
            Washmen · Demo
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-primary">
            Pick a screen
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Which order state would you like to preview?
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <DemoCard
            to="/order-received"
            icon={<Package className="h-6 w-6" />}
            title="Order received"
            description="Just placed · pickup tomorrow"
            delay="80ms"
          />
          <DemoCard
            to="/order-collected"
            icon={<PackageOpen className="h-6 w-6" />}
            title="Order collected"
            description="On its way to our facility"
            delay="120ms"
          />
          <DemoCard
            to="/processing"
            icon={<Sparkles className="h-6 w-6" />}
            title="Processing"
            description="Items at facility · review needed"
            delay="160ms"
          />
          <DemoCard
            to="/out-for-delivery"
            icon={<Truck className="h-6 w-6" />}
            title="Out for delivery"
            description="On its way back to you"
            delay="200ms"
          />
          <DemoCard
            to="/payment-failed"
            icon={<AlertTriangle className="h-6 w-6" />}
            title="Payment failed"
            description="Delivery on hold · payment required"
            delay="240ms"
          />
          <DemoCard
            to="/order-complete"
            icon={<PackageCheck className="h-6 w-6" />}
            title="Order complete"
            description="Delivered · all photos available"
            delay="280ms"
          />
        </div>
      </div>
    </main>
  );
};

const DemoCard = ({
  to,
  icon,
  title,
  description,
  delay,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) => (
  <Link
    to={to}
    style={{ animationDelay: delay }}
    className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-hero active:scale-[0.98] animate-fade-in"
  >
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="font-display text-base font-bold text-primary">{title}</p>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">{description}</p>
    </div>
    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
  </Link>
);

export default Demo;
