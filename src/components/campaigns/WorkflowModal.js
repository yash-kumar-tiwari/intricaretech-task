"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Zap, Sliders, Check, Sparkles } from "lucide-react";
import { setWorkflowType } from "@/features/campaign/campaignSlice";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const workflowTypes = [
  {
    id: "standard",
    label: "Standard Workflow",
    description: "Use predefined templates with basic automation rules for quick campaign setup.",
    icon: Zap,
    features: ["Basic automation rules", "Predefined templates", "Simple triggers"],
  },
  {
    id: "advanced",
    label: "Advanced Workflow",
    description: "Full control over automation with custom conditions, multi-step sequences, and API integrations.",
    icon: Sliders,
    recommended: true,
    features: ["Custom conditions & branches", "Multi-step sequences", "API & webhook integrations", "A/B testing"],
  },
];

function WorkflowCard({ type, isSelected, onSelect }) {
  const IconComp = type.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(type.id)}
      className={`relative flex w-full flex-col rounded-xl border-2 p-5 text-left transition-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${
        isSelected
          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-[0_0_0_1px_var(--color-primary)] -translate-y-0.5"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={isSelected}
    >
      {/* Recommended badge */}
      {type.recommended && (
        <div className="absolute -top-2.5 right-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] px-3 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          <Sparkles size={10} />
          Recommended
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-br from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] text-white shadow-md"
              : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
          }`}
        >
          <IconComp size={22} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{type.label}</h3>
            {/* Radio circle */}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isSelected
                  ? "border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]"
                  : "border-[var(--color-border-strong)]"
              }`}
            >
              {isSelected && <Check size={11} className="text-white" />}
            </div>
          </div>

          <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">{type.description}</p>

          {/* Features */}
          <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {type.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[var(--color-text-body)]">
                <div
                  className={`h-1.5 w-1.5 rounded-full shrink-0 bg-[var(--color-primary)]`}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.button>
  );
}

export default function WorkflowModal({ isOpen, onClose, onConfirm }) {
  const dispatch = useDispatch();
  const currentWorkflow = useSelector((s) => s.campaigns.workflowType);
  const [selected, setSelected] = useState(currentWorkflow || "");

  useEffect(() => {
    if (isOpen) setSelected(currentWorkflow || "");
  }, [isOpen, currentWorkflow]);

  const handleConfirm = () => {
    if (selected) {
      dispatch(setWorkflowType(selected));
      onConfirm?.();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Workflow Mode"
      size="lg"
      backdropBlur
    >
      <div className="flex flex-col gap-4">
        {workflowTypes.map((type) => (
          <WorkflowCard
            key={type.id}
            type={type}
            isSelected={selected === type.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-5">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={!selected}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
