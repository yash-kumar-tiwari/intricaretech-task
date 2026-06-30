"use client";

import { motion } from "framer-motion";

export default function MetricBarChart({ metrics = [], maxBarHeight = 120 }) {
  const maxVal = Math.max(...metrics.map((m) => m.barValue || 0), 1);

  return (
    <div className="flex items-end justify-between gap-4" style={{ height: maxBarHeight + 100 }}>
      {metrics.map((metric, idx) => {
        const barH = ((metric.barValue || 0) / maxVal) * maxBarHeight;
        return (
          <div key={metric.label} className="flex-1 flex flex-col items-center gap-2">
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap"
              style={{
                backgroundColor: metric.growth ? "#E5F8EE" : "transparent",
                color: metric.growth ? "#10B981" : "transparent",
              }}
            >
              {metric.growth || ""}
            </span>
            <div
              className="w-full flex flex-col items-center justify-end"
              style={{ height: maxBarHeight }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: barH }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="w-full rounded-t-md"
                style={{ backgroundColor: metric.color, maxWidth: 48 }}
              />
            </div>
            <span className="text-sm font-bold text-[#1F2937]">{metric.value}</span>
            <span className="text-[11px] text-[#8B93A7] text-center leading-tight">{metric.label}</span>
          </div>
        );
      })}
    </div>
  );
}
