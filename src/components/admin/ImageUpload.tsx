"use client";

import * as React from "react";
import Image from "next/image";
import { 
  UploadCloud, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Image as ImageIcon,
  Link as LinkIcon,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  description = "PNG, JPG, WebP, or GIF up to 8MB. Automatically compressed and optimized.",
  required = false,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [showUrlInput, setShowUrlInput] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    // Validate client-side
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP, or GIF).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("File size exceeds 8MB limit.");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image.");
      }

      onChange(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // reset input so user can re-select same file if desired
    if (e.target) e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 block text-xs">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-brand-700 hover:underline inline-flex items-center gap-1"
        >
          <LinkIcon className="size-3" />
          <span>{showUrlInput ? "Use File Upload" : "Paste external URL"}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="https://... or /images/..."
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-line p-2.5 text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-700 font-mono"
          />
          <p className="text-[11px] text-slate-500">{description}</p>
        </div>
      ) : value ? (
        /* Image Preview Box */
        <div className="relative rounded-xl border border-line bg-slate-50 p-3">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative aspect-video w-full sm:w-44 shrink-0 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
              <Image
                src={value}
                alt="Uploaded preview"
                fill
                sizes="(max-width: 640px) 100vw, 176px"
                className="object-cover"
                unoptimized={value.startsWith("http")}
              />
            </div>

            <div className="flex-1 min-w-0 w-full space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span className="truncate">Image Ready</span>
              </div>
              <p className="font-mono text-[11px] text-slate-600 truncate bg-white px-2 py-1 rounded border border-line">
                {value}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-1"
                >
                  <RefreshCw className="size-3" />
                  <span>Replace Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 hover:bg-red-100 transition-colors inline-flex items-center gap-1"
                >
                  <X className="size-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all",
            isDragging
              ? "border-brand-700 bg-brand-50/50"
              : "border-slate-300 hover:border-brand-500 bg-slate-50/60 hover:bg-slate-50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="size-7 text-brand-700 animate-spin" />
              <p className="text-xs font-bold text-ink">Optimizing &amp; Uploading...</p>
              <p className="text-[11px] text-slate-500">Processing high-resolution image</p>
            </div>
          ) : (
            <>
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:scale-110 transition-transform mb-2">
                <UploadCloud className="size-5" />
              </div>
              <p className="text-xs font-bold text-ink">
                Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500 max-w-xs">
                {description}
              </p>
            </>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-red-600 text-[11px] font-medium mt-1.5">
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
