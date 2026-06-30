import * as Icons from "lucide-react";
import Card from "@/components/ui/Card";

export default function StatCard({ label, value, change, iconName, color = "#3666EE" }) {
  const IconComp = Icons[iconName];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#9692A4] font-medium">{label}</span>
        {IconComp && <IconComp size={16} style={{ color }} />}
      </div>
      <p className="text-xl font-bold text-[#5E5873]">{value}</p>
      {change && <span className="text-xs text-[#28C76F]">{change} vs last week</span>}
    </Card>
  );
}
