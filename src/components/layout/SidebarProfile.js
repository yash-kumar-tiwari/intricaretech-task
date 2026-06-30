"use client";

import { useState } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const user = {
  initials: "JD",
  name: "John Doe",
  role: "Admin",
  email: "john.doe@intricaretech.com",
};

export default function SidebarProfile({ collapsed }) {
  const [open, setOpen] = useState(false);

  if (collapsed) {
    return (
      <div className="group relative flex items-center justify-center py-3">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-sm font-bold">
            {user.initials}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-success)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-[var(--color-primary-ghost)] group"
      >
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-sm font-bold shadow-md">
            {user.initials}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-[2.5px] border-[var(--color-surface)] bg-[var(--color-success)]" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate leading-tight">
            {user.name}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] truncate leading-tight mt-0.5">
            {user.role}
          </p>
        </div>
        <ChevronDown
          size={14}
          className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-200"
          style={{ rotate: open ? "180deg" : "0deg" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mx-3 mb-1 mt-0.5 space-y-2 rounded-lg bg-[var(--color-surface-secondary)] p-3">
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                {user.email}
              </p>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-danger-light)] hover:text-[var(--color-danger)]"
              >
                <LogOut size={12} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
