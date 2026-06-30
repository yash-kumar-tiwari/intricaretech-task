"use client";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle, X, AlertCircle } from "lucide-react";
import { setFieldMappings, confirmMapping } from "@/features/campaign/campaignSlice";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { csvFields, contactFields } from "@/features/campaign/mockData";

export default function MapPropertiesSection({ onComplete }) {
  const dispatch = useDispatch();
  const mappings = useSelector((s) => s.campaigns.fieldMappings);
  const mappingConfirmed = useSelector((s) => s.campaigns.mappingConfirmed);

  const mapped = Object.entries(mappings).filter(([, v]) => v);
  const unmapped = csvFields.filter((f) => !mappings[f]);
  const requiredFields = ["Full Name", "Company"];

  const setMapping = (csvField, contactField) => {
    const next = { ...mappings };
    for (const key of Object.keys(next)) {
      if (next[key] === contactField) next[key] = "";
    }
    next[csvField] = contactField;
    dispatch(setFieldMappings(next));
  };

  const removeMapping = (csvField) => {
    const next = { ...mappings, [csvField]: "" };
    dispatch(setFieldMappings(next));
  };

  const clearAll = () => {
    const clean = {};
    csvFields.forEach((f) => (clean[f] = ""));
    dispatch(setFieldMappings(clean));
  };

  const handleConfirm = () => {
    dispatch(confirmMapping());
    onComplete();
  };

  const canConfirm = requiredFields.every((f) => mappings[f]);

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Map Properties</h4>
        {mapped.length > 0 && (
          <button onClick={clearAll} className="text-xs text-[var(--color-danger)] hover:underline">
            Clear all mappings
          </button>
        )}
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Contact Fields
          </h5>
          {contactFields.map((f) => (
            <div key={f} className="rounded-md bg-[var(--color-surface-secondary)] px-3 py-2 text-xs text-[var(--color-text-primary)]">
              {f}
            </div>
          ))}
        </Card>

        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Mapped Fields ({mapped.length})
          </h5>
          {mapped.length === 0 ? (
            <p className="text-xs text-[var(--color-text-muted)] py-4 text-center">No mappings yet</p>
          ) : (
            mapped.map(([csv, contact]) => {
              const isRequired = requiredFields.includes(csv);
              return (
                <div
                  key={csv}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-xs ${
                    isRequired
                      ? "bg-[var(--color-success-light)] border border-[var(--color-success)]/20"
                      : "bg-[var(--color-primary-light)]"
                  }`}
                >
                  <span className="text-[var(--color-text-primary)] flex items-center gap-1.5">
                    {isRequired && <CheckCircle size={10} className="text-[var(--color-success)]" />}
                    {csv} → {contact}
                  </span>
                  <button onClick={() => removeMapping(csv)} className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)]">
                    <X size={12} />
                  </button>
                </div>
              );
            })
          )}
        </Card>

        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Unmapped Fields ({unmapped.length})
          </h5>
          {unmapped.length === 0 ? (
            <p className="text-xs text-[var(--color-success)] py-4 text-center">All fields mapped</p>
          ) : (
            unmapped.map((f) => {
              const isRequired = requiredFields.includes(f);
              return (
                <div
                  key={f}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-xs ${
                    isRequired
                      ? "bg-[var(--color-danger-light)] border border-[var(--color-danger)]/20"
                      : "bg-[var(--color-surface-secondary)]"
                  }`}
                >
                  <span className={`${
                    isRequired
                      ? "text-[var(--color-danger)] font-medium flex items-center gap-1"
                      : "text-[var(--color-text-primary)]"
                  }`}>
                    {isRequired && <AlertCircle size={10} />}
                    {f}{isRequired ? " (required)" : ""}
                  </span>
                  <select
                    value=""
                    onChange={(e) => e.target.value && setMapping(f, e.target.value)}
                    className="ml-2 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="">Map to...</option>
                    {contactFields.filter((c) => !Object.values(mappings).includes(c)).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              );
            })
          )}
        </Card>
      </div>

      <div className="lg:hidden space-y-3">
        {[
          mapped.length > 0 && {
            id: "mapped",
            label: "Mapped Fields",
            items: mapped,
            render: ([csv, contact]) => (
              <div key={csv} className="flex items-center justify-between rounded-md bg-[var(--color-primary-light)] px-3 py-2 text-xs">
                <span className="text-[var(--color-text-primary)]">{csv} → {contact}</span>
                <button onClick={() => removeMapping(csv)} className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)]">
                  <X size={12} />
                </button>
              </div>
            ),
          },
          unmapped.length > 0 && {
            id: "unmapped",
            label: "Unmapped Fields",
            items: unmapped,
            render: (f) => (
              <div key={f} className="flex items-center justify-between rounded-md bg-[var(--color-surface-secondary)] px-3 py-2 text-xs">
                <span className="text-[var(--color-text-primary)]">{f}</span>
                <select
                  value=""
                  onChange={(e) => e.target.value && setMapping(f, e.target.value)}
                  className="ml-2 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="">Map to...</option>
                  {contactFields.filter((c) => !Object.values(mappings).includes(c)).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            ),
          },
        ].filter(Boolean).map((section) => (
          <Card key={section.id} padding="sm" className="space-y-1.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              {section.label} ({section.items.length})
            </h5>
            {section.items.map(section.render)}
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className={`text-xs ${canConfirm ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}`}>
          {mapped.length} of {csvFields.length} fields mapped
          {requiredFields.filter((f) => !mappings[f]).length > 0 && (
            <span className="text-[var(--color-danger)] ml-1">
              · Required: {requiredFields.filter((f) => !mappings[f]).join(", ")}
            </span>
          )}
        </p>
        <Button size="sm" onClick={handleConfirm} disabled={!canConfirm || mappingConfirmed} icon={CheckCircle}>
          {mappingConfirmed ? "Confirmed" : "Confirm Mapping"}
        </Button>
      </div>
    </motion.div>
  );
}
