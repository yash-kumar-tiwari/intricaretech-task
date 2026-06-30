"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import {
  BarChart3,
  ChevronLeft,
  Clock,
  MessageSquare,
  TrendingUp,
  PauseCircle,
  Settings as SettingsIcon,
  FileText,
  Send,
  CheckCircle,
  Upload,
  Users,
  AlertTriangle,
  Zap,
  Activity,
  Search,
  List,
  Webhook,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Stepper, Button, Badge, Card, ProgressBar } from "@/components/ui";
import {
  mockCampaigns,
  dailyPerformance,
  engagementDistribution,
  growthTrend,
  statsCards,
} from "@/features/campaign/mockData";
import { selectWizardStep } from "@/features/campaign/selectors";

const campaignTypeIcons = {
  linkedin: Search,
  csv: Upload,
  leads: List,
  webhook: Webhook,
};

const campaign = mockCampaigns[0];

const stepperSteps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const chartData = dailyPerformance.map((d) => ({
  name: d.name,
  Sent: d.sent,
  Replied: Math.round(d.opened * 0.65),
}));

const activities = [
  { time: "2 days ago", icon: CheckCircle, color: "#28C76F", description: "Campaign launched" },
  { time: "2 days ago", icon: Upload, color: "#3666EE", description: "CSV uploaded" },
  { time: "1 day ago", icon: Users, color: "#FF9F43", description: "Lookalike audience added" },
  { time: "12 hours ago", icon: AlertTriangle, color: "#EA5455", description: "Daily limit reached" },
  { time: "3 hours ago", icon: Zap, color: "#28C76F", description: "Reply spike detected" },
];

const replyStats = [
  { label: "Total Replies", value: "2,847", icon: MessageSquare, color: "#3666EE" },
  { label: "Avg Response Time", value: "4.2h", icon: Clock, color: "#FF9F43" },
  { label: "Conversion Rate", value: "12.5%", icon: TrendingUp, color: "#28C76F" },
];

export default function StatsStep() {
  const wizardStep = useSelector(selectWizardStep);
  const TypeIcon = campaignTypeIcons[campaign.campaignType] || Send;

  if (wizardStep < 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6"
        style={{ maxWidth: "1124px" }}
      >
        <Link
          href="/campaigns/create/steps/settings"
          className="inline-flex items-center gap-1.5 text-sm text-[#9692A4] hover:text-[#3666EE] transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Back
        </Link>

        <Stepper steps={stepperSteps} currentStep={3} size="md" className="-mx-6 px-6 mb-6" />

        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] mb-5 shadow-[0_4px_14px_rgba(55,98,238,0.3)]">
            <BarChart3 size={36} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-[#5E5873] mb-2">No Stats Yet</h2>
          <p className="text-sm text-[#9692A4] mb-6">Launch your campaign to see analytics</p>
          <Link href="/campaigns/create/steps/settings">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-6"
      style={{ maxWidth: "1124px" }}
    >
      <Stepper steps={stepperSteps} currentStep={3} size="md" className="-mx-6 px-6 mb-6" />

      <div className="grid grid-cols-1 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white">
                  <TypeIcon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#5E5873]">{campaign.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant={campaign.status === "active" ? "success" : "neutral"} size="sm">
                      {campaign.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-xs text-[#9692A4]">Created Mar 15, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-5">
            <ProgressBar value={68} color="primary" size="lg" label="Campaign Progress" showLabel />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#5E5873] mb-4">Reply Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {replyStats.map((stat) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 p-4 rounded-lg bg-[#F8F8F8] border border-[#EBE9F1]"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <IconComp size={18} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-[#9692A4]">{stat.label}</p>
                      <p className="text-lg font-bold text-[#5E5873]">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-[#3666EE]" /> Campaign Overview
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE9F1" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="Sent" fill="#3666EE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Replied" fill="#28C76F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#5E5873] mb-4">Campaign Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" icon={PauseCircle}>Pause Campaign</Button>
              <Button variant="outline" icon={SettingsIcon}>Edit Settings</Button>
              <Button variant="outline" icon={FileText}>View Reports</Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#3666EE]" /> Reply Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBE9F1" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="growth" stroke="#3666EE" strokeWidth={2} dot={{ fill: "#3666EE", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
              <Activity size={16} className="text-[#3666EE]" /> Recent Campaign Activity
            </h3>
            <div className="space-y-0">
              {activities.map((activity, idx) => {
                const ActivityIcon = activity.icon;
                const isLast = idx === activities.length - 1;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <ActivityIcon size={14} style={{ color: activity.color }} />
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-[#EBE9F1] min-h-[24px]" />}
                    </div>
                    <div className={`${isLast ? "" : "pb-6"}`}>
                      <p className="text-sm font-medium text-[#5E5873]">{activity.description}</p>
                      <p className="text-xs text-[#9692A4] mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
