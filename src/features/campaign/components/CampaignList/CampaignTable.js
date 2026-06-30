"use client";
import Checkbox from "@/components/ui/Checkbox";
import EmptyState from "@/components/ui/EmptyState";
import CampaignTableRow from "./CampaignTableRow";

export default function CampaignTable({
  campaigns,
  selected,
  onToggleOne,
  onToggleAll,
  allSelected,
  someSelected,
  columns,
  typeIcons,
  typeLabels,
  typeColors,
  hasFilters,
  emptyState,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((col) => {
              if (col.key === "checkbox") {
                return (
                  <th
                    key={col.key}
                    className="sticky top-0 z-10 px-4 py-3.5 bg-[var(--color-surface)]"
                    style={{ width: col.width }}
                  >
                    <Checkbox
                      size="sm"
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={onToggleAll}
                      aria-label="Select all"
                    />
                  </th>
                );
              }
              return (
                <th
                  key={col.key}
                  className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap bg-[var(--color-surface)]"
                  style={{
                    width: col.width,
                    textAlign: col.align || "left",
                  }}
                >
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {campaigns.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-0">
                {emptyState || (
                  <EmptyState
                    title="No campaigns found"
                    description={
                      hasFilters
                        ? "Try adjusting your filters."
                        : undefined
                    }
                    size="sm"
                  />
                )}
              </td>
            </tr>
          ) : (
            campaigns.map((campaign) => (
              <CampaignTableRow
                key={campaign.id}
                campaign={campaign}
                isSelected={selected.has(campaign.id)}
                onToggle={() => onToggleOne(campaign.id)}
                columns={columns}
                typeIcons={typeIcons}
                typeLabels={typeLabels}
                typeColors={typeColors}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
