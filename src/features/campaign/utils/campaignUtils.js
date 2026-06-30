import { Search, Upload, Users, Webhook } from "lucide-react";

export const typeIcons = {
  linkedin: Search,
  csv: Upload,
  leads: Users,
  webhook: Webhook,
};

export const typeLabels = {
  linkedin: "LinkedIn",
  csv: "CSV",
  leads: "Leads",
  webhook: "Webhook",
};

export const typeColors = {
  linkedin: "#3666EE",
  csv: "#28C76F",
  leads: "#FF9F43",
  webhook: "#5E5873",
};

export const COLUMNS = [
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

export function getReplyRateColor(value) {
  if (value >= 40) return "#28C76F";
  if (value >= 30) return "#FF9F43";
  return "#EA5455";
}

export function filterCampaigns(list, filters) {
  let result = [...list];
  if (filters.channel && filters.channel !== "all")
    result = result.filter((c) => c.campaignType === filters.channel);
  if (filters.status && filters.status !== "all")
    result = result.filter((c) => c.status === filters.status);
  if (filters.search)
    result = result.filter((c) =>
      c.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  return result;
}
