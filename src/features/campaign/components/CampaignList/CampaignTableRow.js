"use client";
import { Search } from "lucide-react";
import Checkbox from "@/components/ui/Checkbox";
import Badge from "@/components/ui/Badge";
import AvatarGroup from "@/components/ui/AvatarGroup";
import ReplyRateBar from "./ReplyRateBar";
import CampaignRowActions from "./CampaignRowActions";

export default function CampaignTableRow({
  campaign,
  isSelected,
  onToggle,
  columns,
  typeIcons,
  typeLabels,
  typeColors,
}) {
  const TypeIcon = typeIcons[campaign.campaignType] || Search;
  const typeColor = typeColors[campaign.campaignType] || "#9692A4";

  return (
    <tr
      className={`border-b border-[var(--color-border)] transition-theme hover:bg-[var(--color-surface-secondary)] ${
        isSelected ? "bg-[var(--color-primary-light)]" : ""
      }`}
    >
      {columns.map((col) => {
        if (col.key === "checkbox") {
          return (
            <td key={col.key} className="px-4 py-3" style={{ width: col.width }}>
              <Checkbox
                size="sm"
                checked={isSelected}
                onChange={onToggle}
                aria-label={`Select ${campaign.name}`}
              />
            </td>
          );
        }

        if (col.key === "campaign") {
          return (
            <td key={col.key} className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: `${typeColor}15` }}
                >
                  <TypeIcon size={14} style={{ color: typeColor }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight">
                    {campaign.name}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5">
                    {typeLabels[campaign.campaignType]}
                  </p>
                </div>
              </div>
            </td>
          );
        }

        if (col.key === "crm") {
          return (
            <td
              key={col.key}
              className="px-4 py-3 text-sm text-[var(--color-text-body)] whitespace-nowrap"
            >
              {campaign.crm}
            </td>
          );
        }

        if (col.key === "invitesSent") {
          return (
            <td
              key={col.key}
              className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap"
            >
              {campaign.invitesSent.toLocaleString()}
            </td>
          );
        }

        if (col.key === "replyRate") {
          return (
            <td key={col.key} className="px-4 py-3">
              <ReplyRateBar value={campaign.replyRate} />
            </td>
          );
        }

        if (col.key === "emailSent") {
          return (
            <td
              key={col.key}
              className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap"
            >
              {campaign.emailSent.toLocaleString()}
            </td>
          );
        }

        if (col.key === "sender") {
          return (
            <td key={col.key} className="px-4 py-3">
              <AvatarGroup
                users={campaign.senders.map((s) => ({ name: s.name }))}
                size="sm"
                max={2}
              />
            </td>
          );
        }

        if (col.key === "status") {
          return (
            <td key={col.key} className="px-4 py-3">
              <Badge
                variant={campaign.status === "active" ? "success" : "error"}
                size="sm"
              >
                {campaign.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </td>
          );
        }

        if (col.key === "dailyLimit") {
          return (
            <td
              key={col.key}
              className="px-4 py-3 text-sm text-[var(--color-text-body)] text-right whitespace-nowrap"
            >
              {campaign.dailyLimit}
            </td>
          );
        }

        if (col.key === "actions") {
          return (
            <td key={col.key} className="px-4 py-3">
              <CampaignRowActions campaign={campaign} />
            </td>
          );
        }

        return <td key={col.key} className="px-4 py-3" />;
      })}
    </tr>
  );
}
