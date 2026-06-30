import { createSlice } from "@reduxjs/toolkit";
import {
  mockCampaigns,
  senderProfiles,
  defaultFieldMappings,
  dailyPerformance,
  engagementDistribution,
  growthTrend,
  selectedLookalikeDefaults,
  defaultCampaignSettings,
} from "./mockData";

const initialState = {
  /* ── Campaign listing ── */
  list: mockCampaigns,
  selectedCampaign: null,
  filters: {
    channel: "all",
    status: "all",
    search: "",
    sortBy: null,
    sortOrder: "asc",
  },

  /* ── Creation wizard ── */
  wizardStep: 1,
  campaignType: null,
  audienceSource: null,
  workflowType: null,

  /* ── CSV import ── */
  csvFile: null,
  csvUploaded: false,
  csvContactCount: 0,
  fieldMappings: { ...defaultFieldMappings },
  mappingConfirmed: false,

  /* ── Lookalike ── */
  lookalikeSearchQuery: "",
  selectedLookalike: selectedLookalikeDefaults,

  /* ── Sender ── */
  senderProfiles,
  selectedSenderProfile: senderProfiles[0],

  /* ── Campaign settings ── */
  campaignSettings: { ...defaultCampaignSettings },

  /* ── Stats ── */
  stats: {
    totalSent: 12540,
    openRate: 68.2,
    clickRate: 42.1,
    uniqueReach: 8450,
    dailyPerformance,
    engagement: engagementDistribution,
    growthTrend,
  },

  /* ── UI ── */
  loading: false,
  error: null,
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    /* ── Listing ── */
    setCampaigns(state, action) {
      state.list = action.payload;
    },
    addCampaign(state, action) {
      state.list.unshift(action.payload);
    },
    updateCampaign(state, action) {
      const idx = state.list.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteCampaign(state, action) {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    setSelectedCampaign(state, action) {
      state.selectedCampaign = action.payload;
    },
    clearSelectedCampaign(state) {
      state.selectedCampaign = null;
    },

    /* ── Filters ── */
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    setSearchQuery(state, action) {
      state.filters.search = action.payload;
    },
    setSort(state, action) {
      state.filters.sortBy = action.payload.key;
      state.filters.sortOrder = action.payload.order || "asc";
    },

    /* ── Wizard ── */
    setWizardStep(state, action) {
      state.wizardStep = action.payload;
    },
    nextWizardStep(state) {
      state.wizardStep += 1;
    },
    prevWizardStep(state) {
      if (state.wizardStep > 1) state.wizardStep -= 1;
    },
    resetWizard(state) {
      state.wizardStep = 1;
      state.campaignType = null;
      state.audienceSource = null;
      state.workflowType = null;
      state.csvFile = null;
      state.csvUploaded = false;
      state.csvContactCount = 0;
      state.fieldMappings = { ...defaultFieldMappings };
      state.mappingConfirmed = false;
      state.selectedLookalike = selectedLookalikeDefaults;
      state.campaignSettings = { ...defaultCampaignSettings };
    },

    /* ── Campaign type & audience ── */
    setCampaignType(state, action) {
      state.campaignType = action.payload;
    },
    setAudienceSource(state, action) {
      state.audienceSource = action.payload;
    },
    setWorkflowType(state, action) {
      state.workflowType = action.payload;
    },

    /* ── CSV ── */
    setCsvFile(state, action) {
      state.csvFile = action.payload;
      state.csvUploaded = false;
    },
    setCsvUploaded(state, action) {
      state.csvUploaded = action.payload;
    },
    setCsvContactCount(state, action) {
      state.csvContactCount = action.payload;
    },
    setFieldMappings(state, action) {
      state.fieldMappings = action.payload;
    },
    confirmMapping(state) {
      state.mappingConfirmed = true;
    },
    resetCsvImport(state) {
      state.csvFile = null;
      state.csvUploaded = false;
      state.csvContactCount = 0;
      state.fieldMappings = { ...defaultFieldMappings };
      state.mappingConfirmed = false;
    },

    /* ── Lookalike ── */
    setLookalikeSearchQuery(state, action) {
      state.lookalikeSearchQuery = action.payload;
    },
    addLookalike(state, action) {
      if (!state.selectedLookalike.find((l) => l.id === action.payload.id)) {
        state.selectedLookalike.push(action.payload);
      }
    },
    removeLookalike(state, action) {
      state.selectedLookalike = state.selectedLookalike.filter(
        (l) => l.id !== action.payload
      );
    },
    clearLookalike(state) {
      state.selectedLookalike = [];
    },

    /* ── Sender ── */
    setSelectedSenderProfile(state, action) {
      state.selectedSenderProfile = action.payload;
    },

    /* ── Campaign settings ── */
    updateCampaignSettings(state, action) {
      state.campaignSettings = { ...state.campaignSettings, ...action.payload };
    },
    resetCampaignSettings(state) {
      state.campaignSettings = { ...defaultCampaignSettings };
    },

    /* ── Stats ── */
    setStats(state, action) {
      state.stats = { ...state.stats, ...action.payload };
    },

    /* ── UI ── */
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  setSelectedCampaign,
  clearSelectedCampaign,

  setFilter,
  setStatusFilter,
  setSearchQuery,
  setSort,

  setWizardStep,
  nextWizardStep,
  prevWizardStep,
  resetWizard,

  setCampaignType,
  setAudienceSource,
  setWorkflowType,

  setCsvFile,
  setCsvUploaded,
  setCsvContactCount,
  setFieldMappings,
  confirmMapping,
  resetCsvImport,

  setLookalikeSearchQuery,
  addLookalike,
  removeLookalike,
  clearLookalike,

  setSelectedSenderProfile,

  updateCampaignSettings,
  resetCampaignSettings,

  setStats,

  setLoading,
  setError,
  clearError,
} = campaignSlice.actions;

export default campaignSlice.reducer;
