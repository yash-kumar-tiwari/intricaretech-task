import { createSelector } from "@reduxjs/toolkit";

/* ── Feature slice root ── */
const selectCampaigns = (state) => state.campaigns;

/* ── Campaign listing ── */
export const selectCampaignList = createSelector(
  selectCampaigns,
  (c) => c.list
);

export const selectSelectedCampaign = createSelector(
  selectCampaigns,
  (c) => c.selectedCampaign
);

export const selectCampaignById = (id) =>
  createSelector(selectCampaignList, (list) => list.find((c) => c.id === id));

export const selectActiveCampaigns = createSelector(selectCampaignList, (list) =>
  list.filter((c) => c.status === "active")
);

export const selectInactiveCampaigns = createSelector(
  selectCampaignList,
  (list) => list.filter((c) => c.status === "inactive")
);

export const selectFilteredCampaigns = createSelector(
  [selectCampaignList, (state) => state.campaigns.filters],
  (list, filters) => {
    let filtered = list;
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.crm && c.crm.toLowerCase().includes(q))
      );
    }
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[filters.sortBy];
        const bVal = b[filters.sortBy];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const cmp =
          typeof aVal === "number"
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal));
        return filters.sortOrder === "asc" ? cmp : -cmp;
      });
    }
    return filtered;
  }
);

/* ── Filters ── */
export const selectFilters = createSelector(selectCampaigns, (c) => c.filters);
export const selectStatusFilter = createSelector(
  selectFilters,
  (f) => f.status
);
export const selectSearchQuery = createSelector(
  selectFilters,
  (f) => f.search
);

/* ── Wizard ── */
export const selectWizardStep = createSelector(
  selectCampaigns,
  (c) => c.wizardStep
);
export const selectCampaignType = createSelector(
  selectCampaigns,
  (c) => c.campaignType
);
export const selectAudienceSource = createSelector(
  selectCampaigns,
  (c) => c.audienceSource
);
export const selectWorkflowType = createSelector(
  selectCampaigns,
  (c) => c.workflowType
);

/* ── CSV ── */
export const selectCsvFile = createSelector(selectCampaigns, (c) => c.csvFile);
export const selectCsvUploaded = createSelector(
  selectCampaigns,
  (c) => c.csvUploaded
);
export const selectCsvContactCount = createSelector(
  selectCampaigns,
  (c) => c.csvContactCount
);
export const selectFieldMappings = createSelector(
  selectCampaigns,
  (c) => c.fieldMappings
);
export const selectMappingConfirmed = createSelector(
  selectCampaigns,
  (c) => c.mappingConfirmed
);

/* ── Lookalike ── */
export const selectLookalikeSearchQuery = createSelector(
  selectCampaigns,
  (c) => c.lookalikeSearchQuery
);
export const selectSelectedLookalike = createSelector(
  selectCampaigns,
  (c) => c.selectedLookalike
);

/* ── Sender ── */
export const selectSenderProfiles = createSelector(
  selectCampaigns,
  (c) => c.senderProfiles
);
export const selectSelectedSenderProfile = createSelector(
  selectCampaigns,
  (c) => c.selectedSenderProfile
);

/* ── Settings ── */
export const selectCampaignSettings = createSelector(
  selectCampaigns,
  (c) => c.campaignSettings
);

/* ── Stats ── */
export const selectStats = createSelector(selectCampaigns, (c) => c.stats);
export const selectDailyPerformance = createSelector(
  selectStats,
  (s) => s.dailyPerformance
);
export const selectEngagement = createSelector(
  selectStats,
  (s) => s.engagement
);
export const selectGrowthTrend = createSelector(
  selectStats,
  (s) => s.growthTrend
);

/* ── UI ── */
export const selectCampaignLoading = createSelector(
  selectCampaigns,
  (c) => c.loading
);
export const selectError = createSelector(selectCampaigns, (c) => c.error);

/* ── Derived ── */
export const selectActiveCount = createSelector(
  selectCampaignList,
  (list) => list.filter((c) => c.status === "active").length
);
export const selectInactiveCount = createSelector(
  selectCampaignList,
  (list) => list.filter((c) => c.status === "inactive").length
);
export const selectTotalSentAll = createSelector(selectCampaignList, (list) =>
  list.reduce((sum, c) => sum + (c.invitesSent || 0), 0)
);
export const selectAverageReplyRate = createSelector(
  selectCampaignList,
  (list) => {
    const withData = list.filter((c) => c.replyRate != null);
    if (withData.length === 0) return 0;
    return (
      withData.reduce((sum, c) => sum + c.replyRate, 0) / withData.length
    );
  }
);

/* ── Wizard helpers ── */
export const selectWizardTotalSteps = createSelector(
  () => 4
);
export const selectCanProceedFromStep = createSelector(
  [selectWizardStep, selectWorkflowType, selectCampaignSettings],
  (step, workflow, settings) => {
    switch (step) {
      case 0: return !!workflow;
      case 2: return !!settings?.campaignName;
      default: return true;
    }
  }
);
