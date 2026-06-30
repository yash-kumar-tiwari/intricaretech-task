"use client";
export default function ReplyRateBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 rounded-full bg-[var(--color-gauge-track)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            backgroundColor:
              value >= 40 ? "#28C76F" : value >= 30 ? "#FF9F43" : "#EA5455",
          }}
        />
      </div>
      <span className="text-sm text-[var(--color-text-body)] w-10 text-right">
        {value}%
      </span>
    </div>
  );
}
