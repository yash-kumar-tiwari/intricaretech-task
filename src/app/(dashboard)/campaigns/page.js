"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Download, Search, Upload, Users, List, Webhook } from "lucide-react";
import { setFilter } from "@/features/campaign/campaignSlice";
import { CHANNEL_OPTIONS, STATUS_OPTIONS } from "@/features/campaign/constants";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import WorkflowModal from "@/components/campaigns/WorkflowModal";
import CampaignEmptyState from "@/features/campaign/components/CampaignList/CampaignEmptyState";
import CampaignFilterBar from "@/features/campaign/components/CampaignList/CampaignFilterBar";
import CampaignTable from "@/features/campaign/components/CampaignList/CampaignTable";
import TableFooter from "@/features/campaign/components/CampaignList/TableFooter";
import {
  typeIcons,
  typeLabels,
  typeColors,
  COLUMNS,
  filterCampaigns,
} from "@/features/campaign/utils/campaignUtils";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list, filters } = useSelector((s) => s.campaigns);
  const [selected, setSelected] = useState(new Set());
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  const filtered = useMemo(() => filterCampaigns(list, filters), [list, filters]);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = useCallback(() => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((c) => c.id)));
  }, [allSelected, filtered]);

  const toggleOne = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const hasFilters = filters.channel !== "all" || filters.status !== "all";

  if (list.length === 0) {
    return (
      <div className="px-6" style={{ maxWidth: "1124px" }}>
        <CampaignEmptyState onNewCampaign={() => setShowWorkflowModal(true)} />
        <WorkflowModal
          isOpen={showWorkflowModal}
          onClose={() => setShowWorkflowModal(false)}
          onConfirm={() => router.push("/campaigns/create")}
        />
      </div>
    );
  }

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)]">Campaign</h1>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Download}>
            <span className="hidden sm:inline">Export List</span>
          </Button>
          <Button icon={Plus} onClick={() => setShowWorkflowModal(true)}>
            New Campaign
          </Button>
        </div>
      </div>

      <CampaignFilterBar
        filters={filters}
        channelOptions={CHANNEL_OPTIONS}
        statusOptions={STATUS_OPTIONS}
        onFilterChange={(change) => dispatch(setFilter(change))}
        hasFilters={hasFilters}
        onClear={() => dispatch(setFilter({ channel: "all", status: "all" }))}
      />

      <Card padding="none" className="overflow-hidden">
        <CampaignTable
          campaigns={filtered}
          selected={selected}
          onToggleOne={toggleOne}
          onToggleAll={toggleAll}
          allSelected={allSelected}
          someSelected={someSelected}
          columns={COLUMNS}
          typeIcons={typeIcons}
          typeLabels={typeLabels}
          typeColors={typeColors}
          hasFilters={hasFilters}
        />

        <TableFooter
          filteredCount={filtered.length}
          selectedCount={selected.size}
          onClearSelection={() => setSelected(new Set())}
        />
      </Card>

      <WorkflowModal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
        onConfirm={() => router.push("/campaigns/create")}
      />
    </div>
  );
}
