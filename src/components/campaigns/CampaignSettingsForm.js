"use client";

import { Calendar, Target } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const timezoneOptions = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "EST", label: "EST (Eastern Standard Time)" },
  { value: "PST", label: "PST (Pacific Standard Time)" },
];

const scheduleOptions = [
  { value: "immediate", label: "Immediately" },
  { value: "scheduled", label: "Scheduled" },
];

export default function CampaignSettingsForm({ values, onChange }) {
  const update = (key) => (e) => onChange?.({ ...values, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
          <Target size={16} className="text-[#3666EE]" /> Campaign Details
        </h3>
        <div className="space-y-4">
          <Input label="Campaign Name" placeholder="Enter campaign name" value={values.name} onChange={update("name")} />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#5E5873]">Description</label>
            <textarea
              placeholder="Enter campaign description"
              value={values.description}
              onChange={update("description")}
              rows={3}
              className="w-full rounded-[5px] border border-[#D8D6DE] bg-white px-3 py-2.5 text-sm text-[#444050] outline-none resize-none placeholder:text-xs placeholder:text-[#9692A4] focus:border-[#3666EE] transition-colors"
            />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-[#3666EE]" /> Schedule
        </h3>
        <div className="space-y-4">
          <Select label="Start Schedule" value={values.schedule} onChange={update("schedule")} options={scheduleOptions} />
          <Input label="Start Date" type="date" value={values.startDate} onChange={update("startDate")} />
          <Input label="End Date" type="date" value={values.endDate} onChange={update("endDate")} />
          <Select label="Timezone" value={values.timezone} onChange={update("timezone")} options={timezoneOptions} />
          <Input label="Daily Send Limit" type="number" placeholder="e.g. 500" value={values.dailyLimit} onChange={update("dailyLimit")} />
        </div>
      </Card>
    </div>
  );
}
