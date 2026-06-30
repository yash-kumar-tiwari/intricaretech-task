"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Stepper } from "@/components/ui";
import {
  campaignStatsData,
  activityTimeline,
  campaignTeamMembers,
} from "@/features/campaign/mockData";
import { selectWizardStep } from "@/features/campaign/selectors";
import { stagger, stepperSteps } from "@/features/campaign/utils/statsUtils";
import CampaignBreadcrumb from "@/features/campaign/components/Stats/CampaignBreadcrumb";
import CampaignSummarySection from "@/features/campaign/components/Stats/CampaignSummarySection";
import CampaignOverviewSection from "@/features/campaign/components/Stats/CampaignOverviewSection";
import CampaignActionsSection from "@/features/campaign/components/Stats/CampaignActionsSection";
import ReplyAnalysisSection from "@/features/campaign/components/Stats/ReplyAnalysisSection";
import ReplyPerformanceSection from "@/features/campaign/components/Stats/ReplyPerformanceSection";
import RecentActivitySection from "@/features/campaign/components/Stats/RecentActivitySection";
import EmptyStatsState from "@/features/campaign/components/Stats/EmptyStatsState";

export default function StatsStep() {
  const wizardStep = useSelector(selectWizardStep);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  if (wizardStep < 3) {
    return <EmptyStatsState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-6"
      style={{ maxWidth: "1124px" }}
    >
      <CampaignBreadcrumb />

      <div className="flex items-center h-16 px-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mb-5">
        <Stepper steps={stepperSteps} currentStep={3} size="md" />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-[180px] h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors"
        >
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[72%_28%] gap-5 pb-8">
        <div className="flex flex-col gap-5">
          <motion.div variants={stagger} initial="hidden" animate="show" custom={0}>
            <CampaignSummarySection data={campaignStatsData} />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" custom={1}>
            <CampaignOverviewSection metrics={campaignStatsData.overviewMetrics} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div variants={stagger} initial="hidden" animate="show" custom={2}>
              <CampaignActionsSection
                actionMetrics={campaignStatsData.actionMetrics}
                teamMembers={campaignTeamMembers}
              />
            </motion.div>

            <motion.div variants={stagger} initial="hidden" animate="show" custom={3}>
              <ReplyPerformanceSection data={campaignStatsData.replyPerformance} />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <motion.div variants={stagger} initial="hidden" animate="show" custom={4}>
            <ReplyAnalysisSection
              replyRate={campaignStatsData.replyRate}
              replyBreakdown={campaignStatsData.replyBreakdown}
            />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" custom={5}>
            <RecentActivitySection activities={activityTimeline} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
