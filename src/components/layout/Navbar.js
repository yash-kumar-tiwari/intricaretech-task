"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Bell, ShoppingCart, ChevronRight } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const breadcrumbMap = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/campaigns": "Campaigns",
  "/campaigns/create": "Create Campaign",
  "/user-search": "User Search",
  "/user-edit": "User Edit",
  "/properties": "Properties",
  "/inbox": "Inbox",
  "/share": "Share",
  "/settings": "Settings",
};

function buildBreadcrumbs(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [];
  let accum = "";

  for (const part of parts) {
    accum += `/${part}`;
    const label = breadcrumbMap[accum];
    if (label) {
      crumbs.push({ label, href: accum });
    } else {
      crumbs.push({
        label: part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: accum,
      });
    }
  }

  return crumbs;
}

export default function Navbar() {
  const pathname = usePathname();
  const { isMobile, isDesktop, collapsed, toggleMobile, headerLeft } = useSidebar();
  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <header
      className="fixed top-0 right-0 z-20 flex h-[62px] items-center justify-between transition-all duration-300 bg-[var(--color-surface)] shadow-[0px_4px_24px_var(--color-shadow-md)]"
      style={{ left: isMobile ? 0 : headerLeft }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3 pl-4 lg:pl-6">
        {/* Mobile / tablet menu button */}
        {!isDesktop && (
          <button
            onClick={toggleMobile}
            className="rounded-md p-1.5 text-[var(--color-icon-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-primary)] transition-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Toggle sidebar menu"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-1 text-xs"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={crumb.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
                )}
                {isLast ? (
                  <span className="text-[var(--color-navbar-text)] font-medium truncate max-w-[160px] sm:max-w-[300px]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors truncate max-w-[100px] sm:max-w-[180px]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 pr-4 lg:pr-6">
        {/* Notification bell */}
        <button
          className="relative rounded-md p-1.5 text-[var(--color-icon-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-primary)] transition-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-danger)] text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Cart */}
        <button
          className="relative rounded-md p-1.5 text-[var(--color-icon-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-primary)] transition-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Cart"
        >
          <ShoppingCart size={20} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-bold text-white">
            2
          </span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-[var(--color-border)]">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">John Doe</span>
            <span className="text-[11px] text-[var(--color-text-muted)]">Admin</span>
          </div>
          <div className="relative shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white text-sm font-bold">
              JD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-success)]" />
          </div>
        </div>
      </div>
    </header>
  );
}
