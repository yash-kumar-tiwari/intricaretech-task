"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const sizeStyles = {
  sm: { tab: "px-3 py-1 text-xs", indicator: "rounded-[3px]" },
  md: { tab: "px-4 py-1.5 text-sm", indicator: "rounded-md" },
  lg: { tab: "px-5 py-2 text-base", indicator: "rounded-md" },
};

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  orientation = "horizontal",
  size = "md",
  fullWidth = false,
  variant = "pills",
  className = "",
  "aria-label": ariaLabel = "Tabs",
}) {
  const listRef = useRef(null);
  const activeRef = useRef(null);

  const handleKeyDown = (e, idx) => {
    const len = tabs.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % len;
      onChange?.(tabs[next].value);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + len) % len;
      onChange?.(tabs[prev].value);
    }
    if (e.key === "Home") {
      e.preventDefault();
      onChange?.(tabs[0].value);
    }
    if (e.key === "End") {
      e.preventDefault();
      onChange?.(tabs[tabs.length - 1].value);
    }
  };

  const s = sizeStyles[size] || sizeStyles.md;

  const containerClass =
    variant === "underline"
      ? `flex ${orientation === "vertical" ? "flex-col" : ""} border-b border-[var(--color-border)]`
      : `inline-flex gap-0.5 rounded-lg bg-[var(--color-border)] p-0.5 ${fullWidth ? "w-full" : ""}`;

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      className={[containerClass, className].filter(Boolean).join(" ")}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            ref={isActive ? activeRef : undefined}
            role="tab"
            aria-selected={isActive}
            aria-controls={tab.controls}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            disabled={tab.disabled}
            className={[
              "relative font-medium transition-colors whitespace-nowrap",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset",
              variant === "underline"
                ? [
                    s.tab,
                    "border-b-2 border-transparent -mb-px",
                    isActive
                      ? "text-[var(--color-primary)] border-[var(--color-primary)]"
                      : "text-[var(--color-text-body)] hover:text-[var(--color-primary)]",
                    fullWidth && "flex-1 text-center",
                  ]
                    .filter(Boolean)
                    .join(" ")
                : [
                    s.tab,
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-body)] hover:text-[var(--color-primary)]",
                    fullWidth && "flex-1 text-center",
                    tab.disabled && "opacity-50 cursor-not-allowed",
                  ]
                    .filter(Boolean)
                    .join(" "),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {variant !== "underline" && isActive && (
              <motion.div
                layoutId="tab-indicator"
                className={["absolute inset-0 bg-[var(--color-surface)] shadow-sm", s.indicator].filter(Boolean).join(" ")}
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              />
            )}
            {variant === "underline" && isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon size={s.tab.includes("xs") ? 14 : 16} />}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="text-[10px] bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full px-1.5 py-0.5">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
