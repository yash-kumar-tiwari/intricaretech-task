"use client";

import { useEffect, useState } from "react";

export default function GaugeChart({ value = 0, segments = [], size = 180, strokeWidth = 12, label = "Discussions" }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * r;
  const pct = Math.min(Math.max(animatedValue, 0), 100);
  const dash = (pct / 100) * circumference;
  const offset = circumference - dash;
  const startX = cx - r;
  const endX = cx + r;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 50} viewBox={`0 0 ${size} ${size / 2 + 40}`} className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`}
          fill="none"
          stroke="#EEF2FF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="36" fontWeight="700" fill="#1F2937">
          {Math.round(pct)}%
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fontSize="12" fill="#8B93A7">
          {label}
        </text>
      </svg>

      {segments.length > 0 && (
        <div className="w-full mt-2">
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#E9EDF5] text-[11px] font-semibold uppercase tracking-wider text-[#8B93A7]">
            <span>Status</span>
            <span>Results</span>
          </div>
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-sm text-[#1F2937] font-medium">{seg.label}</span>
              </div>
              <span className="text-sm text-[#1F2937] font-semibold">{seg.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
