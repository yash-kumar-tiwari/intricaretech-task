"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Zap, MessageCircle, Users, Plus, X, Bot, Globe, Server, Workflow } from "lucide-react";
import { Stepper, Button, Input, Select, Toggle } from "@/components/ui";
import Card from "@/components/ui/Card";
import { updateCampaignSettings, setWizardStep } from "@/features/campaign/campaignSlice";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const windowSchema = z.object({
  days: z.array(z.string()).min(1, "Select at least one day"),
  timeFrom: z.string().min(1, "Start time required"),
  timeTo: z.string().min(1, "End time required"),
  timezone: z.string().min(1, "Timezone required"),
});

const settingsSchema = z.object({
  campaignName: z.string().min(2, "Campaign name must be at least 2 characters").max(100, "Max 100 characters"),
  sendingWindows: z.array(windowSchema).min(1, "At least one sending window required"),
  aiAssist: z.object({
    autoReply: z.boolean(),
    autoHandleLeads: z.boolean(),
    followUpCount: z.number().min(1).max(10),
  }),
  zapierEvents: z.object({
    responseReceived: z.boolean(),
    inviteSent: z.boolean(),
    invitationAccepted: z.boolean(),
    invitationWithdrawn: z.boolean(),
    followupSent: z.boolean(),
  }),
});

const steps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const TIMEZONE_OPTIONS = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "EST", label: "EST (Eastern Standard Time)" },
  { value: "CST", label: "CST (Central Standard Time)" },
  { value: "MST", label: "MST (Mountain Standard Time)" },
  { value: "PST", label: "PST (Pacific Standard Time)" },
  { value: "GMT", label: "GMT (Greenwich Mean Time)" },
  { value: "CET", label: "CET (Central European Time)" },
  { value: "IST", label: "IST (India Standard Time)" },
  { value: "AEST", label: "AEST (Australian Eastern Standard Time)" },
  { value: "JST", label: "JST (Japan Standard Time)" },
];

const ZAPIER_EVENTS = [
  { id: "responseReceived", label: "Response received" },
  { id: "inviteSent", label: "Invite sent" },
  { id: "invitationAccepted", label: "Invitation accepted" },
  { id: "invitationWithdrawn", label: "Invitation withdrawn" },
  { id: "followupSent", label: "Follow-up Sent" },
];

export default function SettingsStep() {
  const dispatch = useDispatch();
  const router = useRouter();
  const savedSettings = useSelector((s) => s.campaigns.campaignSettings);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: savedSettings?.campaignName ? savedSettings : {
      campaignName: "",
      sendingWindows: [
        { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], timeFrom: "11:30", timeTo: "16:00", timezone: "UTC" },
      ],
      aiAssist: {
        autoReply: false,
        autoHandleLeads: false,
        followUpCount: 3,
      },
      zapierEvents: {
        responseReceived: false,
        inviteSent: false,
        invitationAccepted: false,
        invitationWithdrawn: false,
        followupSent: false,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "sendingWindows" });

  const addWindow = () => {
    append({ days: ["Mon", "Tue", "Wed", "Thu", "Fri"], timeFrom: "09:00", timeTo: "17:00", timezone: "UTC" });
  };

  const removeWindow = (idx) => {
    if (fields.length > 1) remove(idx);
  };

  const toggleDay = (windowIdx, day) => {
    const current = watch(`sendingWindows.${windowIdx}.days`) || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    setValue(`sendingWindows.${windowIdx}.days`, updated, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    dispatch(updateCampaignSettings(data));
    dispatch(setWizardStep(3));
    router.push("/campaigns/create/steps/stats");
  };

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <Link
        href="/campaigns/create/steps/sender"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">Campaign Settings</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">Configure your campaign details and schedule</p>

      <Stepper steps={steps} currentStep={2} size="md" className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-5">
          {/* ── Campaign Name ── */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Campaign Name</h3>
            <Input
              label="Campaign Name"
              placeholder="Enter campaign name"
              error={errors.campaignName?.message}
              {...register("campaignName")}
            />
          </div>

          {/* ── Sending Window + AI Assist ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Sending Window */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Clock size={16} className="text-[var(--color-primary)]" /> Sending Window
              </h3>

              <div className="space-y-4">
                {fields.map((field, windowIdx) => (
                  <div key={field.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[var(--color-text-primary)]">Window {windowIdx + 1}</span>
                      {fields.length > 1 && (
                        <button type="button" onClick={() => removeWindow(windowIdx)} className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors">
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-[var(--color-text-primary)] mb-2 block">Days</label>
                        <div className="flex flex-wrap gap-2">
                          {DAYS.map((day) => {
                            const days = watch(`sendingWindows.${windowIdx}.days`) || [];
                            const isActive = days.includes(day);
                            return (
                              <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(windowIdx, day)}
                                className={`px-3 py-1.5 text-xs rounded-[5px] border font-medium transition-all ${
                                  isActive
                                    ? "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white border-transparent"
                                    : "bg-[var(--color-surface)] text-[var(--color-text-body)] border-[var(--color-border-strong)] hover:border-[var(--color-primary)]"
                                }`}
                              >
                                {day.toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                        {errors.sendingWindows?.[windowIdx]?.days && (
                          <span role="alert" className="text-xs text-[var(--color-danger)] mt-1.5 block">
                            {errors.sendingWindows[windowIdx].days.message}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="From"
                          type="time"
                          error={errors.sendingWindows?.[windowIdx]?.timeFrom?.message}
                          {...register(`sendingWindows.${windowIdx}.timeFrom`)}
                        />
                        <Input
                          label="To"
                          type="time"
                          error={errors.sendingWindows?.[windowIdx]?.timeTo?.message}
                          {...register(`sendingWindows.${windowIdx}.timeTo`)}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-[var(--color-text-primary)] mb-1.5 block">Timezone</label>
                        <select
                          {...register(`sendingWindows.${windowIdx}.timezone`)}
                          className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors"
                        >
                          {TIMEZONE_OPTIONS.map((tz) => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addWindow} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:underline">
                  <Plus size={12} /> Add New Window
                </button>
              </div>
            </div>

            {/* AI Assist */}
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
          </div>

          {/* ── Zapier Events ── */}
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
        </Card>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/campaigns/create/steps/sender">
            <Button variant="secondary" type="button">Previous</Button>
          </Link>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
