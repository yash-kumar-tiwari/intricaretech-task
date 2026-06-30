"use client";

import HealthScoreCircle from "./HealthScoreCircle";
import Checkbox from "@/components/ui/Checkbox";
import Badge from "@/components/ui/Badge";
import { statusConfig } from "@/features/campaign/constants/senderData";

const defaultColumns = [
  { key: "name", label: "Name" },
  { key: "healthScore", label: "Health Score" },
  { key: "dailyLimits", label: "Daily Limits" },
  { key: "accountType", label: "Account Type" },
  { key: "status", label: "Status" },
];

export default function SenderTable({ profiles, selectedIds, onToggle, allSelected, someSelected, onToggleAll, columns = defaultColumns }) {
  const showColumn = (key) => columns.some((c) => c.key === key);

  return (
    <div className="overflow-x-auto rounded-[5px] border border-[var(--color-border)]">
      <table className="w-full border-collapse" aria-label="Sender profiles">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
            <th className="px-4 py-3.5 w-12">
              <Checkbox checked={allSelected} indeterminate={someSelected} onChange={onToggleAll} size="sm" aria-label="Select all" />
            </th>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profiles.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-[var(--color-text-muted)]">
                No sender profiles found
              </td>
            </tr>
          ) : (
            profiles.map((s) => {
              const cfg = statusConfig[s.status] || statusConfig.connected;
              return (
                <tr key={s.id} className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-secondary)]">
                  <td className="px-4 py-3">
                    <Checkbox checked={selectedIds.has(s.id)} onChange={() => onToggle(s.id)} size="sm" aria-label={`Select ${s.name}`} />
                  </td>
                  {showColumn("name") && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-xs font-semibold shrink-0">
                          {s.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">{s.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)] truncate">{s.email}</div>
                        </div>
                      </div>
                    </td>
                  )}
                  {showColumn("healthScore") && (
                    <td className="px-4 py-3"><HealthScoreCircle score={s.healthScore} /></td>
                  )}
                  {showColumn("dailyLimits") && (
                    <td className="px-4 py-3"><span className="text-sm text-[var(--color-text-body)]">{s.dailyLimits}</span></td>
                  )}
                  {showColumn("accountType") && (
                    <td className="px-4 py-3"><span className="text-sm text-[var(--color-text-body)]">{s.accountTypeLabel}</span></td>
                  )}
                  {showColumn("status") && (
                    <td className="px-4 py-3">
                      <Badge variant={cfg.variant} size="sm" dot>{cfg.label}</Badge>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
