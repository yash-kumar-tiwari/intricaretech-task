"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function MetricBarChart({ metrics = [] }) {
  return (
    <div className="relative">
      {/* Vertical dividers behind columns */}
      <div className="absolute inset-0 flex pointer-events-none">
        {metrics.map((_, idx) => (
          <div key={idx} className="flex-1 flex justify-center">
            {idx > 0 && (
              <div className="w-px h-[140px] bg-[var(--color-border)] self-start" />
            )}
          </div>
        ))}
      </div>

      {/* Columns */}
      <div className="flex relative">
        {metrics.map((metric, idx) => (
          <div key={metric.label} className="flex-1 flex flex-col items-center px-1">
            {/* Label row */}
            <div className="flex items-center gap-1 h-5 mb-1">
              <span
                className="font-[family-name:var(--font-sans)] text-xs font-bold leading-[15px] text-[var(--color-text-primary)] whitespace-nowrap"
              >
                {metric.label}
              </span>
              <Info size={12} className="text-[var(--color-text-muted)] shrink-0" />
            </div>

            {/* Value + badge row */}
            <div className="flex items-center gap-1 h-5 mb-3">
              <span
                className="font-[family-name:var(--font-sans)] text-base font-semibold leading-5 text-[var(--color-text-primary)]"
              >
                {metric.value}
              </span>
              {metric.growth && (
                <span
                  className="inline-flex items-center px-1 rounded text-[10px] font-bold leading-[18px]"
                  style={{
                    backgroundColor: metric.up ? "var(--color-success-light)" : "var(--color-warning-light)",
                    color: metric.up ? "var(--color-success-text)" : "var(--color-warning)",
                  }}
                >
                  {metric.growth}
                </span>
              )}
            </div>

            {/* Bar */}
            <div className="w-full flex items-end justify-center" style={{ height: 140 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: metric.barHeight || 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="w-full"
                style={{
                  maxWidth: 136,
                  backgroundColor: metric.color,
                  borderRadius: "0 9px 0 0",
                  minHeight: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
