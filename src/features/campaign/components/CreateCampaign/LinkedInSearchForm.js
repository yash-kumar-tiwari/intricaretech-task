"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Search, AlertCircle, HelpCircle, CheckSquare } from "lucide-react";
import { linkedinSchema } from "@/features/campaign/schemas/linkedinSchema";
import { setCampaignType, setAudienceSource } from "@/features/campaign/campaignSlice";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function LinkedInSearchForm({ onComplete }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(linkedinSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(setCampaignType("linkedin"));
    dispatch(setAudienceSource("linkedin"));
    onComplete(data);
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-primary)]">
            LinkedIn Search URL
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              {...register("searchUrl")}
              placeholder="https://www.linkedin.com/search/results/people/..."
              className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
          {errors.searchUrl && (
            <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-danger)]">
              <AlertCircle size={12} /> {errors.searchUrl.message}
            </p>
          )}
        </div>

        <Card padding="sm" className="bg-[var(--color-surface-secondary)] border-[var(--color-border)]">
          <div className="flex items-start gap-3">
            <HelpCircle size={16} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[var(--color-text-primary)] mb-1.5">
                Find your target audience with:
              </p>
              <div className="flex flex-wrap gap-2">
                {["LinkedIn Search", "Sales Navigator", "Post URL", "Group URL"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[10px] text-[var(--color-text-body)]"
                  >
                    <CheckSquare size={10} className="text-[var(--color-primary)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Button type="submit" disabled={!isValid} icon={Search}>
          Validate &amp; Continue
        </Button>
      </form>
    </motion.div>
  );
}
