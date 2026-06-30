"use client";

import { TrendingUp } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";

export default function GrowthTrendChart({ data }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-[#5E5873] mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-[#3666EE]" /> Growth Trend
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EBE9F1" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9692A4" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="growth" stroke="#3666EE" strokeWidth={2} dot={{ fill: "#3666EE", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
