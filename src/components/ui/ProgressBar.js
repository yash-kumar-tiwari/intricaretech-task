const colorStyles = {
  primary: "bg-[var(--color-primary)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  error: "bg-[var(--color-danger)]",
  info: "bg-[#8BA6FF]",
};

const sizeStyles = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5",
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = "primary",
  size = "md",
  showLabel = false,
  label,
  animated = true,
  className = "",
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-[var(--color-text-body)]">{label}</span>}
          {showLabel && (
            <span className="text-xs text-[var(--color-text-muted)]">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full rounded-full bg-[var(--color-border)] overflow-hidden ${sizeStyles[size] || sizeStyles.md}`}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${Math.round(pct)}%`}
          className={[
            "h-full rounded-full transition-all",
            colorStyles[color] || colorStyles.primary,
            animated && "duration-500 ease-out",
            pct === 100 ? "rounded-full" : "rounded-r-none",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
