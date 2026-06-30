"use client";

import { BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";

export default function DailyPerformanceChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
        <BarChart3 size={16} className="text-[#3666EE]" /> Daily Performance
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EBE9F1" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="sent" fill="#3666EE" radius={[4, 4, 0, 0]} />
          <Bar dataKey="opened" fill="#8BA6FF" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clicked" fill="#28C76F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
