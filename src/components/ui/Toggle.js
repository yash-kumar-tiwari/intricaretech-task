"use client";

import { forwardRef, useId } from "react";

const sizeStyles = {
  sm: { track: "h-4 w-7", thumb: "h-3 w-3", translateX: "translate-x-3", text: "text-xs" },
  md: { track: "h-5 w-9", thumb: "h-4 w-4", translateX: "translate-x-4", text: "text-sm" },
  lg: { track: "h-6 w-11", thumb: "h-5 w-5", translateX: "translate-x-5", text: "text-base" },
};

const Toggle = forwardRef(function Toggle(
  {
    checked = false,
    onChange,
    label,
    disabled = false,
    size = "md",
    className = "",
    id: externalId,
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = externalId || autoId;
  const s = sizeStyles[size] || sizeStyles.md;

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
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          role="switch"
          aria-checked={checked}
          {...props}
        />
        <div
          className={[
            s.track,
            "rounded-full transition-colors duration-200",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-1",
            checked
              ? "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE]"
              : "bg-[var(--color-border-strong)]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              s.thumb,
              "rounded-full bg-[var(--color-surface)] shadow-sm transition-transform duration-200",
              checked && s.translateX,
              "absolute top-0.5 left-0.5",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>
      </div>
      {label && <span className={`${s.text} text-[var(--color-text-primary)] select-none`}>{label}</span>}
    </label>
  );
});

export default Toggle;
