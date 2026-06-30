"use client";

import { Megaphone, Zap, Pause, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const stagger = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function CampaignSummarySection({ data }) {
  return (
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
                {data.campaignName}
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
                animate={{ width: `${data.progress}%` }}
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
                Created {data.createdAt}
              </span>
              <span className="inline-flex items-center h-5 px-2 rounded-[4px] text-[10px] font-semibold text-[var(--color-success-text)] bg-[var(--color-success-light)]">
                {data.crm} Connected
              </span>
            </div>
            <span className="text-xs font-bold text-[var(--color-text-muted)]">
              {data.processedLeads} / {data.totalLeads} prospects processed
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
