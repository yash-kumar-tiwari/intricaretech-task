"use client";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

export default function CampaignFilterBar({
  filters,
  channelOptions,
  statusOptions,
  onFilterChange,
  hasFilters,
  onClear,
}) {
  return (
    <Card padding="sm" className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-40">
          <Select
            size="sm"
            value={filters.channel}
            options={channelOptions}
            onChange={(e) => onFilterChange({ channel: e.target.value })}
            placeholder="All Channels"
          />
        </div>
        <div className="w-36">
          <Select
            size="sm"
            value={filters.status}
            options={statusOptions}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            placeholder="All Status"
          />
        </div>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
    </Card>
  );
}
