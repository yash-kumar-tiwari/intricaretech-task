"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Globe, Target } from "lucide-react";
import { setCampaignType, setAudienceSource } from "@/features/campaign/campaignSlice";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function WebhookSection({ onComplete }) {
  const dispatch = useDispatch();
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleConnect = () => {
    if (webhookUrl) {
      dispatch(setCampaignType("webhook"));
      dispatch(setAudienceSource("webhook"));
      onComplete();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card padding="sm" className="bg-[var(--color-surface-secondary)]">
        <div className="flex items-start gap-3">
          <Globe size={18} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Webhook Endpoint URL</p>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">
              Send POST requests to this URL to receive contact data in real-time.
            </p>
            <input
              type="url"
              placeholder="https://your-webhook-endpoint.com/data"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2 px-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button size="sm" onClick={handleConnect} disabled={!webhookUrl} icon={Target}>
                Connect Webhook
              </Button>
              <a href="#" className="text-xs text-[var(--color-primary)] hover:underline">View documentation</a>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
