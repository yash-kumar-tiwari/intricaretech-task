"use client";

import Card from "@/components/ui/Card";

const figmaColors = {
  Positive: "#7255DE",
  Neutral: "var(--color-warning)",
  Negative: "var(--color-danger)",
};

export default function ReplyAnalysisSection({ replyRate, replyBreakdown }) {
  return (
    <Card className="p-5 rounded-[6px] border-[var(--color-border)]">
      <h3 className="font-inter text-base font-semibold text-[var(--color-text-primary)]">
        Reply Analysis
      </h3>

      <div className="flex justify-center mt-5 mb-2">
        <svg width="210" height="130" viewBox="0 0 210 130">
          <defs>
            <linearGradient
              id="replyGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="-27.06%" stopColor="#8BA6FF" />
              <stop offset="83.4%" stopColor="#3762EE" />
            </linearGradient>
            <mask id="fillMask">
              <path
                d="M 12 115 A 93 93 0 0 1 198 115"
                fill="none"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="butt"
                strokeDasharray={`${(replyRate / 100) * Math.PI * 93} ${Math.PI * 93}`}
              />
            </mask>
          </defs>

          <path
            d="M 12 115 A 93 93 0 0 1 198 115"
            fill="none"
            strokeWidth="16"
            strokeLinecap="butt"
            strokeDasharray="3 5"
            style={{ stroke: "var(--color-gauge-track)" }}
          />

          <path
            d="M 12 115 A 93 93 0 0 1 198 115"
            fill="none"
            stroke="url(#replyGrad)"
            strokeWidth="16"
            strokeLinecap="butt"
            strokeDasharray="3 5"
            mask="url(#fillMask)"
          />

          <text
            x="105"
            y="95"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fontSize="26"
            style={{ fill: "var(--color-navbar-text)" }}
          >
            {replyRate}%
          </text>
          <text
            x="105"
            y="115"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="13"
            style={{ fill: "var(--color-text-primary)" }}
          >
            Reply Rate
          </text>
        </svg>
      </div>

      <div className="border-t border-[var(--color-border)] my-4" />

      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Status
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Result
          </span>
        </div>
        {replyBreakdown.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-[12px] h-[12px] rounded-full shrink-0"
                style={{
                  backgroundColor:
                    figmaColors[item.label] || item.color,
                }}
              />
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
