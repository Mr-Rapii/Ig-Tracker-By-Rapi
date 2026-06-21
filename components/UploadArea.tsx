"use client";

import { useCallback, useRef, useState } from "react";
import ResultsList, { PendingRequest } from "./ResultsList";

type Status = "idle" | "dragging" | "processing" | "done" | "error";

export default function UploadArea() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingRequest[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStatus("idle");
    setProgress(0);
    setError(null);
    setPending(null);
  };

  const processFile = useCallback((file: File) => {
    setError(null);

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setStatus("error");
      setError("File harus berformat .zip — coba unduh ulang data Instagram-mu.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setStatus("error");
      setError("Ukuran file melebihi 50MB.");
      return;
    }

    setStatus("processing");
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          setPending(data.pending);
          setStatus("done");
        } else {
          setStatus("error");
          setError(data.error || "Terjadi kesalahan saat memproses file.");
        }
      } catch {
        setStatus("error");
        setError("Respons server tidak terbaca. Coba lagi.");
      }
    };

    xhr.onerror = () => {
      setStatus("error");
      setError("Koneksi gagal. Periksa internetmu dan coba lagi.");
    };

    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setStatus("idle");
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div id="upload" className="mx-auto max-w-2xl scroll-mt-24">
      {status !== "done" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setStatus("dragging");
          }}
          onDragLeave={() => setStatus((s) => (s === "dragging" ? "idle" : s))}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors sm:p-14 ${
            status === "dragging"
              ? "border-amber bg-amber/5"
              : status === "error"
              ? "border-coral/60 bg-coral/5"
              : "border-lavender/30 bg-surface hover:border-lavender/60"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />

          {status === "processing" ? (
            <div>
              <p className="font-display text-xl italic text-ivory">
                Membaca data kamu…
              </p>
              <div className="mx-auto mt-5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-ivory/40">
                Diproses di server, tidak disimpan setelah selesai.
              </p>
            </div>
          ) : (
            <div>
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-amber"
                >
                  <path
                    d="M12 16V4M12 4L7 9M12 4L17 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-display text-xl italic text-ivory">
                Pilih file ZIP-mu
              </p>
              <p className="mt-2 text-sm text-ivory/50">
                Seret file ke sini, atau klik untuk memilih dari perangkatmu
              </p>
              <p className="mt-4 text-xs text-ivory/30">
                Maksimal 50MB · format .zip dari unduhan data Instagram
              </p>
            </div>
          )}
        </div>
      )}

      {status === "error" && error && (
        <p className="mt-4 rounded-lg border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          {error}
        </p>
      )}

      {status === "done" && pending && (
        <ResultsList pending={pending} onReset={reset} />
      )}
    </div>
  );
}
