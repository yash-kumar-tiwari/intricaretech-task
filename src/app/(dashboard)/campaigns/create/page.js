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
  Download, Target, Globe,
} from "lucide-react";
import {
  setCampaignType, setAudienceSource, setCsvFile, setCsvUploaded,
  setCsvContactCount, setFieldMappings, confirmMapping, resetCsvImport,
  addLookalike, removeLookalike, setLookalikeSearchQuery,
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

/* ── Import method cards config ── */
const importMethods = [
  { id: "linkedin", label: "LinkedIn Search", description: "Search LinkedIn profiles based on specific criteria", icon: Search, color: "#3666EE" },
  { id: "csv", label: "Upload CSV", description: "Import contacts from a CSV file", icon: Upload, color: "#28C76F" },
  { id: "leads", label: "Lookalike Audience", description: "Use existing lookalike audience lists", icon: Users, color: "#FF9F43" },
  { id: "webhook", label: "Inbound Webhook", description: "Receive data via webhook integration", icon: Webhook, color: "#5E5873" },
];

/* ── LinkedIn schema ── */
const linkedinSchema = z.object({
  searchUrl: z.string().min(1, "LinkedIn URL is required").url("Must be a valid URL").refine(
    (v) => v.includes("linkedin.com"), "Must be a LinkedIn URL"
  ),
});

/* ── CSV mapping schema ── */
const csvFields = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Location"];
const contactFields = ["Name", "Email", "Phone", "Company", "Job Title", "Location"];

/* ══════════════════════════════════════════
   SUB-COMPONENT: LinkedIn Search Accordion
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
          <label className="mb-1.5 block text-xs font-medium text-[#5E5873]">LinkedIn Search URL</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9692A4]" />
            <input
              {...register("searchUrl")}
              placeholder="https://www.linkedin.com/search/results/people/..."
              className="w-full rounded-[5px] border border-[#D8D6DE] bg-white py-2.5 pl-9 pr-3 text-sm text-[#444050] outline-none placeholder:text-xs placeholder:text-[#9692A4] focus:border-[#3666EE] transition-colors"
            />
          </div>
          {errors.searchUrl && (
            <p className="mt-1 flex items-center gap-1 text-xs text-[#EA5455]">
              <AlertCircle size={12} /> {errors.searchUrl.message}
            </p>
          )}
        </div>

        {/* Helper links */}
        <div className="flex flex-wrap gap-3">
          <a href="#" className="inline-flex items-center gap-1 text-xs text-[#3666EE] hover:underline">
            <ExternalLink size={12} /> How to get LinkedIn search URL
          </a>
          <a href="#" className="inline-flex items-center gap-1 text-xs text-[#3666EE] hover:underline">
            <BookOpen size={12} /> Search guide
          </a>
        </div>

        <Button type="submit" disabled={!isValid} icon={Search}>Validate & Continue</Button>
      </form>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   SUB-COMPONENT: CSV Upload Accordion
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
    accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".csv"] },
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
      {/* Dropzone */}
      {!csvUploaded && (
        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all ${
            isDragActive ? "border-[#3666EE] bg-[#F0F4FF]" : "border-[#D8D6DE] bg-white hover:border-[#3666EE]/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAEFFF] mb-3">
            <Upload size={20} className="text-[#3666EE]" />
          </div>
          <p className="text-sm font-medium text-[#5E5873]">
            {isDragActive ? "Drop your file here" : "Drag & drop your CSV file here"}
          </p>
          <p className="mt-1 text-xs text-[#9692A4]">or click to browse</p>
          <p className="mt-2 text-[10px] text-[#9692A4]">CSV only · Max 5MB</p>
        </div>
      )}

      {/* Sample file */}
      <button onClick={handleSampleDownload} className="inline-flex items-center gap-1.5 text-xs text-[#3666EE] hover:underline">
        <Download size={12} /> Download sample CSV file
      </button>

      {/* Rejection errors */}
      {fileRejections.length > 0 && (
        <div className="rounded-md bg-[#EA5455]/5 border border-[#EA5455]/20 p-3">
          {fileRejections.map(({ file, errors }) => (
            <p key={file.name} className="flex items-center gap-1.5 text-xs text-[#EA5455]">
              <AlertCircle size={12} /> {file.name}: {errors.map((e) => e.message).join(", ")}
            </p>
          ))}
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#9692A4]">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#EBE9F1] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#8BA6FF] to-[#3762EE] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Uploaded file */}
      {csvUploaded && csvFile && (
        <div className="flex items-center justify-between rounded-lg border border-[#28C76F]/20 bg-[#28C76F]/5 p-3">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-[#28C76F]" />
            <div>
              <p className="text-sm font-medium text-[#5E5873]">{csvFile.name}</p>
              <p className="text-xs text-[#9692A4]">{(csvFile.size / 1024).toFixed(1)} KB · Contacts found</p>
            </div>
          </div>
          <button onClick={removeFile} className="rounded p-1 text-[#9692A4] hover:bg-[#EBE9F1] transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Map Properties */}
      {csvUploaded && <MapPropertiesSection onComplete={onComplete} />}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   SUB-COMPONENT: Map Properties (3-panel)
   ══════════════════════════════════════════ */
function MapPropertiesSection({ onComplete }) {
  const dispatch = useDispatch();
  const mappings = useSelector((s) => s.campaigns.fieldMappings);
  const mappingConfirmed = useSelector((s) => s.campaigns.mappingConfirmed);

  const mapped = Object.entries(mappings).filter(([, v]) => v);
  const unmapped = csvFields.filter((f) => !mappings[f]);

  const setMapping = (csvField, contactField) => {
    const next = { ...mappings };
    // Remove any existing mapping for the contact field
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

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#5E5873]">Map Properties</h4>
        {mapped.length > 0 && (
          <button onClick={clearAll} className="text-xs text-[#EA5455] hover:underline">Clear all mappings</button>
        )}
      </div>

      {/* Desktop: 3 panels */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4">
        {/* Left: Contact Fields */}
        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#9692A4]">Contact Fields</h5>
          {contactFields.map((f) => (
            <div key={f} className="rounded-md bg-[#F8F8F8] px-3 py-2 text-xs text-[#5E5873]">{f}</div>
          ))}
        </Card>

        {/* Middle: Mapped */}
        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#9692A4]">Mapped Fields</h5>
          {mapped.length === 0 ? (
            <p className="text-xs text-[#9692A4] py-4 text-center">No mappings yet</p>
          ) : (
            mapped.map(([csv, contact]) => (
              <div key={csv} className="flex items-center justify-between rounded-md bg-[#F0F4FF] px-3 py-2 text-xs">
                <span className="text-[#5E5873]">{csv} → {contact}</span>
                <button onClick={() => removeMapping(csv)} className="text-[#9692A4] hover:text-[#EA5455]">
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </Card>

        {/* Right: Unmapped CSV fields */}
        <Card padding="sm" className="space-y-2">
          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#9692A4]">Unmapped Fields</h5>
          {unmapped.length === 0 ? (
            <p className="text-xs text-[#28C76F] py-4 text-center">All fields mapped</p>
          ) : (
            unmapped.map((f) => (
              <div key={f} className="flex items-center justify-between rounded-md bg-[#FFF7ED] px-3 py-2 text-xs">
                <span className="text-[#5E5873]">{f}</span>
                <select
                  value=""
                  onChange={(e) => e.target.value && setMapping(f, e.target.value)}
                  className="ml-2 rounded border border-[#D8D6DE] bg-white px-1.5 py-0.5 text-[10px] text-[#444050] outline-none focus:border-[#3666EE]"
                >
                  <option value="">Map to...</option>
                  {contactFields.filter((c) => !Object.values(mappings).includes(c)).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            ))
          )}
        </Card>
      </div>

      {/* Tablet: stacked panels */}
      <div className="lg:hidden space-y-3">
        {[mapped.length > 0 && { id: "mapped", label: "Mapped Fields", items: mapped, render: ([csv, contact]) => (
          <div key={csv} className="flex items-center justify-between rounded-md bg-[#F0F4FF] px-3 py-2 text-xs">
            <span className="text-[#5E5873]">{csv} → {contact}</span>
            <button onClick={() => removeMapping(csv)} className="text-[#9692A4] hover:text-[#EA5455]"><X size={12} /></button>
          </div>
        )},
        unmapped.length > 0 && { id: "unmapped", label: "Unmapped Fields", items: unmapped, render: (f) => (
          <div key={f} className="flex items-center justify-between rounded-md bg-[#FFF7ED] px-3 py-2 text-xs">
            <span className="text-[#5E5873]">{f}</span>
            <select
              value=""
              onChange={(e) => e.target.value && setMapping(f, e.target.value)}
              className="ml-2 rounded border border-[#D8D6DE] bg-white px-1.5 py-0.5 text-[10px] outline-none focus:border-[#3666EE]"
            >
              <option value="">Map to...</option>
              {contactFields.filter((c) => !Object.values(mappings).includes(c)).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}].filter(Boolean).map((section) => (
          <Card key={section.id} padding="sm" className="space-y-1.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#9692A4] mb-2">{section.label} ({section.items.length})</h5>
            {section.items.map(section.render)}
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#9692A4]">{mapped.length} of {csvFields.length} fields mapped</p>
        <Button size="sm" onClick={handleConfirm} disabled={mapped.length === 0} icon={CheckCircle}>
          Confirm Mapping
        </Button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   SUB-COMPONENT: Lookalike Modal + Section
   ══════════════════════════════════════════ */
function LookalikeSection({ onComplete }) {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.campaigns.selectedLookalike);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearch] = useState("");

  const filtered = lookalikeResults.filter(
    (r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()) && !selected.find((s) => s.id === r.id)
  );

  const handleSelect = (item) => {
    dispatch(addLookalike(item));
    setModalOpen(false);
    setSearch("");
  };

  const handleRemove = (id) => dispatch(removeLookalike(id));

  const handleCreateList = () => {
    // Placeholder for creating a new list
    setModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Selected lookalikes */}
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

      <div className="flex gap-3">
        <Button size="sm" variant="secondary" icon={Users} onClick={() => setModalOpen(true)}>
          {selected.length > 0 ? "Add More Audiences" : "Search Audiences"}
        </Button>
        {selected.length > 0 && (
          <Button size="sm" onClick={() => { dispatch(setCampaignType("leads")); onComplete(); }} icon={CheckCircle}>
            Confirm Selection
          </Button>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Search Lookalike Audience" size="md" backdropBlur>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9692A4]" />
          <input
            type="text"
            placeholder="Search audiences..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-[#D8D6DE] py-2.5 pl-9 pr-3 text-sm text-[#444050] outline-none placeholder:text-xs focus:border-[#3666EE] transition-colors"
            autoFocus
          />
        </div>
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <Users size={32} className="mx-auto text-[#EBE9F1] mb-2" />
              <p className="text-sm text-[#9692A4]">No audiences found</p>
              <button onClick={handleCreateList} className="mt-2 text-xs text-[#3666EE] hover:underline">
                Create a new lookalike list
              </button>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-[#F8F8F8] cursor-pointer transition-colors"
                onClick={() => handleSelect(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(item)}
              >
                <div>
                  <p className="text-sm font-medium text-[#5E5873]">{item.name}</p>
                  <p className="text-xs text-[#9692A4]">{item.description}</p>
                </div>
                <span className="text-xs text-[#9692A4]">{item.size.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#EBE9F1] pt-4">
          <Button variant="secondary" size="sm" onClick={handleCreateList}>Create New List</Button>
          <Button size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   SUB-COMPONENT: Webhook Config Accordion
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
      <Card padding="sm" className="bg-[#F8F8F8]">
        <div className="flex items-start gap-3">
          <Globe size={18} className="text-[#3666EE] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-[#5E5873] mb-1">Webhook Endpoint URL</p>
            <p className="text-xs text-[#9692A4] mb-3">Send POST requests to this URL to receive contact data in real-time.</p>
            <input
              type="url"
              placeholder="https://your-webhook-endpoint.com/data"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full rounded-[5px] border border-[#D8D6DE] bg-white py-2 px-3 text-sm text-[#444050] outline-none placeholder:text-xs placeholder:text-[#9692A4] focus:border-[#3666EE] transition-colors"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button size="sm" onClick={handleConnect} disabled={!webhookUrl} icon={Target}>Connect Webhook</Button>
              <a href="#" className="text-xs text-[#3666EE] hover:underline">View documentation</a>
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

  // Expanded accordion
  const [expanded, setExpanded] = useState(null);
  const [completedMethods, setCompletedMethods] = useState(new Set());

  const isMethodComplete = (id) => {
    if (id === "linkedin") return campaignType === "linkedin";
    if (id === "csv") return csvUploaded && mappingConfirmed;
    if (id === "leads") return campaignType === "leads";
    if (id === "webhook") return campaignType === "webhook";
    return false;
  };

  const canProceed = campaignType !== null;

  const handleMethodComplete = (id) => {
    setCompletedMethods((prev) => new Set([...prev, id]));
  };

  const handleNext = () => {
    if (canProceed) {
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
      <h1 className="text-[22px] font-semibold text-[#5E5873] mb-2">Define Target Audience</h1>
      <p className="text-sm text-[#9692A4] mb-6">Choose how you want to import your audience</p>

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
              className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3666EE] ${
                isComplete
                  ? "border-[#28C76F] bg-[#28C76F]/5"
                  : isSelected
                  ? "border-[#3666EE] bg-[#F0F4FF]"
                  : "border-[#EBE9F1] bg-white hover:border-[#3666EE]/40 hover:shadow-sm"
              }`}
            >
              {/* Selection indicator */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                isComplete
                  ? "bg-[#28C76F] text-white"
                  : isSelected
                  ? "bg-gradient-to-br from-[#8BA6FF] to-[#3762EE] text-white"
                  : "bg-[#EAEFFF] text-[#3666EE]"
              }`}>
                {isComplete ? <CheckCircle size={22} /> : <IconComp size={22} />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#5E5873]">{method.label}</h3>
                <p className="text-[10px] text-[#9692A4] mt-0.5">{method.description}</p>
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-medium ${
                isComplete ? "text-[#28C76F]" : "text-[#9692A4]"
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
              {expanded === "linkedin" && <LinkedInSearchForm onComplete={() => handleMethodComplete("linkedin")} />}
              {expanded === "csv" && <CsvUploadSection onComplete={() => handleMethodComplete("csv")} />}
              {expanded === "leads" && <LookalikeSection onComplete={() => handleMethodComplete("leads")} />}
              {expanded === "webhook" && <WebhookSection onComplete={() => handleMethodComplete("webhook")} />}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="secondary" onClick={() => router.back()}>Back</Button>
        <Button onClick={handleNext} disabled={!canProceed} icon={ChevronUp} className="rotate-90">
          Next Step
        </Button>
      </div>
    </div>
  );
}
