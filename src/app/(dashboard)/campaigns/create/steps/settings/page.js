"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Stepper, Button } from "@/components/ui";
import { updateCampaignSettings, setWizardStep } from "@/features/campaign/campaignSlice";
import { SETTINGS_STEPS } from "@/features/campaign/constants/campaignSteps";
import { settingsSchema } from "@/features/campaign/schemas/settingsSchema";
import { defaultSendingWindow, defaultAiAssist, defaultZapierEvents } from "@/features/campaign/constants/settingsData";
import SendingWindowCard from "@/features/campaign/components/Settings/SendingWindowCard";
import AiAssistCard from "@/features/campaign/components/Settings/AiAssistCard";
import ZapierEventsCard from "@/features/campaign/components/Settings/ZapierEventsCard";
import Card from "@/components/ui/Card";

export default function SettingsStep() {
  const dispatch = useDispatch();
  const router = useRouter();
  const savedSettings = useSelector((s) => s.campaigns.campaignSettings);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: savedSettings?.campaignName
      ? savedSettings
      : {
          campaignName: "",
          sendingWindows: [defaultSendingWindow],
          aiAssist: defaultAiAssist,
          zapierEvents: defaultZapierEvents,
        },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "sendingWindows" });

  const addWindow = () => append({ days: ["Mon", "Tue", "Wed", "Thu", "Fri"], timeFrom: "09:00", timeTo: "17:00", timezone: "UTC" });

  const onSubmit = (data) => {
    dispatch(updateCampaignSettings(data));
    dispatch(setWizardStep(3));
    router.push("/campaigns/create/steps/stats");
  };

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      <Link
        href="/campaigns/create/steps/sender"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">
        Campaign Settings
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Configure your campaign details and schedule
      </p>

      <Stepper steps={SETTINGS_STEPS} currentStep={2} size="md" className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Campaign Name
            </h3>
            <input
              {...register("campaignName")}
              placeholder="Enter campaign name"
              className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
            />
            {errors.campaignName && (
              <span role="alert" className="text-xs text-[var(--color-danger)] mt-1 block">
                {errors.campaignName.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <SendingWindowCard
              fields={fields}
              append={append}
              remove={remove}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <AiAssistCard control={control} watch={watch} setValue={setValue} />
          </div>

          <ZapierEventsCard register={register} />
        </Card>

        <div className="flex items-center justify-between pt-4">
          <Link href="/campaigns/create/steps/sender">
            <Button variant="secondary" type="button">Previous</Button>
          </Link>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
