"use client";
import { Send, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CampaignEmptyState({ onNewCampaign }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center px-4 pt-12 pb-16">
      <div className="relative mb-6 md:mb-8">
        <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#8BA6FF]/20" />
        <div className="absolute -bottom-1 -left-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#3762EE]/10" />
        <div className="absolute -inset-3 md:-inset-4 rounded-full border-2 border-dashed border-[var(--color-border)]" />
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#8BA6FF] to-[#3762EE] flex items-center justify-center shadow-lg">
          <Send size={28} className="text-white md:hidden" />
          <Send size={38} className="text-white hidden md:block" />
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-semibold text-[var(--color-text-primary)] mb-1.5">
        No campaigns yet
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-[280px] md:max-w-sm leading-relaxed mb-6 md:mb-8">
        Get started by creating your first campaign.
      </p>
      <Button icon={Plus} onClick={onNewCampaign}>
        New Campaign
      </Button>
    </div>
  );
}
