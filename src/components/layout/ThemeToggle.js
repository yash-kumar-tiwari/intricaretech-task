"use client";

import { useTheme } from "next-themes";
import { useEffect, useCallback, useState } from "react";
import { Sun, Moon } from "lucide-react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export default function ThemeToggle({ collapsed }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted ? theme : "light";
  const activeIndex = options.findIndex((o) => o.value === current);

  const handleKeyDown = useCallback(
    (e) => {
      const idx = options.findIndex((o) => o.value === current);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (idx + 1) % options.length;
        setTheme(options[next].value);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (idx - 1 + options.length) % options.length;
        setTheme(options[prev].value);
      }
    },
    [current, setTheme]
  );

  if (collapsed) {
    return (
      <div className="flex items-center justify-center py-3">
        <button
          type="button"
          onClick={() =>
            setTheme(current === "light" ? "dark" : "light")
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-primary-ghost)] hover:text-[var(--color-primary)]"
          aria-label={`Current theme: ${current}. Click to change.`}
        >
          {current === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="relative rounded-lg bg-[var(--color-surface-tertiary)] p-0.5"
      onKeyDown={handleKeyDown}
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-0.5 bottom-0.5 rounded-md bg-[var(--color-surface)] shadow-sm transition-all duration-300 ease-out"
        style={{
          left: `calc(${activeIndex} * (100% / ${options.length}) + 2px)`,
          width: `calc(100% / ${options.length} - 4px)`,
        }}
      />

      <div className="relative flex">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = opt.value === current;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setTheme(opt.value)}
              className={[
                "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface-tertiary)]",
                isActive
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]",
              ].join(" ")}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
