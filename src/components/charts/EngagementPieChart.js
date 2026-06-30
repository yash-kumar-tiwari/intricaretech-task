"use client";

import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card";

export default function EngagementPieChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
        <PieChartIcon size={16} className="text-[#3666EE]" /> Engagement Distribution
      </h3>
      <div className="flex items-center justify-center h-[250px]">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[#6E6B7B]">{entry.name}</span>
              <span className="font-medium text-[#5E5873]">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
