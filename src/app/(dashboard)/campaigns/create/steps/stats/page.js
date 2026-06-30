"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  BarChart3, ChevronLeft, ChevronRight, Clock, MessageSquare, TrendingUp,
  PauseCircle, Settings, FileText, Send, Upload, Users,
  AlertTriangle, Zap, Activity, Search, List, Webhook,
  Target, Mail, UserPlus, Eye, Heart, ThumbsUp, MessageCircle,
  ExternalLink, Play, Plus, Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Stepper, Button, Badge, Card, RadialChart, ProgressBar } from "@/components/ui";
import Checkbox from "@/components/ui/Checkbox";
import {
  mockCampaigns, campaignStatsData, activityTimeline, campaignTeamMembers,
  statsSenderProfiles,
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

const segmentTabs = ["LinkedIn Profile", "Email Accounts"];

const statusVariant = {
  Connected: "success",
  Warning: "warning",
  Disconnected: "error",
};

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35 },
  }),
};

const ITEMS_PER_PAGE = 5;

export default function StatsStep() {
  const wizardStep = useSelector(selectWizardStep);
  const [activeSegment, setActiveSegment] = useState("LinkedIn Profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProfiles = statsSenderProfiles.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE));
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const allPageSelected = paginatedProfiles.length > 0 &&
    paginatedProfiles.every((p) => selectedRows.has(p.id));
  const someSelected = selectedRows.size > 0 && !allPageSelected;

  const toggleAll = () => {
    if (allPageSelected) {
      const next = new Set(selectedRows);
      paginatedProfiles.forEach((p) => next.delete(p.id));
      setSelectedRows(next);
    } else {
      const next = new Set(selectedRows);
      paginatedProfiles.forEach((p) => next.add(p.id));
      setSelectedRows(next);
    }
  };

  const toggleOne = (id) => {
    const next = new Set(selectedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedRows(next);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
                    <h3 className="text-base font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)]">{campaignStatsData.campaignName}</h3>
                    <Badge variant="info" size="sm">LinkedIn</Badge>
                    <Badge variant="success" size="sm" dot>{campaign.status === "active" ? "Running" : "Inactive"}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">Created {campaignStatsData.createdAt}</span>
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
              <div className="h-2 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${campaignStatsData.progress}%`,
                    background: "linear-gradient(90deg, #8BA6FF 0%, #3762EE 100%)",
                    maxWidth: "264px",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-inter)]">{campaignStatsData.processedLeads} / {campaignStatsData.totalLeads} prospects processed</p>
            </div>
          </Card>
        </motion.div>

        {/* ── Reply Analysis ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={1}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)] mb-4">Reply Analysis</h3>
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
                      <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">{seg.label}</p>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">{seg.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Campaign Overview (bar chart style) ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={2}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-[var(--color-primary)]" /> Campaign Overview
            </h3>
            <div className="flex flex-wrap md:flex-nowrap">
              {campaignStatsData.overviewMetrics.map((metric, idx) => {
                const IconComp = metricIcons[metric.label] || BarChart3;
                const isLast = idx === campaignStatsData.overviewMetrics.length - 1;
                return (
                  <div
                    key={metric.label}
                    className="flex-1 flex flex-col items-center px-3 py-3 min-w-[120px]"
                  >
                    <div
                      className="w-full h-1 rounded-full mb-3"
                      style={{ backgroundColor: metric.label === "Replies" ? "var(--color-primary)" : "var(--color-border)" }}
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                        <IconComp size={16} />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5 text-center font-[family-name:var(--font-inter)]">{metric.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">{metric.value}</span>
                    </div>
                    <span
                      className={`text-[10px] font-medium mt-0.5 px-1.5 py-0.5 rounded ${
                        metric.up
                          ? "bg-[#E5F8EE] text-[var(--color-success)]"
                          : "bg-[#FFF3DF] text-[var(--color-warning)]"
                      }`}
                    >
                      {metric.growth}
                    </span>
                    {!isLast && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[var(--color-border)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* ── Campaign Actions ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={3}>
          <Card className="p-5">
            <h3 className="text-sm font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)] mb-4">Campaign Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {campaignStatsData.actionMetrics.map((metric) => {
                const IconComp = actionIcons[metric.label] || Activity;
                return (
                  <div key={metric.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] shrink-0">
                      <IconComp size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[var(--color-text-muted)] truncate font-[family-name:var(--font-inter)]">{metric.label}</p>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">{metric.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">Team Members:</span>
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
            <h3 className="text-sm font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--color-primary)]" /> Reply Performance
            </h3>
            <div className="space-y-4">
              {campaignStatsData.replyPerformance.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--color-text-body)] font-[family-name:var(--font-inter)]">{item.type}</span>
                    <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">{item.value}%</span>
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
            <h3 className="text-sm font-semibold font-[family-name:var(--font-sans)] text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
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
                      <p className="text-sm font-medium text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">{activity.time}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">by</span>
                        <span className="text-xs font-medium text-[var(--color-text-body)] font-[family-name:var(--font-inter)]">{activity.actor}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline font-[family-name:var(--font-inter)]">
              Open Activity Log <ExternalLink size={10} />
            </button>
          </Card>
        </motion.div>

        {/* ── Sender Profiles (table with segmented tabs) ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={6}>
          <Card padding="none" className="overflow-hidden">
            {/* Segmented Tabs */}
            <div className="flex items-center gap-1 p-5 pb-0">
              <div className="inline-flex rounded-[5px] bg-[var(--color-surface-secondary)] p-0.5">
                {segmentTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSegment(tab)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-[4px] transition-all ${
                      activeSegment === tab
                        ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Search + Add Account */}
            <div className="flex items-center justify-between gap-4 p-5 pb-0">
              <div className="relative flex-1 max-w-[280px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] pl-9 pr-3 py-2 text-xs outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 transition-theme placeholder:text-[var(--color-text-muted)]"
                />
              </div>
              <Button size="sm" icon={Plus}>Add Account</Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-5">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[#F3F2F7]">
                    <th className="px-4 py-3.5 w-10">
                      <Checkbox
                        size="sm"
                        checked={allPageSelected}
                        indeterminate={someSelected}
                        onChange={toggleAll}
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap font-[family-name:var(--font-sans)]">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap font-[family-name:var(--font-sans)]">
                      Email
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap font-[family-name:var(--font-sans)]">
                      Salary
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] whitespace-nowrap font-[family-name:var(--font-sans)]">
                      Status
                    </th>
                    <th className="px-4 py-3.5 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedProfiles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">
                        No sender profiles found
                      </td>
                    </tr>
                  ) : (
                    paginatedProfiles.map((profile) => {
                      const isSelected = selectedRows.has(profile.id);
                      return (
                        <tr
                          key={profile.id}
                          className={`border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-secondary)] ${
                            isSelected ? "bg-[var(--color-primary-light)]" : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <Checkbox
                              size="sm"
                              checked={isSelected}
                              onChange={() => toggleOne(profile.id)}
                              aria-label={`Select ${profile.name}`}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">{profile.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-[var(--color-text-body)] font-[family-name:var(--font-inter)]">{profile.email}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-[var(--color-text-body)] font-[family-name:var(--font-inter)]">{profile.salary}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={statusVariant[profile.status] || "neutral"} size="sm">
                              {profile.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                              aria-label={`Delete ${profile.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-inter)]">
                {selectedRows.size > 0
                  ? `${selectedRows.size} of ${filteredProfiles.length} selected`
                  : `${filteredProfiles.length} profiles`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center h-7 w-7 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center h-7 w-7 rounded text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "bg-[var(--color-primary)] text-white"
                        : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center h-7 w-7 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
