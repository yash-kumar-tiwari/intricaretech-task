"use client";

import { Controller } from "react-hook-form";
import { Bot, MessageCircle, Users, X, Plus, Zap } from "lucide-react";
import Toggle from "@/components/ui/Toggle";

export default function AiAssistCard({ control, watch, setValue }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <Bot size={16} className="text-[var(--color-primary)]" /> AI Assist
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-body)]">Auto message after reply detected</span>
          </div>
          <Controller
            name="aiAssist.autoReply"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Toggle checked={value} onChange={onChange} />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-body)]">Auto handle leads after follow-ups</span>
          </div>
          <Controller
            name="aiAssist.autoHandleLeads"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Toggle checked={value} onChange={onChange} />
            )}
          />
        </div>

        <Controller
          name="aiAssist.autoHandleLeads"
          control={control}
          render={({ field: { value } }) => (
            <div className={`flex items-center gap-3 pl-7 transition-all ${!value ? "opacity-40 pointer-events-none" : ""}`}>
              <span className="text-xs text-[var(--color-text-muted)]">After</span>
              <Controller
                name="aiAssist.followUpCount"
                control={control}
                render={({ field: { value: count, onChange } }) => (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={!value}
                      onClick={() => onChange(Math.max(1, count - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded border border-[var(--color-border-strong)] text-[var(--color-text-body)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-40"
                    >
                      <X size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-[var(--color-text-primary)]">{count}</span>
                    <button
                      type="button"
                      disabled={!value}
                      onClick={() => onChange(Math.min(10, count + 1))}
                      className="flex h-7 w-7 items-center justify-center rounded border border-[var(--color-border-strong)] text-[var(--color-text-body)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-40"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                )}
              />
              <span className="text-xs text-[var(--color-text-muted)]">follow-ups</span>
            </div>
          )}
        />

        <button type="button" className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:underline">
          <Zap size={12} /> Train AI
        </button>
      </div>
    </div>
  );
}
