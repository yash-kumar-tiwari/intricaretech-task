"use client";

import { forwardRef, useId } from "react";

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
};

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon: Icon,
    rightIcon: RightIcon,
    size = "md",
    disabled = false,
    fullWidth = true,
    className = "",
    id: externalId,
    "aria-describedby": ariaDescribedby,
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = externalId || autoId;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const describedBy = ariaDescribedby || [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            <Icon size={size === "sm" ? 14 : 16} />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={[
            "w-full rounded-[5px] border bg-[var(--color-surface)] outline-none transition-theme",
            "placeholder:text-xs placeholder:text-[var(--color-text-muted)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20",
            error
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
              : "border-[var(--color-border-strong)] focus:border-[var(--color-primary)]",
            disabled && "bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] cursor-not-allowed",
            Icon && "pl-10",
            RightIcon && "pr-10",
            sizeStyles[size],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            <RightIcon size={size === "sm" ? 14 : 16} />
          </div>
        )}
      </div>
      {error && (
        <span id={errorId} role="alert" className="text-xs text-[var(--color-danger)]">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="text-xs text-[var(--color-text-muted)]">
          {hint}
        </span>
      )}
    </div>
  );
});

export default Input;
