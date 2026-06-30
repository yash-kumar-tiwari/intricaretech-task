export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const TIMEZONE_OPTIONS = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "EST", label: "EST (Eastern Standard Time)" },
  { value: "CST", label: "CST (Central Standard Time)" },
  { value: "MST", label: "MST (Mountain Standard Time)" },
  { value: "PST", label: "PST (Pacific Standard Time)" },
  { value: "GMT", label: "GMT (Greenwich Mean Time)" },
  { value: "CET", label: "CET (Central European Time)" },
  { value: "IST", label: "IST (India Standard Time)" },
  { value: "AEST", label: "AEST (Australian Eastern Standard Time)" },
  { value: "JST", label: "JST (Japan Standard Time)" },
];

export const ZAPIER_EVENTS = [
  { id: "responseReceived", label: "Response received" },
  { id: "inviteSent", label: "Invite sent" },
  { id: "invitationAccepted", label: "Invitation accepted" },
  { id: "invitationWithdrawn", label: "Invitation withdrawn" },
  { id: "followupSent", label: "Follow-up Sent" },
];

export const defaultSendingWindow = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  timeFrom: "11:30",
  timeTo: "16:00",
  timezone: "UTC",
};

export const defaultAiAssist = {
  autoReply: false,
  autoHandleLeads: false,
  followUpCount: 3,
};

export const defaultZapierEvents = {
  responseReceived: false,
  inviteSent: false,
  invitationAccepted: false,
  invitationWithdrawn: false,
  followupSent: false,
};
