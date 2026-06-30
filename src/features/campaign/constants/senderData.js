import { Mail } from "lucide-react";

export const SENDER_TABS = [
  { value: "linkedin", label: "LinkedIn Profile" },
  { value: "email", label: "Email Accounts", icon: Mail },
];

export const ITEMS_PER_PAGE = 5;

export const statusConfig = {
  connected: { variant: "success", label: "Connected" },
  disconnected: { variant: "error", label: "Disconnected" },
  warning: { variant: "warning", label: "Warning" },
};

const healthScores = [92, 78, 65, 85, 43, 95, 54, 71];
const dailyLimits = [300, 250, 180, 400, 120, 350, 100, 280];
const accountTypes = ["linkedin", "email", "linkedin", "email", "linkedin", "email", "linkedin", "email"];
const statuses = ["connected", "connected", "disconnected", "connected", "connected", "connected", "warning", "connected"];
const accountTypeLabels = ["Sales Navigator", "Outreach", "Sales Navigator", "Outreach", "LinkedIn", "Outreach", "Sales Navigator", "Outreach"];

export function enrichSenderProfiles(profiles) {
  return profiles.map((s, i) => ({
    ...s,
    healthScore: healthScores[i % healthScores.length],
    dailyLimits: dailyLimits[i % dailyLimits.length],
    accountType: accountTypes[i % accountTypes.length],
    status: statuses[i % statuses.length],
    accountTypeLabel: accountTypeLabels[i % accountTypeLabels.length],
  }));
}

export function filterSenderProfiles(profiles, activeTab, searchQuery) {
  let list = profiles.filter((s) => {
    if (activeTab === "linkedin" && s.accountType === "email") return false;
    if (activeTab === "email" && s.accountType === "linkedin") return false;
    return true;
  });
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.accountTypeLabel.toLowerCase().includes(q)
    );
  }
  return list;
}
