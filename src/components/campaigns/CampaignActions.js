"use client";

import { Pause, Play, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateCampaign, deleteCampaign } from "@/features/campaign/campaignSlice";
import Dropdown from "@/components/ui/Dropdown";

export default function CampaignActions({ campaign }) {
  const dispatch = useDispatch();

  const items = [
    {
      label: campaign.status === "active" ? "Pause Campaign" : "Resume Campaign",
      icon: campaign.status === "active" ? Pause : Play,
      onClick: () =>
        dispatch(
          updateCampaign({
            ...campaign,
            status: campaign.status === "active" ? "inactive" : "active",
          })
        ),
    },
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => {},
    },
    {
      label: "Delete",
      icon: Trash2,
      danger: true,
      onClick: () => dispatch(deleteCampaign(campaign.id)),
    },
  ];

  return <Dropdown items={items} />;
}
