"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

export default function ReplyPerformanceSection({ data }) {
  return (
    <Card className="p-5 rounded-xl border-[var(--color-border)] h-full">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
        Reply Performance
      </h3>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">
        Top reply channel
      </p>
      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.type}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {item.type}
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {item.value}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--color-primary-light)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
