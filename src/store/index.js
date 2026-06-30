import { configureStore } from "@reduxjs/toolkit";
import campaignsReducer from "@/features/campaign/campaignSlice";

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
  },
});
