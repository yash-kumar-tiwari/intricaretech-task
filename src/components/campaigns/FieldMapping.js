"use client";

import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";

const CSV_FIELDS = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Location"];
const CONTACT_FIELDS = ["Name", "Email", "Phone", "Company", "Job Title", "Location"];
const DEFAULT_MAPPING = {
  "Full Name": "Name",
  "Email Address": "Email",
  "Phone Number": "Phone",
  "Company": "Company",
  "Job Title": "Job Title",
  "Location": "Location",
};

export default function FieldMapping({ mapping = DEFAULT_MAPPING, onChange, disabled = false }) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#5E5873]">CSV Fields</div>
        <div />
        <div className="text-xs font-semibold uppercase tracking-wider text-[#5E5873]">Contact Fields</div>
      </div>

      {CSV_FIELDS.map((csv) => (
        <div key={csv} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mt-3">
          <div className="rounded-md border border-[#EBE9F1] bg-white px-3 py-2.5 text-sm text-[#444050]">
            {csv}
          </div>
          <ArrowRight size={16} className="text-[#3666EE]" />
          <select
            value={mapping[csv]}
            onChange={(e) => onChange?.({ ...mapping, [csv]: e.target.value })}
            className="rounded-md border border-[#D8D6DE] bg-white px-3 py-2.5 text-sm text-[#444050] outline-none focus:border-[#3666EE] transition-colors"
            disabled={disabled}
          >
            {CONTACT_FIELDS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      ))}
    </Card>
  );
}

export { CSV_FIELDS, CONTACT_FIELDS, DEFAULT_MAPPING };
