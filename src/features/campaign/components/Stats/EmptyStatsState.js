"use client";

import { BarChart3, ChevronLeft, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EmptyStatsState({ onLaunch }) {
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
          <Button icon={Play} onClick={onLaunch}>Launch Campaign</Button>
        </div>
      </div>
    </motion.div>
  );
}
