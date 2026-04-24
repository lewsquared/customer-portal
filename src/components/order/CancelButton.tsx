interface Props {
  onClick?: () => void;
  label?: string;
}

export const CancelButton = ({ onClick, label = "Cancel order" }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs font-semibold text-destructive transition-opacity duration-100 ease-out hover:underline active:duration-75 active:opacity-70"
  >
    {label}
  </button>
);
