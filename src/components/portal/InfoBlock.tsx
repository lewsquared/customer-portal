export const InfoBlock = ({
  rows,
}: {
  rows: { label: string; value: string }[];
}) => (
  <div className="space-y-1.5">
    {rows.map(({ label, value }) => (
      <div key={label} className="flex gap-2 text-sm">
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium text-foreground">{value}</span>
      </div>
    ))}
  </div>
);
