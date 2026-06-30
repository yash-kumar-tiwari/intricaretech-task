"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SidebarContext = createContext(null);

export const SIDEBAR_EXPANDED = 260;
export const SIDEBAR_COLLAPSED = 72;

export function SidebarProvider({ children }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;
  const contentLeft = isMobile ? 0 : sidebarWidth + 28;
  const headerLeft = isMobile ? 0 : sidebarWidth;

  const value = {
    isDesktop,
    isMobile,
    mobileOpen,
    collapsed,
    toggleMobile,
    closeMobile,
    toggleCollapsed,
    sidebarWidth,
    contentLeft,
    headerLeft,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
