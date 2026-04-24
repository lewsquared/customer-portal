import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BottomActionBarProps {
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  onBack?: () => void;
}

export const BottomActionBar = ({
  primaryLabel = "Add Another Service",
  onPrimaryClick,
  onBack,
}: BottomActionBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  const handlePrimary = () => {
    if (onPrimaryClick) return onPrimaryClick();
    console.log("add another service clicked");
  };

  return (
    <div
      className="flex-none border-t border-border bg-card px-5 py-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary shadow-press transition-transform duration-100 ease-out active:duration-75 active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={handlePrimary}
          className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform duration-100 ease-out active:duration-75 active:scale-[0.97]"
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
};
