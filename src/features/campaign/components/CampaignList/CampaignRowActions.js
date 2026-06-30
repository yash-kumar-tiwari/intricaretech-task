"use client";
import { useDispatch } from "react-redux";
import { Pause, Play, Pencil, Copy, Trash2 } from "lucide-react";
import { updateCampaign, deleteCampaign } from "@/features/campaign/campaignSlice";
import Dropdown from "@/components/ui/Dropdown";

export default function CampaignRowActions({ campaign, onUpdate, onDelete }) {
  const dispatch = useDispatch();

  const items = [
    {
      label:
        campaign.status === "active" ? "Pause Campaign" : "Resume Campaign",
      icon: campaign.status === "active" ? Pause : Play,
      onClick: () => {
        const updated = {
          ...campaign,
          status: campaign.status === "active" ? "inactive" : "active",
        };
        dispatch(updateCampaign(updated));
        onUpdate?.(updated);
      },
    },
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => {},
    },
    {
      label: "Duplicate",
      icon: Copy,
      onClick: () => {},
    },
    {
      label: "Delete",
      icon: Trash2,
      danger: true,
      onClick: () => {
        dispatch(deleteCampaign(campaign.id));
        onDelete?.(campaign.id);
      },
    },
  ];

  return <Dropdown items={items} />;
}
