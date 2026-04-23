interface Props {
  onClick?: () => void;
  label?: string;
}

export const CancelButton = ({ onClick, label = "Cancel order" }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs font-semibold text-destructive transition-colors hover:underline"
  >
    {label}
  </button>
);
