const paddings = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
};

export default function Card({
  children,
  padding = "md",
  hoverable = false,
  className = "",
  onClick,
  role,
  tabIndex,
  onKeyDown,
  ...props
}) {
  const isClickable = !!onClick;

  return (
    <div
      className={[
        "rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] transition-theme",
        paddings[padding] || paddings.md,
        (isClickable || hoverable) && "hover:shadow-sm hover:border-[var(--color-border-strong)]",
        isClickable && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role={isClickable ? "button" : role}
      tabIndex={isClickable ? 0 : tabIndex}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e);
              }
              onKeyDown?.(e);
            }
          : onKeyDown
      }
      {...props}
    >
      {children}
    </div>
  );
}
