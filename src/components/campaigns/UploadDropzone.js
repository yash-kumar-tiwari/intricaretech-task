"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, FileText, Check, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function UploadDropzone({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setUploaded(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      onUploadComplete?.(file);
    }, 2000);
  };

  const removeFile = () => {
    setFile(null);
    setUploaded(false);
  };

  return (
    <Card className="p-8">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
          isDragActive
            ? "border-[#3666EE] bg-[#EAEFFF]"
            : "border-[#D8D6DE] hover:border-[#3666EE]/50 bg-[#F8F8F8]"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAEFFF] mb-4">
          <UploadIcon size={24} className="text-[#3666EE]" />
        </div>
        <p className="text-sm font-medium text-[#5E5873]">
          {isDragActive ? "Drop your file here" : "Drag & drop your CSV file here"}
        </p>
        <p className="text-xs text-[#9692A4] mt-1">or click to browse files</p>
        <p className="text-[10px] text-[#9692A4] mt-3">Supports: .csv (max 10MB)</p>
      </div>

      {file && !uploaded && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#EBE9F1] bg-white p-3">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[#3666EE]" />
            <div>
              <p className="text-sm font-medium text-[#5E5873]">{file.name}</p>
              <p className="text-xs text-[#9692A4]">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <button onClick={removeFile} className="p-1 text-[#9692A4] hover:text-[#EA5455] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {uploaded && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#28C76F]/20 bg-[#28C76F]/5 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#28C76F]/10">
            <Check size={16} className="text-[#28C76F]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#28C76F]">File uploaded successfully!</p>
            <p className="text-xs text-[#9692A4]">{file?.name} &mdash; 245 contacts found</p>
          </div>
        </div>
      )}
    </Card>
  );
}
