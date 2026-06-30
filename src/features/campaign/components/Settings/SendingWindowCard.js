"use client";

import { Clock, X, Plus } from "lucide-react";
import Input from "@/components/ui/Input";
import { DAYS, TIMEZONE_OPTIONS } from "@/features/campaign/constants/settingsData";

export default function SendingWindowCard({ fields, append, remove, register, errors, watch, setValue, control }) {
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

  return (
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
  );
}
