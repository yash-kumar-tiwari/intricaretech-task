"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Dropdown({
  trigger,
  items = [],
  align = "right",
  isOpen: controlledOpen,
  onToggle,
  onClose,
  className = "",
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef(null);

  const setOpen = useCallback(
    (v) => {
      if (!isControlled) setInternalOpen(v);
      onToggle?.(v);
      if (!v) {
        onClose?.();
        setActiveIndex(-1);
      }
    },
    [isControlled, onToggle, onClose]
  );

  const ref = useClickOutside(() => {
    if (open) setOpen(false);
  });

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      }
      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex]?.onClick?.();
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, items, activeIndex, setOpen]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={[
          "rounded-md p-1.5 transition-theme",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          open ? "bg-[var(--color-border)] text-[var(--color-primary)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-border)]",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Actions"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {trigger || <MoreVertical size={16} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            role="menu"
            className={[
              "absolute z-20 mt-1 min-w-[180px] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg",
              align === "right" ? "right-0" : "left-0",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {items.length === 0 ? (
              <div className="px-4 py-3 text-xs text-[var(--color-text-muted)] text-center">No actions</div>
            ) : (
              items.map((item, i) => (
                <button
                  key={item.key || i}
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick?.();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={[
                    "flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-theme",
                    "focus-visible:outline-none",
                    activeIndex === i && "bg-[var(--color-surface-secondary)]",
                    item.danger
                      ? "text-[var(--color-danger)] hover:bg-[var(--color-danger-light)]"
                      : "text-[var(--color-text-body)] hover:bg-[var(--color-surface-secondary)]",
                    item.disabled && "opacity-50 cursor-not-allowed",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.icon && <item.icon size={15} />}
                  {item.label}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
