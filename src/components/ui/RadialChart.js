"use client";

import { useEffect, useState } from "react";

export default function RadialChart({ value = 0, segments = [], size = 180, strokeWidth = 12, className = "" }) {
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
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size / 2 + 50} viewBox={`0 0 ${size} ${size / 2 + 40}`} className="overflow-visible">
        <defs>
          <linearGradient id="radialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8BA6FF" />
            <stop offset="100%" stopColor="#3762EE" />
          </linearGradient>
        </defs>

        <path
          d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`}
          fill="none"
          stroke="url(#radialGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />

        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fontSize="36"
          fontWeight="700"
          fill="var(--color-text-primary)"
        >
          {Math.round(pct)}%
        </text>
        <text
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-text-muted)"
        >
          Reply Rate
        </text>
      </svg>

      {segments.length > 0 && (
        <div className="flex items-center gap-5">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-xs text-[var(--color-text-body)]">{seg.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
