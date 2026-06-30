export const CAMPAIGN_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const CAMPAIGN_STATUS_LABELS = {
  [CAMPAIGN_STATUS.ACTIVE]: "Active",
  [CAMPAIGN_STATUS.INACTIVE]: "Inactive",
};

export const CAMPAIGN_TYPES = ["linkedin", "csv", "leads", "webhook"];

export const WORKFLOW_TYPES = ["standard", "advanced"];

export const AUDIENCE_SOURCES = ["linkedin", "csv", "leads", "webhook"];

export const CHANNEL_OPTIONS = [
  { value: "all", label: "All Channels" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "csv", label: "CSV Upload" },
  { value: "leads", label: "Lead Lists" },
  { value: "webhook", label: "Webhook" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const CREATION_STEPS = [
  { step: 0, label: "Define Target Audience", route: "/campaigns/create" },
  { step: 1, label: "Sender Profiles", route: "/campaigns/create/steps/sender" },
  { step: 2, label: "Settings", route: "/campaigns/create/steps/settings" },
  { step: 3, label: "Stats", route: "/campaigns/create/steps/stats" },
];

export const TABLE_COLUMNS = {
  CAMPAIGNS: [
    { key: "name", label: "Name" },
    { key: "crm", label: "CRM" },
    { key: "invitesSent", label: "Invites Sent" },
    { key: "replyRate", label: "Reply Rate" },
    { key: "status", label: "Status" },
    { key: "actions", label: "ACTIONS" },
  ],
};
