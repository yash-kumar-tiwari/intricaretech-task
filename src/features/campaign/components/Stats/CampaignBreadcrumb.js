"use client";

import { ChevronRight } from "lucide-react";

export default function CampaignBreadcrumb() {
  return (
    <div className="flex items-center h-14 px-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mb-5">
      <span className="text-sm font-medium text-[var(--color-primary)]">
        Campaign
      </span>
      <ChevronRight
        size={14}
        className="mx-2 text-[var(--color-text-muted)]"
      />
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
        Tech Founder
      </span>
    </div>
  );
}
