"use client";

import Card from "@/components/ui/Card";

export default function CampaignActionsSection({ actionMetrics, teamMembers }) {
  return (
    <Card className="p-5 rounded-xl border-[var(--color-border)] h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Campaign Actions
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
      <p className="text-xs text-[var(--color-text-muted)] mb-5">
        Execution stats & engagement signals
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-4">
          {actionMetrics.slice(0, 4).map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-[var(--color-text-primary)] font-semibold">
                {m.label}
              </span>
              <span className="text-sm text-[var(--color-text-primary)] font-bold">
                {m.value}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {actionMetrics.slice(4).map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-[var(--color-text-primary)] font-semibold">
                {m.label}
              </span>
              <span className="text-sm text-[var(--color-text-primary)] font-bold">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center gap-3 bg-[var(--color-surface-secondary)] -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
        <span className="text-xs text-[var(--color-text-muted)]">
          Team:
        </span>
        <div className="flex -space-x-2">
          {teamMembers.map((m) => (
            <div
              key={m.initials}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-[10px] font-semibold ring-2 ring-[var(--color-surface)]"
            >
              {m.initials}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
