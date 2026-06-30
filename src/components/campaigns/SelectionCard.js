"use client";

import { Check } from "lucide-react";
import * as Icons from "lucide-react";
import Card from "@/components/ui/Card";

export default function SelectionCard({
  iconName,
  label,
  description,
  isSelected,
  onClick,
  children,
}) {
  const IconComp = Icons[iconName];

  return (
    <Card
      className={`relative cursor-pointer transition-all duration-200 p-5 ${
        isSelected
          ? "border-[#3666EE] ring-1 ring-[#3666EE]"
          : "hover:border-[#3666EE]/40"
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      aria-selected={isSelected}
    >
      {isSelected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] shadow-[0px_2px_4px_rgba(115,103,240,0.4)]">
          <Check size={12} className="text-white" />
        </div>
      )}
      <div className="flex items-center gap-3">
        {IconComp && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              isSelected
                ? "bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] text-white"
                : "bg-[#EAEFFF] text-[#3666EE]"
            }`}
          >
            <IconComp size={20} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-[#5E5873]">{label}</h3>
          {description && (
            <p className="text-xs text-[#9692A4] mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}
