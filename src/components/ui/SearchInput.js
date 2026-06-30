"use client";

import { forwardRef, useId } from "react";
import { Search, X } from "lucide-react";

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-xs pl-8 pr-8",
  md: "px-3 py-2.5 text-sm pl-10 pr-10",
  lg: "px-4 py-3 text-base pl-12 pr-12",
};

const iconSizes = { sm: 14, md: 16, lg: 20 };

const SearchInput = forwardRef(function SearchInput(
  {
    value = "",
    onChange,
    onClear,
    placeholder = "Search...",
    size = "md",
    disabled = false,
    fullWidth = true,
    autoFocus = false,
    className = "",
    id: externalId,
    "aria-label": ariaLabel = "Search",
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = externalId || autoId;
  const hasValue = value !== "" && value !== undefined && value !== null;

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <Search
        size={iconSizes[size]}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
      />
      <input
        ref={ref}
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        className={[
          "w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] outline-none transition-theme",
          "placeholder:text-xs placeholder:text-[var(--color-text-muted)]",
          "focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20",
          disabled && "bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)] cursor-not-allowed",
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {hasValue && !disabled && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Clear search"
          tabIndex={-1}
        >
          <X size={iconSizes[size]} />
        </button>
      )}
    </div>
  );
});

export default SearchInput;
