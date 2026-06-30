"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white hover:from-[#7b98f5] hover:to-[#2a52cc] active:from-[#6a88e5] active:to-[#1a42bc]",
  secondary:
    "bg-[var(--color-btn-secondary-bg)] text-[var(--color-text-muted)] hover:opacity-85 active:opacity-75",
  ghost:
    "text-[var(--color-text-body)] hover:bg-[var(--color-primary-ghost)] active:bg-[var(--color-border)]",
  danger:
    "bg-[var(--color-danger)] text-white hover:opacity-85 active:opacity-75",
  outline:
    "border border-[var(--color-border-strong)] text-[var(--color-text-body)] hover:bg-[var(--color-surface-secondary)] active:bg-[var(--color-border)]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    icon: Icon,
    className = "",
    type = "button",
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium",
        "rounded-[5px] transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        "disabled:opacity-65 disabled:cursor-not-allowed",
        "select-none",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin shrink-0" />
      ) : Icon ? (
        <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} className="shrink-0" />
      ) : null}
      {children}
    </button>
  );
});

export default Button;
