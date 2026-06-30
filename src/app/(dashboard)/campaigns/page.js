"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Download, Search, Upload, Users, List, Webhook, Copy, Pause, Play, Pencil, Trash2, Send } from "lucide-react";
import { deleteCampaign, updateCampaign, setFilter } from "@/features/campaign/campaignSlice";
import { CHANNEL_OPTIONS, STATUS_OPTIONS } from "@/features/campaign/constants";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Badge from "@/components/ui/Badge";
import Dropdown from "@/components/ui/Dropdown";
import AvatarGroup from "@/components/ui/AvatarGroup";
import EmptyState from "@/components/ui/EmptyState";
import WorkflowModal from "@/components/campaigns/WorkflowModal";

function EmptyCampaignState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center px-4 pt-12 pb-16">
      {/* ── Illustration ── */}
      <div className="relative mb-6 md:mb-8">
        {/* Decorative dot top-right */}
        <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#8BA6FF]/20" />
        {/* Decorative dot bottom-left */}
        <div className="absolute -bottom-1 -left-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#3762EE]/10" />
        {/* Decorative ring */}
        <div className="absolute -inset-3 md:-inset-4 rounded-full border-2 border-dashed border-[var(--color-border)]" />
        {/* Main icon circle */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#8BA6FF] to-[#3762EE] flex items-center justify-center shadow-lg">
          <Send size={28} className="text-white md:hidden" />
          <Send size={38} className="text-white hidden md:block" />
        </div>
      </div>

      {/* ── Text ── */}
      <h2 className="text-lg md:text-xl font-semibold text-[var(--color-text-primary)] mb-1.5">
        No campaigns yet
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-[280px] md:max-w-sm leading-relaxed mb-6 md:mb-8">
        Get started by creating your first campaign.
      </p>

      {/* ── CTA ── */}
      <Button icon={Plus} onClick={() => setShowWorkflowModal(true)}>
        New Campaign
      </Button>
    </div>
  );
}

const typeIcons = { linkedin: Search, csv: Upload, leads: Users, webhook: Webhook };
const typeLabels = { linkedin: "LinkedIn", csv: "CSV", leads: "Leads", webhook: "Webhook" };
const typeColors = { linkedin: "#3666EE", csv: "#28C76F", leads: "#FF9F43", webhook: "#5E5873" };

const COLUMNS = [
  { key: "checkbox", label: "", width: 40 },
  { key: "campaign", label: "Campaign" },
  { key: "crm", label: "CRM" },
  { key: "invitesSent", label: "Invites Sent", align: "right" },
  { key: "replyRate", label: "Reply Rate", align: "right" },
  { key: "emailSent", label: "Email Sent", align: "right" },
  { key: "sender", label: "Sender" },
  { key: "status", label: "Status" },
  { key: "dailyLimit", label: "Daily Limit", align: "right" },
  { key: "actions", label: "", width: 48 },
];

function CampaignRowActions({ campaign }) {
  const dispatch = useDispatch();
  const items = [
    {
      label: campaign.status === "active" ? "Pause Campaign" : "Resume Campaign",
      icon: campaign.status === "active" ? Pause : Play,
      onClick: () => dispatch(updateCampaign({ ...campaign, status: campaign.status === "active" ? "inactive" : "active" })),
    },
    { label: "Edit", icon: Pencil, onClick: () => {} },
    { label: "Duplicate", icon: Copy, onClick: () => {} },
    { label: "Delete", icon: Trash2, danger: true, onClick: () => dispatch(deleteCampaign(campaign.id)) },
  ];
  return <Dropdown items={items} />;
}

function ReplyRateBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 rounded-full bg-[var(--color-gauge-track)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: value >= 40 ? "#28C76F" : value >= 30 ? "#FF9F43" : "#EA5455" }}
        />
      </div>
      <span className="text-sm text-[var(--color-text-body)] w-10 text-right">{value}%</span>
    </div>
  );
}

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list, filters } = useSelector((s) => s.campaigns);
  const [selected, setSelected] = useState(new Set());
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  // Compute filtered & sorted list
  const filtered = useMemo(() => {
    let result = [...list];
    if (filters.channel && filters.channel !== "all")
      result = result.filter((c) => c.campaignType === filters.channel);
    if (filters.status && filters.status !== "all")
      result = result.filter((c) => c.status === filters.status);
    if (filters.search)
      result = result.filter((c) => c.name.toLowerCase().includes(filters.search.toLowerCase()));
    return result;
  }, [list, filters]);

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((c) => c.id)));
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const hasFilters = filters.channel !== "all" || filters.status !== "all";

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      {list.length === 0 ? (
        <EmptyCampaignState />
      ) : (
        <>
      {/* ── Header ── */}
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

      {/* ── Filters ── */}
      <Card padding="sm" className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-40">
              <Select
                size="sm"
                value={filters.channel}
                options={CHANNEL_OPTIONS}
                onChange={(e) => dispatch(setFilter({ channel: e.target.value }))}
                placeholder="All Channels"
              />
          </div>
          <div className="w-36">
            <Select
              size="sm"
              value={filters.status}
              options={STATUS_OPTIONS}
              onChange={(e) => dispatch(setFilter({ status: e.target.value }))}
              placeholder="All Status"
            />
          </div>
          {hasFilters && (
            <button
              onClick={() => dispatch(setFilter({ channel: "all", status: "all" }))}
              className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </Card>

      {/* ── Table ── */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {COLUMNS.map((col) => {
                  if (col.key === "checkbox")
                    return (
                      <th key={col.key} className="sticky top-0 z-10 px-4 py-3.5 w-10 bg-[var(--color-surface)]" style={{ width: col.width }}>
                        <Checkbox
                          size="sm"
                          checked={allSelected}
                          indeterminate={someSelected}
                          onChange={toggleAll}
                          aria-label="Select all"
                        />
                      </th>
                    );
                  return (
                    <th
                      key={col.key}
                      className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap bg-[var(--color-surface)]"
                      style={{ width: col.width, textAlign: col.align || "left" }}
                    >
                      {col.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="p-0">
                    <EmptyState
                      title="No campaigns found"
                      description={hasFilters ? "Try adjusting your filters." : "Get started by creating your first campaign."}
                      actionLabel={!hasFilters ? "New Campaign" : undefined}
                      onAction={() => {}}
                      size="sm"
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((campaign) => {
                  const TypeIcon = typeIcons[campaign.campaignType] || Search;
                  const typeColor = typeColors[campaign.campaignType] || "#9692A4";
                  const isSelected = selected.has(campaign.id);
                  return (
                    <tr
                      key={campaign.id}
                      className={`border-b border-[var(--color-border)] transition-theme hover:bg-[var(--color-surface-secondary)] ${
                        isSelected ? "bg-[var(--color-primary-light)]" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <Checkbox
                          size="sm"
                          checked={isSelected}
                          onChange={() => toggleOne(campaign.id)}
                          aria-label={`Select ${campaign.name}`}
                        />
                      </td>

                      {/* Campaign */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                            style={{ backgroundColor: `${typeColor}15` }}
                          >
                            <TypeIcon size={14} style={{ color: typeColor }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight">{campaign.name}</p>
                            <p className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5">{typeLabels[campaign.campaignType]}</p>
                          </div>
                        </div>
                      </td>

                      {/* CRM */}
                      <td className="px-4 py-3 text-sm text-[var(--color-text-body)] whitespace-nowrap">{campaign.crm}</td>

                      {/* Invites Sent */}
                      <td className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap">{campaign.invitesSent.toLocaleString()}</td>

                      {/* Reply Rate */}
                      <td className="px-4 py-3">
                        <ReplyRateBar value={campaign.replyRate} />
                      </td>

                      {/* Email Sent */}
                      <td className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap">{campaign.emailSent.toLocaleString()}</td>

                      {/* Sender */}
                      <td className="px-4 py-3">
                        <AvatarGroup
                          users={campaign.senders.map((s) => ({ name: s.name }))}
                          size="sm"
                          max={2}
                        />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <Badge variant={campaign.status === "active" ? "success" : "error"} size="sm">
                          {campaign.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>

                      {/* Daily Limit */}
                      <td className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap">{campaign.dailyLimit}</td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <CampaignRowActions campaign={campaign} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer row count ── */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
            <span>{selected.size > 0 ? `${selected.size} of ${filtered.length} selected` : `${filtered.length} campaigns`}</span>
            {selected.size > 0 && (
              <button
                onClick={() => setSelected(new Set())}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors font-medium"
              >
                Clear selection
              </button>
            )}
          </div>
        )}
      </Card>
        </>
      )}

      <WorkflowModal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
        onConfirm={() => router.push("/campaigns/create")}
      />
    </div>
  );
}
