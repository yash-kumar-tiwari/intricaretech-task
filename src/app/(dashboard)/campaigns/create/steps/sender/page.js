"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ChevronLeft } from "lucide-react";
import { Stepper, Button, Tabs, SearchInput } from "@/components/ui";
import { setWizardStep, setSelectedLinkedinProfiles, setSelectedEmailAccounts } from "@/features/campaign/campaignSlice";
import { senderProfiles } from "@/features/campaign/mockData";
import { SENDER_STEPS } from "@/features/campaign/constants/campaignSteps";
import { SENDER_TABS, ITEMS_PER_PAGE, enrichSenderProfiles, filterSenderProfiles } from "@/features/campaign/constants/senderData";
import SenderTable from "@/features/campaign/components/SenderProfiles/SenderTable";
import SenderPagination from "@/features/campaign/components/SenderProfiles/SenderPagination";
import { paginateList } from "@/features/campaign/utils/senderUtils";

export default function SenderProfilesStep() {
  const dispatch = useDispatch();
  const router = useRouter();
  const savedLinkedin = useSelector((s) => s.campaigns.selectedLinkedinProfiles);
  const savedEmail = useSelector((s) => s.campaigns.selectedEmailAccounts);

  const [activeTab, setActiveTab] = useState("linkedin");
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedIds, setLocalSelectedIds] = useState(() => {
    const saved = activeTab === "linkedin" ? savedLinkedin : savedEmail;
    return new Set(saved.map((s) => s.id));
  });
  const [currentPage, setCurrentPage] = useState(1);

  const enriched = useMemo(() => enrichSenderProfiles(senderProfiles), []);
  const filtered = useMemo(
    () => filterSenderProfiles(enriched, activeTab, searchQuery),
    [enriched, activeTab, searchQuery]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(
    () => paginateList(filtered, currentPage, ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const allSelected = paginated.length > 0 && paginated.every((s) => localSelectedIds.has(s.id));
  const someSelected = paginated.some((s) => localSelectedIds.has(s.id)) && !allSelected;

  const handleSelectAll = useCallback(() => {
    setLocalSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) paginated.forEach((s) => next.delete(s.id));
      else paginated.forEach((s) => next.add(s.id));
      return next;
    });
  }, [allSelected, paginated]);

  const handleSelect = useCallback((id) => {
    setLocalSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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

  const handleTabChange = (v) => {
    setActiveTab(v);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleNext = () => {
    const selectedItems = enriched.filter((s) => localSelectedIds.has(s.id));
    if (activeTab === "linkedin") dispatch(setSelectedLinkedinProfiles(selectedItems));
    else dispatch(setSelectedEmailAccounts(selectedItems));
    dispatch(setWizardStep(2));
    router.push("/campaigns/create/steps/settings");
  };

  const canProceed = localSelectedIds.size > 0;
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <Link
        href="/campaigns/create"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <Stepper steps={SENDER_STEPS} currentStep={1} size="md" className="mb-6" />

      <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] mb-1">
        {activeTab === "linkedin" ? "LinkedIn Profile" : "Email Accounts"}
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {activeTab === "linkedin"
          ? "Select LinkedIn profiles to use as senders for this campaign"
          : "Select email accounts to use as senders for this campaign"}
      </p>

      <Tabs tabs={SENDER_TABS} activeTab={activeTab} onChange={handleTabChange} size="md" className="mb-5" />

      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder={`Search ${activeTab === "linkedin" ? "LinkedIn profiles" : "email accounts"}...`}
          size="md"
          className="max-w-xs"
        />
        <Button variant="secondary" icon={Plus} size="md">Add Account</Button>
      </div>

      <SenderTable
        profiles={paginated}
        selectedIds={localSelectedIds}
        onToggle={handleSelect}
        onToggleAll={handleSelectAll}
        allSelected={allSelected}
        someSelected={someSelected}
      />

      {totalPages > 1 && (
        <SenderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          start={start}
          end={end}
          total={filtered.length}
        />
      )}

      <div className="flex items-center justify-between mt-8 pb-8">
        <Link href="/campaigns/create">
          <Button variant="secondary">Previous</Button>
        </Link>
        <Button onClick={handleNext} disabled={!canProceed}>Next</Button>
      </div>
    </div>
  );
}
