"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, Camera, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { SmileAnalysis } from "@/lib/claude";
import { useLang } from "@/components/LanguageProvider";

interface SmileUploaderProps {
  onResult: (analysis: SmileAnalysis, imageUrl: string, simulatedImageUrl: string | null) => void;
}

export default function SmileUploader({ onResult }: SmileUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, lang } = useLang();
  const u = t.uploader;

  const handleFile = useCallback((f: File) => {
    setError(null);
    const ok = f.type.startsWith("image/") || f.name.match(/\.(jpe?g|png|webp|heic|heif)$/i);
    if (!ok) {
      setError(u.errorType);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError(u.errorSize);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, [u]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file || !preview) return;
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("lang", lang);

      const res = await fetch("/api/simulate", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Analysis failed");

      onResult(data.analysis, preview, data.simulatedImageUrl ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
            ${dragOver ? "border-brand-blue bg-blue-50 scale-[1.02]" : "border-gray-300 bg-gray-50 hover:border-brand-blue hover:bg-blue-50"}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
          />
          <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Upload className="w-7 h-7 text-brand-blue" />
          </div>
          <p className="font-semibold text-gray-800 text-lg mb-1">{u.title}</p>
          <p className="text-gray-500 text-sm mb-4">{u.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm">
              <Upload className="w-3 h-3" /> {u.uploadFile}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm">
              <Camera className="w-3 h-3" /> {u.useCamera}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-5">{u.fileTypes}</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="relative">
            <Image
              src={preview}
              alt="Your uploaded smile"
              width={600}
              height={400}
              className="w-full object-cover max-h-64"
            />
            <button
              onClick={reset}
              className="absolute top-3 right-3 bg-white border border-gray-200 rounded-full p-1.5 shadow hover:bg-gray-50 transition"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <CheckCircle className="w-4 h-4 text-brand-mint" />
              <span className="font-medium">{file?.name}</span>
              <span className="text-gray-400">({(file!.size / 1024).toFixed(0)} KB)</span>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {u.analyzing}
                </>
              ) : (
                <>{u.analyzeBtn}</>
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 text-sm mb-2">{u.tipsTitle}</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {u.tips.map((tip) => (
            <li key={tip} className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-mint flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
