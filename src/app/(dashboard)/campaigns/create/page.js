"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Upload, Users, Webhook, ChevronDown, ChevronUp,
  ExternalLink, BookOpen, CheckCircle, AlertCircle, X, FileText,
  Download, Target, Globe, Linkedin, CheckSquare, HelpCircle,
  Plus, ArrowLeft, ArrowRight,
} from "lucide-react";
import {
  setCampaignType, setAudienceSource, setCsvFile, setCsvUploaded,
  setCsvContactCount, setFieldMappings, confirmMapping, resetCsvImport,
  addLookalike, removeLookalike,
  setWizardStep,
} from "@/features/campaign/campaignSlice";
import { lookalikeResults, defaultFieldMappings as defaultMappings } from "@/features/campaign/mockData";
import Stepper from "@/components/ui/Stepper";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

const CREATION_STEPS = [
  { id: "audience", label: "Define Target Audience" },
  { id: "sender", label: "Sender Profiles" },
  { id: "settings", label: "Settings" },
  { id: "stats", label: "Stats" },
];

const importMethods = [
  { id: "linkedin", label: "LinkedIn Search", description: "Search LinkedIn profiles based on specific criteria", icon: Search, color: "#3666EE" },
  { id: "csv", label: "Upload CSV", description: "Import contacts from a CSV or XLSX file", icon: Upload, color: "#28C76F" },
  { id: "leads", label: "Lookalike Audience", description: "Use existing lookalike audience lists", icon: Users, color: "#FF9F43" },
  { id: "webhook", label: "Inbound Webhook", description: "Receive data via webhook integration", icon: Webhook, color: "#5E5873" },
];

const linkedinSchema = z.object({
  searchUrl: z.string().min(1, "LinkedIn URL is required").url("Must be a valid URL").refine(
    (v) => v.includes("linkedin.com"), "Must be a LinkedIn URL"
  ),
});

const csvFields = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Location"];
const contactFields = ["Name", "Email", "Phone", "Company", "Job Title", "Location"];

/* ══════════════════════════════════════════
   LinkedIn Search Accordion
   ══════════════════════════════════════════ */
function LinkedInSearchForm({ onComplete }) {
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
          <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-primary)]">LinkedIn Search URL</label>
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

        {/* Helper card */}
        <Card padding="sm" className="bg-[var(--color-surface-secondary)] border-[var(--color-border)]">
          <div className="flex items-start gap-3">
            <HelpCircle size={16} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[var(--color-text-primary)] mb-1.5">Find your target audience with:</p>
              <div className="flex flex-wrap gap-2">
                {["LinkedIn Search", "Sales Navigator", "Post URL", "Group URL"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[10px] text-[var(--color-text-body)]">
                    <CheckSquare size={10} className="text-[var(--color-primary)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Button type="submit" disabled={!isValid} icon={Search}>Validate & Continue</Button>
      </form>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   CSV Upload Accordion
   ══════════════════════════════════════════ */
function CsvUploadSection({ onComplete }) {
  const dispatch = useDispatch();
  const csvFile = useSelector((s) => s.campaigns.csvFile);
  const csvUploaded = useSelector((s) => s.campaigns.csvUploaded);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted) => {
    const file = accepted[0];
    if (!file) return;
    dispatch(setCsvFile({ name: file.name, size: file.size, type: file.type }));
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploading(false);
        dispatch(setCsvUploaded(true));
        dispatch(setCsvContactCount(Math.floor(Math.random() * 500) + 100));
      }
      setUploadProgress(Math.min(progress, 100));
    }, 200);
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv", ".xlsx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  const removeFile = () => {
    dispatch(resetCsvImport());
    setUploadProgress(0);
    setUploading(false);
  };

  const handleSampleDownload = () => {
    const header = csvFields.join(",");
    const blob = new Blob([header + "\nJohn,Doe,john@example.com,..."], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sample.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {!csvUploaded && (
        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all ${
            isDragActive ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-light)] mb-3">
            <Upload size={20} className="text-[var(--color-primary)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {isDragActive ? "Drop your file here" : "Drag a file or click to browse"}
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">or click to browse</p>
          <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">File with up to 100 rows works best · CSV or XLSX</p>
        </div>
      )}

      <button onClick={handleSampleDownload} className="inline-flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:underline">
        <Download size={12} /> Download sample CSV file
      </button>

      {fileRejections.length > 0 && (
        <div className="rounded-md bg-[var(--color-danger-light)] border border-[var(--color-danger)]/20 p-3">
          {fileRejections.map(({ file, errors }) => (
            <p key={file.name} className="flex items-center gap-1.5 text-xs text-[var(--color-danger)]">
              <AlertCircle size={12} /> {file.name}: {errors.map((e) => e.message).join(", ")}
            </p>
          ))}
        </div>
      )}

      {uploading && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {csvUploaded && csvFile && (
        <div className="flex items-center justify-between rounded-lg border border-[var(--color-success)]/20 bg-[var(--color-success-light)] p-3">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-[var(--color-success)]" />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{csvFile.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{(csvFile.size / 1024).toFixed(1)} KB · Contacts found</p>
            </div>
          </div>
          <button onClick={removeFile} className="rounded p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-border)] transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {csvUploaded && <MapPropertiesSection onComplete={onComplete} />}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   Map Properties (3-panel)
   ══════════════════════════════════════════ */
function MapPropertiesSection({ onComplete }) {
  const dispatch = useDispatch();
  const mappings = useSelector((s) => s.campaigns.fieldMappings);
  const mappingConfirmed = useSelector((s) => s.campaigns.mappingConfirmed);

  const mapped = Object.entries(mappings).filter(([, v]) => v);
  const unmapped = csvFields.filter((f) => !mappings[f]);
  const requiredFields = ["Full Name", "Company"];
  const requiredMapped = requiredFields.filter((f) => mappings[f]);

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
          <button onClick={clearAll} className="text-xs text-[var(--color-danger)] hover:underline">Clear all mappings</button>
        )}
      </div>

      {/* Desktop: 3 panels */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Contact Fields</h5>
          {contactFields.map((f) => (
            <div key={f} className="rounded-md bg-[var(--color-surface-secondary)] px-3 py-2 text-xs text-[var(--color-text-primary)]">{f}</div>
          ))}
        </Card>

        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Mapped Fields ({mapped.length})</h5>
          {mapped.length === 0 ? (
            <p className="text-xs text-[var(--color-text-muted)] py-4 text-center">No mappings yet</p>
          ) : (
            mapped.map(([csv, contact]) => {
              const isRequired = requiredFields.includes(csv);
              return (
                <div key={csv} className={`flex items-center justify-between rounded-md px-3 py-2 text-xs ${isRequired ? "bg-[var(--color-success-light)] border border-[var(--color-success)]/20" : "bg-[var(--color-primary-light)]"}`}>
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
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Unmapped Fields ({unmapped.length})</h5>
          {unmapped.length === 0 ? (
            <p className="text-xs text-[var(--color-success)] py-4 text-center">All fields mapped</p>
          ) : (
            unmapped.map((f) => {
              const isRequired = requiredFields.includes(f);
              return (
                <div key={f} className={`flex items-center justify-between rounded-md px-3 py-2 text-xs ${isRequired ? "bg-[var(--color-danger-light)] border border-[var(--color-danger)]/20" : "bg-[var(--color-surface-secondary)]"}`}>
                  <span className={`${isRequired ? "text-[var(--color-danger)] font-medium flex items-center gap-1" : "text-[var(--color-text-primary)]"}`}>
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

      {/* Tablet stacked */}
      <div className="lg:hidden space-y-3">
        {[
          mapped.length > 0 && { id: "mapped", label: "Mapped Fields", items: mapped, render: ([csv, contact]) => (
            <div key={csv} className="flex items-center justify-between rounded-md bg-[var(--color-primary-light)] px-3 py-2 text-xs">
              <span className="text-[var(--color-text-primary)]">{csv} → {contact}</span>
              <button onClick={() => removeMapping(csv)} className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)]"><X size={12} /></button>
            </div>
          )},
          unmapped.length > 0 && { id: "unmapped", label: "Unmapped Fields", items: unmapped, render: (f) => (
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
          )}
        ].filter(Boolean).map((section) => (
          <Card key={section.id} padding="sm" className="space-y-1.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">{section.label} ({section.items.length})</h5>
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

/* ══════════════════════════════════════════
   Lookalike Section
   ══════════════════════════════════════════ */
function LookalikeSection({ onComplete }) {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.campaigns.selectedLookalike);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearch] = useState("");

  const filtered = lookalikeResults.filter(
    (r) => r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item) => {
    dispatch(addLookalike(item));
    setModalOpen(false);
    setSearch("");
  };

  const handleRemove = (id) => dispatch(removeLookalike(id));

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge key={item.id} variant="info" className="flex items-center gap-1.5 pr-1">
              {item.name}
              <button onClick={() => handleRemove(item.id)} className="ml-0.5 rounded-full p-0.5 hover:bg-white/20">
                <X size={10} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button size="sm" variant="secondary" icon={Users} onClick={() => setModalOpen(true)}>
          {selected.length > 0 ? "Add More" : "Select Audience List"}
        </Button>
        {selected.length > 0 && (
          <Button size="sm" onClick={() => { dispatch(setCampaignType("leads")); onComplete(); }} icon={CheckCircle}>
            Confirm Selection
          </Button>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Lookalike Audiences" size="lg" backdropBlur>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Select a lookalike list for this campaign</p>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search audiences..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs focus:border-[var(--color-primary)] transition-colors"
            autoFocus
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
              <Users size={32} className="text-[var(--color-primary)]" />
            </div>
            <p className="text-base font-semibold text-[var(--color-text-primary)] mb-1">You don&apos;t have any leads</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">Create a lead list to start running campaigns</p>
            <Button onClick={() => setModalOpen(false)}>Create a List</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pb-2">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelect(item)}
                className="flex items-start gap-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-all hover:border-[var(--color-primary)]/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <Users size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.description}</p>
                  <p className="text-[11px] text-[var(--color-success)] font-medium mt-1">{item.size.toLocaleString()}+ Users in the List</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
          {filtered.length > 0 && <Button size="sm" onClick={() => setModalOpen(false)}>Select List</Button>}
        </div>
      </Modal>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   Webhook Config Accordion
   ══════════════════════════════════════════ */
function WebhookSection({ onComplete }) {
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
            <p className="text-xs text-[var(--color-text-muted)] mb-3">Send POST requests to this URL to receive contact data in real-time.</p>
            <input
              type="url"
              placeholder="https://your-webhook-endpoint.com/data"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full rounded-[5px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-2 px-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-xs placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button size="sm" onClick={handleConnect} disabled={!webhookUrl} icon={Target}>Connect Webhook</Button>
              <a href="#" className="text-xs text-[var(--color-primary)] hover:underline">View documentation</a>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */
export default function CreateCampaignPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const campaignType = useSelector((s) => s.campaigns.campaignType);
  const csvUploaded = useSelector((s) => s.campaigns.csvUploaded);
  const mappingConfirmed = useSelector((s) => s.campaigns.mappingConfirmed);

  const [expanded, setExpanded] = useState(null);

  const isMethodComplete = (id) => {
    if (id === "linkedin") return campaignType === "linkedin";
    if (id === "csv") return csvUploaded && mappingConfirmed;
    if (id === "leads") return campaignType === "leads";
    if (id === "webhook") return campaignType === "webhook";
    return false;
  };

  const canProceed = campaignType !== null;

  const handleNext = () => {
    if (canProceed) {
      dispatch(setWizardStep(1));
      router.push("/campaigns/create/steps/sender");
    }
  };

  const toggleMethod = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="px-6" style={{ maxWidth: "1124px" }}>
      {/* Stepper */}
      <div className="mb-8">
        <Stepper steps={CREATION_STEPS} currentStep={0} size="sm" />
      </div>

      {/* Header */}
      <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">Define Target Audience</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">Choose how you want to import your audience</p>

      {/* ── Import Method Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {importMethods.map((method) => {
          const IconComp = method.icon;
          const isSelected = expanded === method.id;
          const isComplete = isMethodComplete(method.id);
          return (
            <motion.button
              key={method.id}
              type="button"
              onClick={() => toggleMethod(method.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                isComplete
                  ? "border-[var(--color-success)] bg-[var(--color-success-light)]"
                  : isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-[0_0_0_1px_var(--color-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:shadow-sm hover:bg-[var(--color-surface-secondary)]"
              }`}
            >
              {/* Check indicator */}
              {isComplete && (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-success)] text-white shadow-sm">
                  <CheckCircle size={12} />
                </div>
              )}

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                isComplete
                  ? "bg-[var(--color-success)] text-white"
                  : isSelected
                  ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white"
                  : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
              }`}>
                {isComplete ? <CheckCircle size={22} /> : <IconComp size={22} />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{method.label}</h3>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{method.description}</p>
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-medium ${
                isComplete ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"
              }`}>
                {isComplete ? (
                  <>Completed</>
                ) : (
                  <>{isSelected ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Select</>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Accordion Content ── */}
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
              {expanded === "linkedin" && <LinkedInSearchForm onComplete={() => setExpanded(null)} />}
              {expanded === "csv" && <CsvUploadSection onComplete={() => setExpanded(null)} />}
              {expanded === "leads" && <LookalikeSection onComplete={() => setExpanded(null)} />}
              {expanded === "webhook" && <WebhookSection onComplete={() => setExpanded(null)} />}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="secondary" onClick={() => router.back()}>Back</Button>
        <Button onClick={handleNext} disabled={!canProceed} icon={ArrowRight}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
