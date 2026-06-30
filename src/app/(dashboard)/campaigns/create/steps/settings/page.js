"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Zap, MessageCircle, Users } from "lucide-react";
import { Stepper, Button, Input, Select, Toggle } from "@/components/ui";
import Card from "@/components/ui/Card";
import { updateCampaignSettings } from "@/features/campaign/campaignSlice";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const settingsSchema = z.object({
  campaignName: z.string().min(2, "Campaign name must be at least 2 characters"),
  days: z.array(z.string()).min(1, "Select at least one day"),
  timeFrom: z.string().min(1, "Start time is required"),
  timeTo: z.string().min(1, "End time is required"),
  timezone: z.string().min(1, "Timezone is required"),
  autoReply: z.boolean(),
  autoHandleLeads: z.boolean(),
});

const steps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

export default function SettingsStep() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      campaignName: "",
      days: [],
      timeFrom: "",
      timeTo: "",
      timezone: "UTC",
      autoReply: false,
      autoHandleLeads: false,
    },
  });

  const selectedDays = watch("days");

  const toggleDay = (day) => {
    const current = selectedDays || [];
    if (current.includes(day)) {
      setValue("days", current.filter((d) => d !== day), { shouldValidate: true });
    } else {
      setValue("days", [...current, day], { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    dispatch(updateCampaignSettings(data));
    router.push("/campaigns/create/steps/stats");
  };

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <Link
        href="/campaigns/create/steps/sender"
        className="inline-flex items-center gap-1.5 text-sm text-[#9692A4] hover:text-[#3666EE] transition-colors mb-4"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <h1 className="text-[22px] font-semibold text-[#5E5873] mb-2">Campaign Settings</h1>
      <p className="text-sm text-[#9692A4] mb-6">Configure your campaign details and schedule</p>

      <Stepper steps={steps} currentStep={2} size="md" className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#5E5873] mb-4">Campaign Name</h3>
          <Input
            label="Campaign Name"
            placeholder="Enter campaign name"
            error={errors.campaignName?.message}
            {...register("campaignName")}
          />
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
            <Clock size={16} className="text-[#3666EE]" /> Sending Window
          </h3>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-[#5E5873] mb-2 block">Days</label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => {
                  const isActive = selectedDays?.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 text-sm rounded-[5px] border transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white border-transparent"
                          : "bg-white text-[#6E6B7B] border-[#D8D6DE] hover:border-[#3666EE]"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              {errors.days && (
                <span role="alert" className="text-xs text-[#EA5455] mt-1.5 block">
                  {errors.days.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="From"
                type="time"
                error={errors.timeFrom?.message}
                {...register("timeFrom")}
              />
              <Input
                label="To"
                type="time"
                error={errors.timeTo?.message}
                {...register("timeTo")}
              />
            </div>

            <Select
              label="Timezone"
              error={errors.timezone?.message}
              options={[
                { value: "UTC", label: "UTC (Coordinated Universal Time)" },
                { value: "EST", label: "EST (Eastern Standard Time)" },
                { value: "PST", label: "PST (Pacific Standard Time)" },
              ]}
              {...register("timezone")}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
            <Zap size={16} className="text-[#3666EE]" /> AI Assist Panel
          </h3>
          <div className="space-y-4">
            <Controller
              name="autoReply"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-[#9692A4]" />
                    <span className="text-sm text-[#6E6B7B]">Auto Reply</span>
                  </div>
                  <Toggle checked={value} onChange={onChange} />
                </div>
              )}
            />
            <Controller
              name="autoHandleLeads"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[#9692A4]" />
                    <span className="text-sm text-[#6E6B7B]">Auto Handle Leads</span>
                  </div>
                  <Toggle checked={value} onChange={onChange} />
                </div>
              )}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
            <Zap size={16} className="text-[#3666EE]" /> Zapier Events
          </h3>
          <p className="text-xs text-[#9692A4] mb-3">
            Connect your campaign to Zapier for automated workflows.
          </p>
          <div className="rounded-[5px] border border-[#EBE9F1] bg-[#F8F8F8] p-4">
            <p className="text-xs text-[#6E6B7B]">
              Zapier integration allows you to trigger actions in thousands of apps
              whenever events happen in your campaign (e.g., new lead, reply received,
              campaign completed).
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-4">
          <div />
          <div className="flex gap-3">
            <Link href="/campaigns/create/steps/sender">
              <Button variant="secondary">Previous</Button>
            </Link>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
