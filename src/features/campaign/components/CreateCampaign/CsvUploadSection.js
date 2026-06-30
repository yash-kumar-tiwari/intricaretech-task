"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, FileText, X, Download, AlertCircle } from "lucide-react";
import {
  setCsvFile,
  setCsvUploaded,
  setCsvContactCount,
  resetCsvImport,
} from "@/features/campaign/campaignSlice";
import MapPropertiesSection from "./MapPropertiesSection";

const csvFields = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Location"];

export default function CsvUploadSection({ onComplete }) {
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
            isDragActive
              ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
              : "border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40"
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
