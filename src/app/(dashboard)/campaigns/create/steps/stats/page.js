"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  BarChart3, ChevronLeft, ChevronRight, MessageSquare, TrendingUp,
  PauseCircle, Settings, Send, Upload, Users,
  Activity, Search, List, Webhook,
  Target, Mail, UserPlus, Eye, Heart, ThumbsUp, MessageCircle,
  ExternalLink, Play, Megaphone, Zap, Pause, Edit3,
} from "lucide-react";
import { motion } from "framer-motion";
import { Stepper, Button, Badge, Card, GaugeChart, MetricBarChart } from "@/components/ui";
import {
  campaignStatsData, activityTimeline, campaignTeamMembers,
} from "@/features/campaign/mockData";
import { selectWizardStep } from "@/features/campaign/selectors";

const stepperSteps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const timelineIconMap = {
  Play: (props) => <Play {...props} />,
  MessageCircle: (props) => <MessageCircle {...props} />,
  Send: (props) => <Send {...props} />,
  UserCheck: (props) => <Users {...props} />,
  PauseCircle: (props) => <PauseCircle {...props} />,
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-6"
      style={{ maxWidth: "1124px" }}
    >
      {/* ── Breadcrumb ── */}
      <div className="flex items-center h-14 px-5 bg-white rounded-xl border border-[#E9EDF5] mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <span className="text-sm font-medium text-[#3666EE]">Campaign</span>
        <ChevronRight size={14} className="mx-2 text-[#8B93A7]" />
        <span className="text-sm font-semibold text-[#1F2937]">Tech Founder</span>
      </div>

      {/* ── Stepper ── */}
      <div className="flex items-center h-16 px-5 bg-white rounded-xl border border-[#E9EDF5] mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <Stepper steps={stepperSteps} currentStep={3} size="md" />
      </div>

      {/* ── Filter Section ── */}
      <div className="flex items-center gap-3 mb-5">
        <select className="w-[180px] h-10 rounded-xl border border-[#E9EDF5] bg-white px-3 text-sm text-[#1F2937] outline-none focus:border-[#3666EE] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="relative w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B93A7] pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 rounded-xl border border-[#E9EDF5] bg-white pl-9 pr-3 text-sm text-[#1F2937] outline-none placeholder:text-[#8B93A7] focus:border-[#3666EE] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[72%_28%] gap-5 pb-8">

        {/* ═══ COLUMN 1 (LEFT) ═══ */}
        <div className="flex flex-col gap-5">

          {/* ── Campaign Summary Card ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" custom={0}>
            <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white shrink-0">
                    <Megaphone size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-[#1F2937]">{campaignStatsData.campaignName}</h3>
                      <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[10px] font-medium bg-[#EAEFFF] text-[#3666EE]">LinkedIn</span>
                      <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[10px] font-medium bg-[#EAEFFF] text-[#3666EE]">Email</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-[10px] font-medium bg-[#E6F9EE] text-[#28C76F]">
                    <Zap size={10} /> Running
                  </span>
                  <button className="flex items-center justify-center h-8 w-8 rounded-lg text-[#8B93A7] hover:bg-[#F7F8FC] transition-colors">
                    <Pause size={14} />
                  </button>
                  <button className="flex items-center justify-center h-8 w-8 rounded-lg text-[#8B93A7] hover:bg-[#F7F8FC] transition-colors">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-2 w-full rounded-full bg-[#EEF2FF] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaignStatsData.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1)" }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8B93A7]">Created {campaignStatsData.createdAt}</span>
                    <span className="inline-flex items-center h-5 px-2 rounded-full text-[10px] font-medium bg-[#E6F9EE] text-[#28C76F]">{campaignStatsData.crm} Connected</span>
                  </div>
                  <span className="text-xs font-medium text-[#8B93A7]">{campaignStatsData.processedLeads} / {campaignStatsData.totalLeads} prospects processed</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── Campaign Overview Card ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" custom={1}>
            <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)]" style={{ minHeight: "300px" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-[#1F2937]">Campaign Overview</h3>
                <div className="inline-flex rounded-lg bg-[#F7F8FC] p-0.5">
                  <button className="px-3 py-1 text-xs font-medium rounded-[7px] bg-white text-[#1F2937] shadow-sm">LinkedIn</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-[7px] text-[#8B93A7]">Email</button>
                </div>
              </div>
              <MetricBarChart metrics={campaignStatsData.overviewMetrics} maxBarHeight={110} />
            </Card>
          </motion.div>

          {/* ── Campaign Actions + Reply Performance (side by side) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Campaign Actions */}
            <motion.div variants={stagger} initial="hidden" animate="show" custom={2}>
              <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-[#1F2937]">Campaign Actions</h3>
                  <div className="inline-flex rounded-lg bg-[#F7F8FC] p-0.5">
                    <button className="px-3 py-1 text-xs font-medium rounded-[7px] bg-white text-[#1F2937] shadow-sm">LinkedIn</button>
                    <button className="px-3 py-1 text-xs font-medium rounded-[7px] text-[#8B93A7]">Email</button>
                  </div>
                </div>
                <p className="text-xs text-[#8B93A7] mb-5">Execution stats & engagement signals</p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-4">
                    {campaignStatsData.actionMetrics.slice(0, 4).map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <span className="text-sm text-[#1F2937] font-semibold">{m.label}</span>
                        <span className="text-sm text-[#1F2937] font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {campaignStatsData.actionMetrics.slice(4).map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <span className="text-sm text-[#1F2937] font-semibold">{m.label}</span>
                        <span className="text-sm text-[#1F2937] font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E9EDF5] flex items-center gap-3 bg-[#F7F8FC] -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
                  <span className="text-xs text-[#8B93A7]">Team:</span>
                  <div className="flex -space-x-2">
                    {campaignTeamMembers.map((m) => (
                      <div
                        key={m.initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-[10px] font-semibold ring-2 ring-white"
                      >
                        {m.initials}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Reply Performance */}
            <motion.div variants={stagger} initial="hidden" animate="show" custom={3}>
              <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)] h-full">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-1">Reply Performance</h3>
                <p className="text-xs text-[#8B93A7] mb-5">Top reply channel</p>
                <div className="space-y-5">
                  {campaignStatsData.replyPerformance.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-[#1F2937]">{item.type}</span>
                        <span className="text-sm font-semibold text-[#1F2937]">{item.value}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[#EEF2FF] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ═══ COLUMN 2 (RIGHT) ═══ */}
        <div className="flex flex-col gap-5">

          {/* ── Reply Analysis Card ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" custom={4}>
            <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col items-center">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-4 self-start">Reply Analysis</h3>
              <GaugeChart
                value={campaignStatsData.replyRate}
                segments={campaignStatsData.replyBreakdown}
                size={160}
                label="Discussions"
              />
            </Card>
          </motion.div>

          {/* ── Recent Campaign Activity Card ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" custom={5}>
            <Card className="p-5 bg-white rounded-xl border border-[#E9EDF5] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-5">Recent Campaign Activity</h3>
              <div className="space-y-0">
                {activityTimeline.map((activity, idx) => {
                  const IconComp = timelineIconMap[activity.icon] || Activity;
                  const isLast = idx === activityTimeline.length - 1;
                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                          style={{ backgroundColor: `${activity.color}15` }}
                        >
                          <IconComp size={14} style={{ color: activity.color }} />
                        </div>
                        {!isLast && <div className="w-px flex-1 bg-[#E9EDF5]" style={{ minHeight: 32 }} />}
                      </div>
                      <div className={`${isLast ? "" : "pb-5"}`}>
                        <p className="text-xs text-[#8B93A7]">{activity.time}</p>
                        <p className="text-sm font-semibold text-[#1F2937] mt-0.5">{activity.message}</p>
                        <p className="text-xs text-[#8B93A7] mt-0.5">{activity.actor}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 inline-flex items-center gap-1 text-xs text-[#3666EE] hover:underline font-medium">
                Open Activity Log <ExternalLink size={10} />
              </button>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
