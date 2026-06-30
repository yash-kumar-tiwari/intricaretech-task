"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import {
  BarChart3, ChevronLeft, Clock, MessageSquare, TrendingUp,
  PauseCircle, Settings, FileText, Send, Upload, Users,
  AlertTriangle, Zap, Activity, Search, List, Webhook,
  Target, Mail, UserPlus, Eye, Heart, ThumbsUp, MessageCircle,
  ExternalLink, Play,
} from "lucide-react";
import { motion } from "framer-motion";
import { Stepper, Button, Badge, Card, ProgressBar, RadialChart } from "@/components/ui";
import {
  mockCampaigns, campaignStatsData, activityTimeline, campaignTeamMembers,
} from "@/features/campaign/mockData";
import { selectWizardStep } from "@/features/campaign/selectors";

const campaign = mockCampaigns[0];

const campaignTypeIcons = {
  linkedin: Search, csv: Upload, leads: List, webhook: Webhook,
};

const stepperSteps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const metricIcons = {
  "New Leads": Users,
  "Invites Sent": Send,
  "Invites Accepted": UserPlus,
  "Messages Sent": MessageSquare,
  "Replies": MessageCircle,
};

const actionIcons = {
  "Remaining Leads": Target,
  "Follow-up message": MessageSquare,
  "InMails Sent": Mail,
  "Emails": Mail,
  "Profile Viewed": Eye,
  "Profile Followed": Heart,
  "Skills Endorsed": ThumbsUp,
  "Comments Added": MessageCircle,
};

const timelineIcons = {
  CheckCircle: (props) => <BarChart3 {...props} />,
  Upload: (props) => <Upload {...props} />,
  Users: (props) => <Users {...props} />,
  AlertTriangle: (props) => <AlertTriangle {...props} />,
  MessageSquare: (props) => <MessageSquare {...props} />,
};

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35 },
  }),
};

export default function StatsStep() {
  const wizardStep = useSelector(selectWizardStep);

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
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Back
        </Link>

        <Stepper steps={stepperSteps} currentStep={3} size="md" className="-mx-6 px-6 mb-6" />

        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] mb-5 shadow-[0_4px_14px_rgba(55,98,238,0.3)]">
            <BarChart3 size={36} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">No Stats Yet</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Once Campaign is launched, Statistics will be shown here.</p>
          <div className="flex gap-3">
            <Link href="/campaigns/create/steps/settings">
              <Button variant="outline">Back</Button>
            </Link>
            <Button icon={Play}>Launch Campaign</Button>
          </div>
        </div>
      </motion.div>
    );
  }

  const TypeIcon = campaignTypeIcons[campaign.campaignType] || Send;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-6"
      style={{ maxWidth: "1124px" }}
    >
      <Stepper steps={stepperSteps} currentStep={3} size="md" className="-mx-6 px-6 mb-6" />

      <div className="grid grid-cols-1 gap-5 pb-8">
        {/* ── Campaign Card ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={0}>
          <Card className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white shrink-0">
                  <TypeIcon size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{campaignStatsData.campaignName}</h3>
                    <Badge variant="info" size="sm">LinkedIn</Badge>
                    <Badge variant="success" size="sm" dot>{campaign.status === "active" ? "Running" : "Inactive"}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs text-[var(--color-text-muted)]">Created {campaignStatsData.createdAt}</span>
                    <Badge variant="info" size="sm">{campaignStatsData.crm} Connected</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={PauseCircle}>Pause</Button>
                <Button variant="outline" size="sm" icon={Settings}>Edit</Button>
              </div>
            </div>

            <div className="mt-4">
              <ProgressBar value={campaignStatsData.progress} color="primary" size="md" />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{campaignStatsData.processedLeads} / {campaignStatsData.totalLeads} prospects processed</p>
            </div>
          </Card>
        </motion.div>

        {/* ── Reply Analysis ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={1}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Reply Analysis</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <RadialChart
                value={campaignStatsData.replyRate}
                segments={campaignStatsData.replyBreakdown}
                size={180}
              />
              <div className="flex flex-wrap gap-3">
                {campaignStatsData.replyBreakdown.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 min-w-[120px]">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">{seg.label}</p>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{seg.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Campaign Overview ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={2}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-[var(--color-primary)]" /> Campaign Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {campaignStatsData.overviewMetrics.map((metric) => {
                const IconComp = metricIcons[metric.label] || BarChart3;
                return (
                  <div key={metric.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                        <IconComp size={16} />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{metric.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[var(--color-text-primary)]">{metric.value}</span>
                      <span className={`text-[10px] font-medium ${metric.up ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                        {metric.growth}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* ── Campaign Actions ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={3}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Campaign Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {campaignStatsData.actionMetrics.map((metric) => {
                const IconComp = actionIcons[metric.label] || Activity;
                return (
                  <div key={metric.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] shrink-0">
                      <IconComp size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[var(--color-text-muted)] truncate">{metric.label}</p>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{metric.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)]">Team Members:</span>
              <div className="flex -space-x-2">
                {campaignTeamMembers.map((m) => (
                  <div
                    key={m.initials}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-[10px] font-semibold ring-2 ring-[var(--color-surface)]"
                    title={`${m.name} - ${m.role}`}
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Reply Performance ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={4}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--color-primary)]" /> Reply Performance
            </h3>
            <div className="space-y-4">
              {campaignStatsData.replyPerformance.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--color-text-body)]">{item.type}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ── Recent Campaign Activity ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={5}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Activity size={16} className="text-[var(--color-primary)]" /> Recent Campaign Activity
            </h3>
            <div className="space-y-0">
              {activityTimeline.map((activity, idx) => {
                const IconComp = timelineIcons[activity.icon] || Activity;
                const isLast = idx === activityTimeline.length - 1;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <IconComp size={14} style={{ color: activity.color }} />
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-[var(--color-border)] min-h-[24px]" />}
                    </div>
                    <div className={`${isLast ? "" : "pb-6"}`}>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[var(--color-text-muted)]">{activity.time}</span>
                        <span className="text-xs text-[var(--color-text-muted)]">by</span>
                        <span className="text-xs font-medium text-[var(--color-text-body)]">{activity.actor}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
              Open Activity Log <ExternalLink size={10} />
            </button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
