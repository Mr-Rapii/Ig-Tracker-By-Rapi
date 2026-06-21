import AdmZip from "adm-zip";

export interface PendingRequest {
  username: string;
  fullName?: string;
  timestamp?: number;
}

export interface ParseResult {
  pending: PendingRequest[];
  warnings: string[];
}

/**
 * Instagram data exports change shape between "JSON" and "HTML" download
 * formats, and the JSON keys differ slightly by export version. We try a
 * few known shapes and fall back to a generic scanner for any file whose
 * path contains "follow_request".
 */
function extractUsernamesFromAny(json: any): PendingRequest[] {
  const out: PendingRequest[] = [];

  const pushEntry = (entry: any) => {
    if (!entry) return;
    // Common shape: { string_list_data: [{ href, value, timestamp }], title? }
    if (Array.isArray(entry.string_list_data)) {
      for (const item of entry.string_list_data) {
        const usernameGuess =
          item.value ||
          (item.href ? item.href.split("/").filter(Boolean).pop() : undefined);
        if (usernameGuess) {
          out.push({
            username: usernameGuess,
            fullName: entry.title || undefined,
            timestamp: item.timestamp,
          });
        }
      }
      return;
    }
    // Flat shape: { username, full_name, timestamp }
    if (entry.username) {
      out.push({
        username: entry.username,
        fullName: entry.full_name,
        timestamp: entry.timestamp,
      });
    }
  };

  const arraysToScan: any[] = [];

  if (Array.isArray(json)) {
    arraysToScan.push(json);
  } else if (json && typeof json === "object") {
    // Known top-level keys across IG export versions
    const candidateKeys = [
      "relationships_follow_requests_sent",
      "relationships_follow_requests",
      "follow_requests_you_ve_sent",
      "follow_requests_sent",
    ];
    for (const key of candidateKeys) {
      if (Array.isArray(json[key])) arraysToScan.push(json[key]);
    }
    // Fallback: scan all array-valued properties at top level
    if (arraysToScan.length === 0) {
      for (const val of Object.values(json)) {
        if (Array.isArray(val)) arraysToScan.push(val);
      }
    }
  }

  for (const arr of arraysToScan) {
    for (const entry of arr) pushEntry(entry);
  }

  return out;
}

export function parseInstagramZip(buffer: Buffer): ParseResult {
  const warnings: string[] = [];
  let zip: AdmZip;

  try {
    zip = new AdmZip(buffer);
  } catch {
    throw new Error("File ZIP tidak valid atau rusak.");
  }

  const entries = zip.getEntries();

  // Look for any JSON file whose path suggests follow requests
  const candidates = entries.filter((e) => {
    const lower = e.entryName.toLowerCase();
    return (
      lower.endsWith(".json") &&
      (lower.includes("follow_request") ||
        lower.includes("follow_requests_sent") ||
        lower.includes("pending"))
    );
  });

  if (candidates.length === 0) {
    throw new Error(
      "Tidak ditemukan file follow_requests di dalam ZIP. Pastikan kamu mengunduh data Instagram dalam format JSON dan menyertakan folder 'followers_and_following'."
    );
  }

  const pendingMap = new Map<string, PendingRequest>();

  for (const entry of candidates) {
    try {
      const content = entry.getData().toString("utf-8");
      const json = JSON.parse(content);
      const results = extractUsernamesFromAny(json);
      for (const r of results) {
        pendingMap.set(r.username.toLowerCase(), r);
      }
    } catch (err) {
      warnings.push(`Gagal membaca ${entry.entryName}`);
    }
  }

  const pending = Array.from(pendingMap.values()).sort((a, b) =>
    a.username.localeCompare(b.username)
  );

  return { pending, warnings };
}
