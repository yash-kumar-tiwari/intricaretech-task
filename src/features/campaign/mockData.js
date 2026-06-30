export const mockCampaigns = [
  { id: "1", name: "Tech Innovators Outreach", campaignType: "linkedin", crm: "Salesforce", invitesSent: 3420, replyRate: 42.1, emailSent: 2850, senders: [{ name: "John Doe", initials: "JD" }, { name: "Sarah Johnson", initials: "SJ" }], status: "active", dailyLimit: 500 },
  { id: "2", name: "Healthcare Connect", campaignType: "csv", crm: "HubSpot", invitesSent: 2150, replyRate: 38.4, emailSent: 1800, senders: [{ name: "John Doe", initials: "JD" }], status: "active", dailyLimit: 300 },
  { id: "3", name: "Finance Leaders Program", campaignType: "linkedin", crm: "Salesforce", invitesSent: 5100, replyRate: 45.2, emailSent: 4200, senders: [{ name: "Sarah Johnson", initials: "SJ" }, { name: "Mike Chen", initials: "MC" }], status: "active", dailyLimit: 750 },
  { id: "4", name: "Education Reform Initiative", campaignType: "leads", crm: "Pipedrive", invitesSent: 1800, replyRate: 36.7, emailSent: 1500, senders: [{ name: "John Doe", initials: "JD" }], status: "active", dailyLimit: 250 },
  { id: "5", name: "Green Energy Project", campaignType: "webhook", crm: "HubSpot", invitesSent: 2900, replyRate: 40.3, emailSent: 2400, senders: [{ name: "Sarah Johnson", initials: "SJ" }], status: "active", dailyLimit: 400 },
  { id: "6", name: "Real Estate Expansion", campaignType: "csv", crm: "Zoho", invitesSent: 1650, replyRate: 31.2, emailSent: 1200, senders: [{ name: "John Doe", initials: "JD" }, { name: "Sarah Johnson", initials: "SJ" }, { name: "Mike Chen", initials: "MC" }], status: "inactive", dailyLimit: 200 },
  { id: "7", name: "E-Commerce Growth Plan", campaignType: "linkedin", crm: "Salesforce", invitesSent: 4100, replyRate: 35.8, emailSent: 3600, senders: [{ name: "Sarah Johnson", initials: "SJ" }], status: "inactive", dailyLimit: 600 },
  { id: "8", name: "AI Research Consortium", campaignType: "webhook", crm: "Pipedrive", invitesSent: 3800, replyRate: 48.5, emailSent: 3200, senders: [{ name: "John Doe", initials: "JD" }, { name: "Mike Chen", initials: "MC" }], status: "inactive", dailyLimit: 500 },
  { id: "9", name: "Manufacturing 4.0", campaignType: "leads", crm: "Zoho", invitesSent: 1200, replyRate: 28.9, emailSent: 900, senders: [{ name: "Mike Chen", initials: "MC" }], status: "inactive", dailyLimit: 150 },
  { id: "10", name: "Startup Accelerator", campaignType: "linkedin", crm: "HubSpot", invitesSent: 6200, replyRate: 44.3, emailSent: 5500, senders: [{ name: "John Doe", initials: "JD" }, { name: "Sarah Johnson", initials: "SJ" }], status: "inactive", dailyLimit: 1000 },
];

export const campaignTypes = [
  { id: "linkedin", label: "LinkedIn Search", description: "Search LinkedIn profiles based on specific criteria", icon: "Search" },
  { id: "csv", label: "Upload CSV File", description: "Import contacts from a CSV file", icon: "Upload" },
  { id: "leads", label: "Lead Lists", description: "Use existing lead lists for your campaign", icon: "List" },
  { id: "webhook", label: "Inbound Webhook", description: "Receive data via webhook integration", icon: "Webhook" },
];

export const audienceSources = [
  { id: "linkedin", label: "LinkedIn Search", description: "Search specific profiles and companies on LinkedIn", icon: "Search" },
  { id: "csv", label: "Upload CSV File", description: "Import contacts list from a CSV file", icon: "Upload" },
  { id: "leads", label: "Lead Lists", description: "Select from existing lead lists", icon: "Users" },
  { id: "webhook", label: "RSS Feed", description: "Connect an RSS feed to import contacts", icon: "Radio" },
];

export const workflowTypes = [
  { id: "standard", label: "Standard Workflow", description: "Use predefined templates with basic automation rules for quick campaign setup.", icon: "Zap", features: ["Basic automation rules", "Predefined templates", "Simple triggers"] },
  { id: "advanced", label: "Advanced Workflow", description: "Full control over automation with custom conditions, multi-step sequences, and API integrations.", icon: "Sliders", features: ["Custom conditions & branches", "Multi-step sequences", "API & webhook integrations", "A/B testing"] },
];

export const lookalikeResults = [
  { id: "1", name: "Tech Leaders NYC", size: 12450, email: "leaders@techlist.com", description: "Senior tech professionals in New York City" },
  { id: "2", name: "Healthcare Pioneers", size: 8900, email: "pioneers@healthlist.com", description: "Healthcare innovators and decision makers" },
  { id: "3", name: "Startup Founders 2026", size: 15300, email: "founders@startuplist.com", description: "Active startup founders and co-founders" },
  { id: "4", name: "Finance Executives", size: 6700, email: "execs@financelist.com", description: "C-level finance professionals" },
  { id: "5", name: "AI & ML Engineers", size: 11200, email: "engineers@ailist.com", description: "AI and machine learning specialists" },
];

export const selectedLookalikeDefaults = [
  { id: "1", name: "Tech Leaders NYC", size: 12450, email: "leaders@techlist.com" },
  { id: "3", name: "Startup Founders 2026", size: 15300, email: "founders@startuplist.com" },
];

export const csvFields = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Location"];
export const contactFields = ["Name", "Email", "Phone", "Company", "Job Title", "Location"];

export const defaultFieldMappings = {
  "Full Name": "Name",
  "Email Address": "Email",
  "Phone Number": "Phone",
  "Company": "Company",
  "Job Title": "Job Title",
  "Location": "Location",
};

export const senderProfiles = [
  { id: "sp1", name: "John Doe", email: "john.doe@frontendtask.com", initials: "JD" },
  { id: "sp2", name: "Sarah Johnson", email: "sarah.j@frontendtask.com", initials: "SJ" },
  { id: "sp3", name: "Mike Chen", email: "mike.chen@frontendtask.com", initials: "MC" },
];

export const dailyPerformance = [
  { name: "Mon", sent: 120, opened: 85, clicked: 42 },
  { name: "Tue", sent: 230, opened: 160, clicked: 78 },
  { name: "Wed", sent: 180, opened: 125, clicked: 60 },
  { name: "Thu", sent: 290, opened: 200, clicked: 110 },
  { name: "Fri", sent: 200, opened: 140, clicked: 68 },
  { name: "Sat", sent: 150, opened: 100, clicked: 45 },
  { name: "Sun", sent: 90, opened: 60, clicked: 25 },
];

export const engagementDistribution = [
  { name: "Opened", value: 35, color: "#3666EE" },
  { name: "Clicked", value: 25, color: "#28C76F" },
  { name: "Replied", value: 15, color: "#FF9F43" },
  { name: "Bounced", value: 10, color: "#EA5455" },
  { name: "No Action", value: 15, color: "#EBE9F1" },
];

export const growthTrend = [
  { name: "Week 1", growth: 10 },
  { name: "Week 2", growth: 25 },
  { name: "Week 3", growth: 18 },
  { name: "Week 4", growth: 35 },
  { name: "Week 5", growth: 28 },
  { name: "Week 6", growth: 45 },
];

export const statsCards = [
  { label: "Total Sent", value: "12,540", change: "+12.5%", icon: "Send", color: "#3666EE" },
  { label: "Open Rate", value: "68.2%", change: "+5.2%", icon: "MousePointerClick", color: "#28C76F" },
  { label: "Click Rate", value: "42.1%", change: "+3.8%", icon: "TrendingUp", color: "#FF9F43" },
  { label: "Unique Reach", value: "8,450", change: "+18.3%", icon: "Users", color: "#5E5873" },
];

export const defaultCampaignSettings = {
  campaignName: "",
  sendingWindows: [
    { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], timeFrom: "11:30", timeTo: "16:00", timezone: "UTC" },
  ],
  aiAssist: {
    autoReply: false,
    autoHandleLeads: false,
    followUpCount: 3,
  },
  zapierEvents: {
    responseReceived: false,
    inviteSent: false,
    invitationAccepted: false,
    invitationWithdrawn: false,
    followupSent: false,
  },
};

/* ── Step 4: Stats Dashboard Mock Data ── */

export const campaignStatsData = {
  campaignName: "Tech Founder",
  campaignType: "linkedin",
  status: "active",
  createdAt: "8 Jan, 2026",
  crm: "Salesforce",
  totalLeads: 200,
  processedLeads: 74,
  progress: 75,
  replyRate: 80,
  replyBreakdown: [
    { label: "Positive", value: 12, color: "#8B5CF6" },
    { label: "Neutral", value: 14, color: "#F59E0B" },
    { label: "Negative", value: 8, color: "#EF4444" },
  ],
  overviewMetrics: [
    { label: "New Leads", value: "1,628", growth: null, up: true, barValue: 100, color: "#8B5CF6" },
    { label: "Invites Sent", value: "988", growth: "+61%", up: true, barValue: 61, color: "#3B82F6" },
    { label: "Invites Accepted", value: "507", growth: "+49%", up: true, barValue: 49, color: "#10B981" },
    { label: "Messages Sent", value: "460", growth: "+91%", up: true, barValue: 91, color: "#22C55E" },
    { label: "Replies", value: "202", growth: "+44%", up: true, barValue: 44, color: "#6EE7B7" },
  ],
  actionMetrics: [
    { label: "Remaining Leads", value: "110" },
    { label: "Follow-up message", value: "10" },
    { label: "InMails Sent", value: "20" },
    { label: "Emails", value: "89" },
    { label: "Profile Viewed", value: "45" },
    { label: "Profile Followed", value: "140" },
    { label: "Skills Endorsed", value: "50" },
    { label: "Comments Added", value: "54" },
  ],
  replyPerformance: [
    { type: "Follow-up", value: 80, color: "#3B82F6" },
    { type: "InMail", value: 32, color: "#10B981" },
    { type: "Email", value: 11, color: "#EF4444" },
    { type: "Connection Message", value: 79, color: "#3B82F6" },
  ],
};

export const activityTimeline = [
  { time: "09:14 AM", icon: "Play", color: "#3B82F6", message: "Campaign started", actor: "Aman S." },
  { time: "10:30 AM", icon: "MessageCircle", color: "#8B5CF6", message: "Reply received", actor: "Suresh K." },
  { time: "10:35 AM", icon: "Send", color: "#EF4444", message: "Follow-up message sent", actor: "System" },
  { time: "10:35 AM", icon: "UserCheck", color: "#F59E0B", message: "Connection accepted", actor: "Suresh K. (Prospect)" },
  { time: "10:45 AM", icon: "PauseCircle", color: "#3B82F6", message: "Campaign paused", actor: "Aman S." },
];

export const campaignTeamMembers = [
  { name: "Alice", initials: "AL" },
  { name: "Bob", initials: "BO" },
  { name: "Charlie", initials: "CH" },
];

export const statsSenderProfiles = [
  { id: "s1", name: "John Doe", email: "john.doe@example.com", salary: "$3,500", status: "Connected" },
  { id: "s2", name: "Sarah Johnson", email: "sarah.j@example.com", salary: "$4,200", status: "Connected" },
  { id: "s3", name: "Mike Chen", email: "mike.chen@example.com", salary: "$3,800", status: "Warning" },
  { id: "s4", name: "Emily Rodriguez", email: "emily.r@example.com", salary: "$4,500", status: "Connected" },
  { id: "s5", name: "David Kim", email: "david.kim@example.com", salary: "$2,900", status: "Disconnected" },
  { id: "s6", name: "Lisa Thompson", email: "lisa.t@example.com", salary: "$5,100", status: "Connected" },
  { id: "s7", name: "James Wilson", email: "james.w@example.com", salary: "$3,200", status: "Warning" },
];
