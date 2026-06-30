"use client";

import { motion } from "framer-motion";
import { CheckCircle, ChevronUp, ChevronDown } from "lucide-react";

export default function ImportMethodCard({ method, isSelected, isComplete, onClick }) {
  const IconComp = method.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
        isComplete
          ? "border-[var(--color-success)] bg-[var(--color-success-light)]"
          : isSelected
          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-[0_0_0_1px_var(--color-primary)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-sm hover:bg-[var(--color-surface-secondary)]"
      }`}
    >
      {isComplete && (
        <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-success)] text-white shadow-sm">
          <CheckCircle size={12} />
        </div>
      )}

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
        isComplete
          ? "bg-[var(--color-success)] text-white"
          : isSelected
          ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white"
          : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
      }`}>
        {isComplete ? <CheckCircle size={22} /> : <IconComp size={22} />}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{method.label}</h3>
        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{method.description}</p>
      </div>

      <div className={`flex items-center gap-1 text-[10px] font-medium ${
        isComplete ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"
      }`}>
        {isComplete ? (
          <>Completed</>
        ) : (
          <>{isSelected ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Select</>
        )}
      </div>
    </motion.button>
  );
}
