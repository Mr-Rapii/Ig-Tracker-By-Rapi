"use client";

import { useMemo, useState } from "react";

export interface PendingRequest {
  username: string;
  fullName?: string;
  timestamp?: number;
}

type SortKey = "username" | "date";

export default function ResultsList({
  pending,
  onReset,
  emptyTitle = "Tidak ada yang menunggu.",
  emptySubtitle = "Semua follow request kamu sudah direspons. Bersih.",
  countSuffix = "akun masih menunggu",
  csvFilename = "pending-follow-requests.csv",
}: {
  pending: PendingRequest[];
  onReset: () => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  countSuffix?: string;
  csvFilename?: string;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("username");

  const filtered = useMemo(() => {
    const list = pending.filter((p) =>
      p.username.toLowerCase().includes(query.toLowerCase())
    );
    return [...list].sort((a, b) => {
      if (sortKey === "username") return a.username.localeCompare(b.username);
      return (b.timestamp || 0) - (a.timestamp || 0);
    });
  }, [pending, query, sortKey]);

  const exportCSV = () => {
    const header = "username,full_name,timestamp\n";
    const rows = filtered
      .map(
        (p) =>
          `${p.username},${(p.fullName || "").replace(/,/g, " ")},${
            p.timestamp || ""
          }`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = csvFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (pending.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
        <p className="font-display text-xl italic text-ivory">
          {emptyTitle}
        </p>
        <p className="mt-2 text-sm text-ivory/50">
          {emptySubtitle}
        </p>
        <button
          onClick={onReset}
          className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-ivory/70 hover:text-ivory"
        >
          Coba file lain
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ivory/60">
          <span className="font-mono text-amber">{filtered.length}</span> dari{" "}
          {pending.length} {countSuffix}
        </p>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-ivory/70 transition hover:border-amber/50 hover:text-amber"
          >
            Export CSV
          </button>
          <button
            onClick={onReset}
            className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-ivory/70 transition hover:text-ivory"
          >
            File lain
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Cari username…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:border-amber/50"
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-sm text-ivory"
        >
          <option value="username">Urutkan: A–Z</option>
          <option value="date">Urutkan: Terbaru</option>
        </select>
      </div>

      <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-surface">
        {filtered.map((p) => (
          <li
            key={p.username}
            className="flex items-center justify-between gap-3 px-5 py-3.5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulseDot rounded-full bg-amber" />
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-ivory">
                  @{p.username}
                </p>
                {p.fullName && (
                  <p className="truncate text-xs text-ivory/40">
                    {p.fullName}
                  </p>
                )}
              </div>
            </div>
            <a
              href={`https://instagram.com/${p.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-lavender hover:text-amber"
            >
              Lihat profil →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
