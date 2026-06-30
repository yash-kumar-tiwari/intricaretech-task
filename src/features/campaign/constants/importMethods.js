import { Search, Upload, Users, Webhook } from "lucide-react";

export const importMethods = [
  {
    id: "linkedin",
    label: "LinkedIn Search",
    description: "Search LinkedIn profiles based on specific criteria",
    icon: Search,
    color: "#3666EE",
  },
  {
    id: "csv",
    label: "Upload CSV",
    description: "Import contacts from a CSV or XLSX file",
    icon: Upload,
    color: "#28C76F",
  },
  {
    id: "leads",
    label: "Lookalike Audience",
    description: "Use existing lookalike audience lists",
    icon: Users,
    color: "#FF9F43",
  },
  {
    id: "webhook",
    label: "Inbound Webhook",
    description: "Receive data via webhook integration",
    icon: Webhook,
    color: "#5E5873",
  },
];
