"use client";

import { forwardRef, useId, useRef, useEffect } from "react";
import { Check, Minus } from "lucide-react";

const Checkbox = forwardRef(function Checkbox(
  {
    label,
    checked = false,
    indeterminate = false,
    onChange,
    disabled = false,
    error,
    size = "md",
    className = "",
    id: externalId,
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = externalId || autoId;
  const innerRef = useRef(null);
  const resolvedRef = ref || innerRef;

  useEffect(() => {
    if (resolvedRef?.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  const sizeMap = {
    sm: { box: "h-3.5 w-3.5", icon: 10, text: "text-xs" },
    md: { box: "h-4.5 w-4.5", icon: 12, text: "text-sm" },
    lg: { box: "h-5 w-5", icon: 14, text: "text-base" },
  };

  const s = sizeMap[size];

  return (
    <label
      className={[
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-65" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative flex items-center justify-center">
        <input
          ref={resolvedRef}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          className="peer sr-only"
          {...props}
        />
        <div
          className={[
            s.box,
            "rounded border-2 flex items-center justify-center transition-theme",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-1",
            disabled && "bg-[var(--color-surface-secondary)]",
            checked || indeterminate
              ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
              : error
                ? "border-[var(--color-danger)]"
                : "border-[var(--color-border-strong)] hover:border-[var(--color-primary)]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {indeterminate ? (
            <Minus size={s.icon} className="text-white" />
          ) : checked ? (
            <Check size={s.icon} className="text-white" />
          ) : null}
        </div>
      </div>
      {label && <span className={`${s.text} text-[var(--color-text-primary)] select-none`}>{label}</span>}
    </label>
  );
});

export default Checkbox;
