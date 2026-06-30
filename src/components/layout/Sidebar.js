"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, PanelRight, X } from "lucide-react";
import { useSidebar, SIDEBAR_EXPANDED } from "@/contexts/SidebarContext";
import SidebarProfile from "./SidebarProfile";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
  { label: "Campaigns", icon: Megaphone, href: "/campaigns" },
];

function NavItem({ item, collapsed, isActive }) {
  const active = isActive(item.href);
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={[
        "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        collapsed ? "justify-center px-0 py-3 mx-1" : "px-4 py-2.5",
        active
          ? "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white shadow-sm"
          : "text-[var(--color-text-body)] hover:bg-[var(--color-primary-ghost)] hover:text-[var(--color-primary)]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <item.icon size={18} className="shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function SidebarContent({ collapsed, onToggleCollapse, onNavClick }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col bg-[var(--color-surface)] transition-theme">
      {/* Logo + Toggle */}
      <div
        className={[
          "flex items-center border-b border-[var(--color-border)] transition-all duration-300",
          collapsed ? "justify-center px-0 py-5" : "gap-2.5 px-6 py-5",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white text-xs font-bold">
          FT
        </div>
        {!collapsed && (
          <span
            className="text-base font-semibold text-[var(--color-text-primary)] truncate flex-1"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Frontend Task
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center h-7 w-7 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-ghost)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelRight size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-4 px-2">
        {menuItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            isActive={isActive}
          />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[var(--color-border)] px-2 py-3 flex flex-col gap-1">
        {/* Profile card */}
        <SidebarProfile collapsed={collapsed} />

        {/* Theme toggle */}
        <div
          className={
            collapsed
              ? ""
              : "px-3"
          }
        >
          <ThemeToggle collapsed={collapsed} />
        </div>

      </div>


    </div>
  );
}

export default function Sidebar() {
  const {
    isDesktop,
    isMobile,
    mobileOpen,
    collapsed,
    closeMobile,
    toggleCollapsed,
  } = useSidebar();

  /* ── Mobile drawer ── */
  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: -SIDEBAR_EXPANDED }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_EXPANDED }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-[260px] shadow-xl"
            >
              <button
                onClick={closeMobile}
                className="absolute -right-10 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] shadow-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                aria-label="Close sidebar"
              >
                <X size={16} />
              </button>
              <SidebarContent
                collapsed={false}
                onToggleCollapse={toggleCollapsed}
                onNavClick={closeMobile}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  /* ── Desktop / Tablet: persistent sidebar ── */
  return (
    <aside
      className={[
        "fixed left-0 top-0 z-30 h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SidebarContent
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
      />
    </aside>
  );
}
