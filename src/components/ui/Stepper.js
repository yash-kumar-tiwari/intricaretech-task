"use client";

import { useRef, useEffect } from "react";
import { Check } from "lucide-react";

const sizeConfig = {
  sm: { circle: 7, number: "text-[10px]", label: "text-[11px]", gap: "gap-3", connector: "h-px" },
  md: { circle: 9, number: "text-xs", label: "text-xs", gap: "gap-5", connector: "h-0.5" },
  lg: { circle: 10, number: "text-sm", label: "text-sm", gap: "gap-6", connector: "h-0.5" },
};

export default function Stepper({ steps = [], currentStep = 0, size = "md", className = "" }) {
  const scrollRef = useRef(null);
  const cfg = sizeConfig[size] || sizeConfig.md;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector("[data-active]");
    if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  return (
    <div ref={scrollRef} className={`overflow-x-auto scrollbar-none -mx-6 px-6 ${className}`}>
      <nav aria-label="Progress" className="flex items-center min-w-max">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isDisabled = idx > currentStep;

          return (
            <div key={step.id || idx} className={`flex items-center ${cfg.gap}`}>
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  data-active={isActive ? true : undefined}
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white shadow-[0_2px_6px_rgba(55,98,238,0.3)]"
                      : isActive
                      ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white shadow-[0_2px_6px_rgba(55,98,238,0.3)]"
                      : "bg-[#EBE9F1] text-[#B9B6C3]"
                  }`}
                  style={{ width: `${cfg.circle * 2.5}px`, height: `${cfg.circle * 2.5}px` }}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check size={cfg.circle} strokeWidth={2.5} />
                  ) : (
                    <span className={`font-semibold ${cfg.number}`}>{idx + 1}</span>
                  )}
                </div>
                <span
                  className={`text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
                    isDisabled ? "text-[#B9B6C3]" : isActive ? "text-[#5E5873] font-semibold" : "text-[#9692A4]"
                  } ${cfg.label}`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`shrink-0 transition-colors duration-300 ${
                    isCompleted ? "bg-[#3762EE]" : "bg-[#EBE9F1]"
                  } ${cfg.connector}`}
                  style={{ width: `${cfg.circle * 3}px` }}
                />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
