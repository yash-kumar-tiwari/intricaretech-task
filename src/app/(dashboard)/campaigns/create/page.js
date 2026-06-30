"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { setWizardStep } from "@/features/campaign/campaignSlice";
import { CREATION_STEPS } from "@/features/campaign/constants/campaignSteps";
import { importMethods } from "@/features/campaign/constants/importMethods";
import Stepper from "@/components/ui/Stepper";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ImportMethodGrid from "@/features/campaign/components/CreateCampaign/ImportMethodGrid";
import LinkedInSearchForm from "@/features/campaign/components/CreateCampaign/LinkedInSearchForm";
import CsvUploadSection from "@/features/campaign/components/CreateCampaign/CsvUploadSection";
import LookalikeSection from "@/features/campaign/components/CreateCampaign/LookalikeSection";
import WebhookSection from "@/features/campaign/components/CreateCampaign/WebhookSection";

export default function CreateCampaignPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const campaignType = useSelector((s) => s.campaigns.campaignType);
  const csvUploaded = useSelector((s) => s.campaigns.csvUploaded);
  const mappingConfirmed = useSelector((s) => s.campaigns.mappingConfirmed);

  const [expanded, setExpanded] = useState(null);

  const completedMethods = useMemo(() => {
    const set = new Set();
    if (campaignType === "linkedin") set.add("linkedin");
    if (csvUploaded && mappingConfirmed) set.add("csv");
    if (campaignType === "leads") set.add("leads");
    if (campaignType === "webhook") set.add("webhook");
    return set;
  }, [campaignType, csvUploaded, mappingConfirmed]);

  const canProceed = campaignType !== null;

  const handleNext = () => {
    if (canProceed) {
      dispatch(setWizardStep(1));
      router.push("/campaigns/create/steps/sender");
    }
  };

  const renderAccordionContent = () => {
    if (!expanded) return null;
    switch (expanded) {
      case "linkedin":
        return <LinkedInSearchForm onComplete={() => setExpanded(null)} />;
      case "csv":
        return <CsvUploadSection onComplete={() => setExpanded(null)} />;
      case "leads":
        return <LookalikeSection onComplete={() => setExpanded(null)} />;
      case "webhook":
        return <WebhookSection onComplete={() => setExpanded(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <div className="mb-8">
        <Stepper steps={CREATION_STEPS} currentStep={0} size="sm" />
      </div>

      <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">
        Define Target Audience
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Choose how you want to import your audience
      </p>

      <ImportMethodGrid
        methods={importMethods}
        expandedId={expanded}
        completedMethods={completedMethods}
        onToggle={(id) => setExpanded((prev) => (prev === id ? null : id))}
      />

      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key={expanded}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Card padding="md" className="mb-6">
              {renderAccordionContent()}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <Button variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!canProceed} icon={ArrowRight}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
