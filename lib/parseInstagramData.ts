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

export function extractUsernamesFromAny(json: any): PendingRequest[] {
  const out: PendingRequest[] = [];

  const pushEntry = (entry: any) => {
    if (!entry) return;
    if (Array.isArray(entry.label_values)) {
      let username: string | undefined;
      let fullName: string | undefined;
      for (const lv of entry.label_values) {
        const label = (lv.label || "").toLowerCase();
        if (!lv.value) continue;
        if (label.includes("nama pengguna") || label === "username") {
          username = lv.value;
        } else if (label === "nama" || label === "name") {
          fullName = lv.value;
        }
      }
      if (username) {
        out.push({
          username,
          fullName,
          timestamp: entry.timestamp,
        });
      }
      return;
    }
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
    const candidateKeys = [
      "relationships_follow_requests_sent",
      "relationships_follow_requests",
      "follow_requests_you_ve_sent",
      "follow_requests_sent",
    ];
    for (const key of candidateKeys) {
      if (Array.isArray(json[key])) arraysToScan.push(json[key]);
    }
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

export interface NotFollowingBackResult {
  notFollowingBack: PendingRequest[];
  followersCount: number;
  followingCount: number;
  warnings: string[];
}

export function parseFollowersFollowing(buffer: Buffer): NotFollowingBackResult {
  const warnings: string[] = [];
  let zip: AdmZip;

  try {
    zip = new AdmZip(buffer);
  } catch {
    throw new Error("File ZIP tidak valid atau rusak.");
  }

  const entries = zip.getEntries();

  const followerFiles = entries.filter((e) => {
    const lower = e.entryName.toLowerCase();
    return (
      lower.endsWith(".json") &&
      lower.includes("followers") &&
      !lower.includes("follow_request")
    );
  });

  const followingFiles = entries.filter((e) => {
    const lower = e.entryName.toLowerCase();
    return (
      lower.endsWith(".json") &&
      lower.includes("following") &&
      !lower.includes("follow_request")
    );
  });

  if (followerFiles.length === 0 || followingFiles.length === 0) {
    throw new Error(
      "Tidak ditemukan file followers/following di dalam ZIP. Pastikan kamu mengunduh data Instagram dalam format JSON dan menyertakan folder 'followers_and_following'."
    );
  }

  const followersSet = new Set<string>();
  for (const file of followerFiles) {
    try {
      const content = file.getData().toString("utf-8");
      const json = JSON.parse(content);
      for (const entry of extractUsernamesFromAny(json)) {
        followersSet.add(entry.username.toLowerCase());
      }
    } catch {
      warnings.push(`Gagal membaca ${file.entryName}`);
    }
  }

  const followingMap = new Map<string, PendingRequest>();
  for (const file of followingFiles) {
    try {
      const content = file.getData().toString("utf-8");
      const json = JSON.parse(content);
      for (const entry of extractUsernamesFromAny(json)) {
        followingMap.set(entry.username.toLowerCase(), entry);
      }
    } catch {
      warnings.push(`Gagal membaca ${file.entryName}`);
    }
  }

  const notFollowingBack = Array.from(followingMap.values())
    .filter((entry) => !followersSet.has(entry.username.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username));

  return {
    notFollowingBack,
    followersCount: followersSet.size,
    followingCount: followingMap.size,
    warnings,
  };
}
