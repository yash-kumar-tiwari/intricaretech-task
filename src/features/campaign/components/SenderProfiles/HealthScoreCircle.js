"use client";
export default function HealthScoreCircle({ score }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  const color = score > 70 ? "#28C76F" : score > 40 ? "#FF9F43" : "#EA5455";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--color-border)" strokeWidth="4" />
      <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 22 22)" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
}
