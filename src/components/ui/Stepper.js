"use client";

import { useRef, useEffect, useCallback } from "react";
import { Check, ChevronRight, Users, Send, Settings, BarChart3 } from "lucide-react";

const sizeConfig = {
  sm: { circle: 7, number: "text-[10px]", label: "text-[11px]", gap: "gap-3", connector: "h-px" },
  md: { circle: 9, number: "text-xs", label: "text-xs", gap: "gap-5", connector: "h-0.5" },
  lg: { circle: 10, number: "text-sm", label: "text-sm", gap: "gap-6", connector: "h-0.5" },
};

const stepIcons = {
  audience: Users,
  sender: Send,
  settings: Settings,
  stats: BarChart3,
};

export default function Stepper({ steps = [], currentStep = 0, size = "md", className = "", onStepClick }) {
  const scrollRef = useRef(null);
  const cfg = sizeConfig[size] || sizeConfig.md;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector("[data-active]");
    if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  const handleClick = useCallback((idx) => {
    if (idx < currentStep) {
      onStepClick?.(idx);
    }
  }, [currentStep, onStepClick]);

  return (
    <div ref={scrollRef} className={`overflow-x-auto scrollbar-none -mx-6 px-6 ${className}`}>
      <nav aria-label="Progress" className="flex items-center min-w-max">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isDisabled = idx > currentStep;
          const canClick = !isDisabled && !!onStepClick;
          const Icon = step.icon || stepIcons[step.id];

          return (
            <div key={step.id || idx} className={`flex items-center ${cfg.gap}`}>
              <button
                type="button"
                disabled={isDisabled}
                data-active={isActive ? true : undefined}
                onClick={() => handleClick(idx)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  canClick ? "cursor-pointer" : isDisabled ? "cursor-not-allowed" : "cursor-default"
                } ${isDisabled ? "opacity-50" : ""}`}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}${isCompleted ? " (completed)" : ""}${isActive ? " (current)" : ""}`}
              >
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white shadow-[0_2px_6px_rgba(55,98,238,0.3)]"
                      : isActive
                      ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white shadow-[0_2px_6px_rgba(55,98,238,0.3)]"
                      : "bg-[var(--color-border)] text-[var(--color-text-muted)]"
                  }`}
                  style={{ width: `${cfg.circle * 2.5}px`, height: `${cfg.circle * 2.5}px` }}
                >
                  {isCompleted ? (
                    <Check size={cfg.circle} strokeWidth={2.5} />
                  ) : Icon ? (
                    <Icon size={cfg.circle} strokeWidth={1.5} />
                  ) : (
                    <span className={`font-semibold ${cfg.number}`}>{idx + 1}</span>
                  )}
                </div>
                <span
                  className={`text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
                    isDisabled ? "text-[var(--color-text-muted)]" : isActive ? "text-[var(--color-text-primary)] font-semibold" : "text-[var(--color-text-muted)]"
                  } ${cfg.label}`}
                >
                  {step.label}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div className="flex items-center">
                  <div
                    className={`shrink-0 transition-colors duration-300 rounded-full ${
                      isCompleted ? "bg-[#3762EE]" : "bg-[var(--color-border)]"
                    } ${cfg.connector}`}
                    style={{ width: `${cfg.circle * 3}px` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
