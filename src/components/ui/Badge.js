const variantStyles = {
  success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
  error: "bg-[var(--color-danger-light)] text-[var(--color-danger)]",
  info: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
  neutral: "bg-[var(--color-border)] text-[var(--color-text-body)]",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px] leading-[14px] gap-1",
  md: "px-3 py-1 text-xs leading-[16px] gap-1.5",
  lg: "px-4 py-1.5 text-sm leading-[18px] gap-2",
};

export default function Badge({
  children,
  variant = "success",
  size = "md",
  dot = false,
  className = "",
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-[17px] font-medium whitespace-nowrap",
        variantStyles[variant] || variantStyles.success,
        sizeStyles[size] || sizeStyles.md,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && (
        <span
          className={[
            "rounded-full",
            size === "sm" ? "h-1 w-1" : size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5",
            {
              success: "bg-[var(--color-success)]",
              warning: "bg-[var(--color-warning)]",
              error: "bg-[var(--color-danger)]",
              info: "bg-[var(--color-primary)]",
              neutral: "bg-[var(--color-text-body)]",
            }[variant],
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}
      {children}
    </span>
  );
}
