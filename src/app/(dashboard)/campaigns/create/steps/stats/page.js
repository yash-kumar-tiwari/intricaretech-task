"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  PauseCircle,
  Settings,
  Send,
  Upload,
  Users,
  Activity,
  Search,
  List,
  Webhook,
  Target,
  Mail,
  UserPlus,
  Eye,
  Heart,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Play,
  Megaphone,
  Zap,
  Pause,
  Edit3,
} from "lucide-react";
import { motion } from "framer-motion";
import { Stepper, Button, Badge, Card, MetricBarChart } from "@/components/ui";
import {
  campaignStatsData,
  activityTimeline,
  campaignTeamMembers,
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
        <Stepper
          steps={stepperSteps}
          currentStep={3}
          size="md"
          className="-mx-6 px-6 mb-6"
        />
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] mb-5 shadow-[0_4px_14px_rgba(55,98,238,0.3)]">
            <BarChart3 size={36} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            No Stats Yet
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Once Campaign is launched, Statistics will be shown here.
          </p>
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
      <div className="flex items-center h-14 px-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mb-5">
        <span className="text-sm font-medium text-[var(--color-primary)]">
          Campaign
        </span>
        <ChevronRight
          size={14}
          className="mx-2 text-[var(--color-text-muted)]"
        />
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Tech Founder
        </span>
      </div>

      {/* ── Stepper ── */}
      <div className="flex items-center h-16 px-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mb-5">
        <Stepper steps={stepperSteps} currentStep={3} size="md" />
      </div>

      {/* ── Filter Section ── */}
      <div className="flex items-center gap-3 mb-5">
        <select className="w-[180px] h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="relative w-[180px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[72%_28%] gap-5 pb-8">
        {/* ═══ COLUMN 1 (LEFT) ═══ */}
        <div className="flex flex-col gap-5">
          {/* ── Campaign Summary Card ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <Card className="p-5 rounded-[6px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Megaphone
                    size={18}
                    className="text-[var(--color-primary)] shrink-0"
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-inter text-base font-semibold text-[var(--color-text-primary)]">
                      {campaignStatsData.campaignName}
                    </h3>
                    <span className="inline-flex items-center h-[23px] px-2 rounded-[4px] text-xs font-bold text-[var(--color-badge-text)] bg-[var(--color-badge-bg)]">
                      LinkedIn
                    </span>
                    <span className="inline-flex items-center h-[23px] px-2 rounded-[4px] text-xs font-bold text-[var(--color-badge-text)] bg-[var(--color-badge-bg)]">
                      Email
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 h-[23px] px-2.5 rounded-[4px] text-xs font-semibold text-[var(--color-success-text)] bg-[var(--color-success-light)]">
                    <Zap size={12} /> Running
                  </span>
                  <button className="flex items-center justify-center h-8 w-8 rounded-lg text-[var(--color-navbar-text)] hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <Pause size={14} />
                  </button>
                  <button className="flex items-center justify-center h-8 w-8 rounded-lg text-[var(--color-navbar-text)] hover:bg-[var(--color-surface-secondary)] transition-colors">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-7 w-full rounded-[5px] bg-[var(--color-surface-tertiary)] flex items-center px-1">
                  <div className="h-5 w-full rounded-[7px] bg-[var(--color-surface)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaignStatsData.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-[10px]"
                      style={{
                        background: `
                          repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 4px,
                            rgba(255,255,255,0.12) 4px,
                            rgba(255,255,255,0.12) 8px
                          ),
                          linear-gradient(239.27deg, #8BA6FF -27.06%, #3762EE 83.4%)
                        `,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--color-text-primary)]">
                      Created {campaignStatsData.createdAt}
                    </span>
                    <span className="inline-flex items-center h-5 px-2 rounded-[4px] text-[10px] font-semibold text-[var(--color-success-text)] bg-[var(--color-success-light)]">
                      {campaignStatsData.crm} Connected
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-muted)]">
                    {campaignStatsData.processedLeads} /{" "}
                    {campaignStatsData.totalLeads} prospects processed
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── Campaign Overview Card ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <Card className="p-5 rounded-xl border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Campaign Overview
                </h3>
                <div className="inline-flex">
                  <button
                    className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
                    style={{
                      background: "var(--color-surface-secondary)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "5px 0px 0px 5px",
                    }}
                  >
                    LinkedIn
                  </button>
                  <button
                    className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: "0px 5px 5px 0px",
                    }}
                  >
                    Email
                  </button>
                </div>
              </div>
              <MetricBarChart metrics={campaignStatsData.overviewMetrics} />
            </Card>
          </motion.div>

          {/* ── Campaign Actions + Reply Performance (side by side) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Campaign Actions */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              custom={2}
            >
              <Card className="p-5 rounded-xl border-[var(--color-border)] h-full">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Campaign Actions
                  </h3>
                  <div className="inline-flex">
                    <button
                      className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
                      style={{
                        background: "var(--color-surface-secondary)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "5px 0px 0px 5px",
                      }}
                    >
                      LinkedIn
                    </button>
                    <button
                      className="px-[7px] py-1 text-xs font-bold leading-[15px] text-[var(--color-text-muted)] tracking-[0.4px] font-[family-name:var(--font-sans)]"
                      style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      Email
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  Execution stats & engagement signals
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-4">
                    {campaignStatsData.actionMetrics.slice(0, 4).map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-[var(--color-text-primary)] font-semibold">
                          {m.label}
                        </span>
                        <span className="text-sm text-[var(--color-text-primary)] font-bold">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {campaignStatsData.actionMetrics.slice(4).map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-[var(--color-text-primary)] font-semibold">
                          {m.label}
                        </span>
                        <span className="text-sm text-[var(--color-text-primary)] font-bold">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center gap-3 bg-[var(--color-surface-secondary)] -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    Team:
                  </span>
                  <div className="flex -space-x-2">
                    {campaignTeamMembers.map((m) => (
                      <div
                        key={m.initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-[10px] font-semibold ring-2 ring-[var(--color-surface)]"
                      >
                        {m.initials}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Reply Performance */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <Card className="p-5 rounded-xl border-[var(--color-border)] h-full">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  Reply Performance
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  Top reply channel
                </p>
                <div className="space-y-5">
                  {campaignStatsData.replyPerformance.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">
                          {item.type}
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[var(--color-primary-light)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
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
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            custom={4}
          >
            <Card className="p-5 rounded-[6px] border-[var(--color-border)]">
              <h3 className="font-inter text-base font-semibold text-[var(--color-text-primary)]">
                Reply Analysis
              </h3>

              <div className="flex justify-center mt-5 mb-2">
                <svg width="210" height="130" viewBox="0 0 210 130">
                  <defs>
                    <linearGradient
                      id="replyGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="-27.06%" stopColor="#8BA6FF" />
                      <stop offset="83.4%" stopColor="#3762EE" />
                    </linearGradient>
                    <pattern
                      id="vStripes"
                      width="5"
                      height="5"
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1="2.5" y1="0" x2="2.5" y2="5"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.5"
                      />
                    </pattern>
                  </defs>

                  {/* Track (unfilled) */}
                  <path
                    d="M 12 115 A 93 93 0 0 1 198 115"
                    fill="none"
                    strokeWidth="16"
                    strokeLinecap="round"
                    style={{ stroke: "var(--color-gauge-track)" }}
                  />

                  {/* Fill (gradient) */}
                  <path
                    d="M 12 115 A 93 93 0 0 1 198 115"
                    fill="none"
                    stroke="url(#replyGrad)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${(campaignStatsData.replyRate / 100) * Math.PI * 93} ${Math.PI * 93}`}
                  />

                  {/* Vertical stripe overlay on fill */}
                  <path
                    d="M 12 115 A 93 93 0 0 1 198 115"
                    fill="none"
                    stroke="url(#vStripes)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${(campaignStatsData.replyRate / 100) * Math.PI * 93} ${Math.PI * 93}`}
                  />

                  {/* Text */}
                  <text
                    x="105"
                    y="95"
                    textAnchor="middle"
                    fontFamily="Montserrat, sans-serif"
                    fontWeight="600"
                    fontSize="26"
                    style={{ fill: "var(--color-navbar-text)" }}
                  >
                    {campaignStatsData.replyRate}%
                  </text>
                  <text
                    x="105"
                    y="115"
                    textAnchor="middle"
                    fontFamily="Montserrat, sans-serif"
                    fontWeight="700"
                    fontSize="13"
                    style={{ fill: "var(--color-text-primary)" }}
                  >
                    Reply Rate
                  </text>
                </svg>
              </div>

              <div className="border-t border-[var(--color-border)] my-4" />

              <div className="space-y-3">
                {/* Status & Result headers */}
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Status
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Result
                  </span>
                </div>
                {(() => {
                  const figmaColors = {
                    Positive: "#7255DE",
                    Neutral: "var(--color-warning)",
                    Negative: "var(--color-danger)",
                  };
                  return campaignStatsData.replyBreakdown.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-[12px] h-[12px] rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              figmaColors[item.label] || item.color,
                          }}
                        />
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.value}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </Card>
          </motion.div>

          {/* ── Recent Campaign Activity Card ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            custom={5}
          >
            <Card className="p-5 rounded-xl border-[var(--color-border)]">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">
                Recent Campaign Activity
              </h3>
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
                          <IconComp
                            size={14}
                            style={{ color: activity.color }}
                          />
                        </div>
                        {!isLast && (
                          <div
                            className="w-px flex-1 bg-[var(--color-border)]"
                            style={{ minHeight: 32 }}
                          />
                        )}
                      </div>
                      <div className={`${isLast ? "" : "pb-5"}`}>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {activity.time}
                        </p>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5">
                          {activity.message}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          {activity.actor}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline font-medium">
                Open Activity Log <ExternalLink size={10} />
              </button>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
