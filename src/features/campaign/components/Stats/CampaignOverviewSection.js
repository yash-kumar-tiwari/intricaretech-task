"use client";

import Card from "@/components/ui/Card";
import MetricBarChart from "@/components/ui/MetricBarChart";

export default function CampaignOverviewSection({ metrics }) {
  return (
    <Card className="p-5 rounded-xl border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Campaign Overview
        </h3>
        <div className="inline-flex">
          <button
            className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
            style={{
              background: "var(--color-surface-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            LinkedIn
          </button>
          <button
            className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "0px 5px 5px 0px",
            }}
          >
            Email
          </button>
        </div>
      </div>
      <MetricBarChart metrics={metrics} />
    </Card>
  );
}
