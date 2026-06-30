"use client";

import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-xs pr-8",
  md: "px-3 py-2.5 text-sm pr-10",
  lg: "px-4 py-3 text-base pr-12",
};

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    options = [],
    placeholder,
    size = "md",
    disabled = false,
    fullWidth = true,
    className = "",
    id: externalId,
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = externalId || autoId;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={[
            "w-full appearance-none rounded-[5px] border bg-[var(--color-surface)] outline-none transition-theme",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20",
            error
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
              : "border-[var(--color-border-strong)] focus:border-[var(--color-primary)]",
            disabled && "bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] cursor-not-allowed",
            sizeStyles[size],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={size === "sm" ? 14 : 16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
      </div>
      {error && (
        <span id={errorId} role="alert" className="text-xs text-[var(--color-danger)]">
          {error}
        </span>
      )}
      {hint && !error && (
        <span className="text-xs text-[var(--color-text-muted)]">{hint}</span>
      )}
    </div>
  );
});

export default Select;
