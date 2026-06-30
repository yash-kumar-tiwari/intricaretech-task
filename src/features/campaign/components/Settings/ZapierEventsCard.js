"use client";

import { Zap } from "lucide-react";
import { ZAPIER_EVENTS } from "@/features/campaign/constants/settingsData";

export default function ZapierEventsCard({ register }) {
  return (
    <div className="pt-5 border-t border-[var(--color-border)]">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <Zap size={16} className="text-[var(--color-primary)]" /> Zapier Events
      </h3>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">Select events to trigger Zapier</p>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {ZAPIER_EVENTS.map((evt) => (
          <label key={evt.id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register(`zapierEvents.${evt.id}`)}
              className="h-4 w-4 rounded border-[var(--color-border-strong)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span className="text-sm text-[var(--color-text-body)] whitespace-nowrap">{evt.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--color-border)]">
        <span className="text-xs text-[var(--color-text-muted)]">Works with:</span>
        {["Zapier", "n8n", "Webhooks"].map((tool) => (
          <span key={tool} className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[10px] font-medium text-[var(--color-text-body)]">
            <Zap size={10} className="text-[var(--color-primary)]" />
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
