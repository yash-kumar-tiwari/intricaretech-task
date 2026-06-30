"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { Stepper, Button, Badge, Checkbox, SearchInput, Tabs } from "@/components/ui";
import { senderProfiles } from "@/features/campaign/mockData";

const steps = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const tabs = [
  { value: "linkedin", label: "LinkedIn Profiles" },
  { value: "email", label: "Email Accounts", icon: Mail },
];

const enrichedData = senderProfiles.map((s, i) => ({
  ...s,
  healthScore: [92, 78, 65, 85, 43, 95, 54, 71][i % 8],
  dailyLimits: [300, 250, 180, 400, 120, 350, 100, 280][i % 8],
  accountType: ["linkedin", "email", "linkedin", "email", "linkedin", "email", "linkedin", "email"][i % 8],
  status: ["active", "active", "inactive", "active", "active", "active", "inactive", "active"][i % 8],
  accountTypeLabel: ["Sales Navigator", "Outreach", "Sales Navigator", "Outreach", "LinkedIn", "Outreach", "Sales Navigator", "Outreach"][i % 8],
}));

const ITEMS_PER_PAGE = 5;

function HealthScoreCircle({ score }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  const color =
    score > 70 ? "#28C76F" : score > 40 ? "#FF9F43" : "#EA5455";

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#EBE9F1" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="22"
        y="22"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="700"
        fill={color}
      >
        {score}
      </text>
    </svg>
  );
}

export default function SenderProfilesStep() {
  const [activeTab, setActiveTab] = useState("linkedin");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let list = enrichedData.filter((s) => {
      if (activeTab === "linkedin" && s.accountType === "email") return false;
      if (activeTab === "email" && s.accountType === "linkedin") return false;
      return true;
    });
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.accountTypeLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const allSelected = paginated.length > 0 && paginated.every((s) => selectedIds.has(s.id));
  const someSelected = paginated.some((s) => selectedIds.has(s.id)) && !allSelected;

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((s) => next.delete(s.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((s) => next.add(s.id));
        return next;
      });
    }
  }, [allSelected, paginated]);

  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <Link
        href="/campaigns/create"
        className="inline-flex items-center gap-1.5 text-sm text-[#9692A4] hover:text-[#3666EE] transition-colors mb-5"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <Stepper steps={steps} currentStep={1} size="md" className="mb-6" />

      <h1 className="text-[22px] font-semibold text-[#5E5873] mb-1">Sender Profiles</h1>
      <p className="text-sm text-[#9692A4] mb-6">
        Manage sender profiles for your campaign
      </p>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(v) => {
          setActiveTab(v);
          setCurrentPage(1);
        }}
        size="md"
        className="mb-5"
      />

      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder={`Search ${activeTab === "linkedin" ? "LinkedIn profiles" : "email accounts"}...`}
          size="md"
          className="max-w-xs"
        />
        <Button variant="secondary" icon={Plus} size="md">
          Add Account
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[5px] border border-[#EBE9F1]">
        <table className="w-full border-collapse" aria-label="Sender profiles">
          <thead>
            <tr className="border-b border-[#EBE9F1] bg-[#F8F8F8]">
              <th className="px-4 py-3.5 w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  size="sm"
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#5E5873] whitespace-nowrap">
                Name
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#5E5873] whitespace-nowrap">
                Health Score
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#5E5873] whitespace-nowrap">
                Daily Limits
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#5E5873] whitespace-nowrap">
                Account Type
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#5E5873] whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#9692A4]">
                  No sender profiles found
                </td>
              </tr>
            ) : (
              paginated.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-[#EBE9F1] transition-colors hover:bg-[#FAFAFA]"
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedIds.has(s.id)}
                      onChange={() => handleSelect(s.id)}
                      size="sm"
                      aria-label={`Select ${s.name}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white text-xs font-semibold shrink-0">
                        {s.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-[#5E5873] truncate">
                          {s.name}
                        </div>
                        <div className="text-xs text-[#9692A4] truncate">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <HealthScoreCircle score={s.healthScore} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#6E6B7B]">{s.dailyLimits}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#6E6B7B]">{s.accountTypeLabel}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={s.status === "active" ? "success" : "neutral"}
                      size="sm"
                      dot
                    >
                      {s.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-[#9692A4]">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center justify-center h-8 w-8 rounded text-sm text-[#6E6B7B] hover:bg-[#EBE9F1] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`flex items-center justify-center h-8 min-w-[32px] rounded text-sm font-medium transition-colors ${
                  p === currentPage
                    ? "bg-[#3666EE] text-white"
                    : "text-[#6E6B7B] hover:bg-[#EBE9F1]"
                }`}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center justify-center h-8 w-8 rounded text-sm text-[#6E6B7B] hover:bg-[#EBE9F1] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pb-8">
        <Link href="/campaigns/create">
          <Button variant="secondary">Previous</Button>
        </Link>
        <Link href="/campaigns/create/steps/settings">
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
}
