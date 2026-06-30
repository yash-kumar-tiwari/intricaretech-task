"use client";

import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

function DashboardShell({ children }) {
  const { isMobile, isDesktop, collapsed } = useSidebar();
  const sidebarWidth = collapsed ? 72 : 260;

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] transition-theme">
      <Sidebar />
      <Navbar />
      <main
        className="pb-8 transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth + 28,
          marginTop: "86px",
          paddingLeft: isMobile ? 16 : 0,
          paddingRight: isMobile ? 16 : 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
