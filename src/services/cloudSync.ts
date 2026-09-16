import { EnquiryLead } from "./enquiryStore";
import { DestinationCard } from "./cardStore";

export type CloudProvider = "googlesheet" | "supabase" | "firebase" | "webhook" | "custom";

export interface CloudSyncSettings {
  enabled: boolean;
  provider: CloudProvider;
  // Google Sheet Configuration (Published CSV or Google Apps Script URL)
  googleSheetUrl: string;
  // Supabase Configuration
  supabaseUrl: string;
  supabaseAnonKey: string;
  // Firebase Configuration
  firebaseUrl: string;
  // Custom Webhook or API Endpoint (e.g., Google Apps Script / Vercel API)
  webhookUrl: string;
  // Auto-polling interval in milliseconds (default 10,000ms = 10s)
  pollIntervalMs: number;
  soundAlerts: boolean;
  lastSyncTimestamp?: string;
  lastSyncStatus?: "success" | "error" | "idle";
  lastSyncMessage?: string;
}

const SETTINGS_KEY = "triponomic_cloud_sync_config_v1";
const SYNC_QUEUE_KEY = "triponomic_offline_queue_v1";

export const DEFAULT_CLOUD_SETTINGS: CloudSyncSettings = {
  enabled: true,
  provider: "googlesheet",
  googleSheetUrl: "",
  supabaseUrl: "",
  supabaseAnonKey: "",
  firebaseUrl: "",
  webhookUrl: "",
  pollIntervalMs: 10000,
  soundAlerts: true,
  lastSyncStatus: "idle",
  lastSyncMessage: "Initialized",
};

/**
 * Robust CSV string parser compliant with RFC 4180 (handles quoted values, commas, and newlines)
 */
export function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
      row.push(current.trim());
      if (row.some((cell) => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

/**
 * Intelligent Google Sheet parser that detects columns for Timestamp, Name, Phone, Destination, Email, Budget
 */
export function parseGoogleSheetData(rows: string[][]): EnquiryLead[] {
  if (rows.length <= 1) return [];

  const headers = rows[0].map((h) => (h || "").toLowerCase().trim());

  // Detect column indices based on header names
  let timeIdx = headers.findIndex((h) => h.includes("timestamp") || h.includes("date") || h.includes("time"));
  let nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("traveler") || h.includes("client"));
  let phoneIdx = headers.findIndex((h) => h.includes("phone") || h.includes("mobile") || h.includes("contact") || h.includes("number"));
  let destIdx = headers.findIndex((h) => h.includes("destination") || h.includes("route") || h.includes("trail") || h.includes("trip") || h.includes("details"));
  let emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("mail"));
  let budgetIdx = headers.findIndex((h) => h.includes("budget") || h.includes("quote") || h.includes("rate") || h.includes("investment"));

  // Fallbacks to default Google Form column ordering (A: Time, B: Name, C: Phone, D: Route/Dest, E: Email, F: Budget)
  if (timeIdx === -1) timeIdx = 0;
  if (nameIdx === -1) nameIdx = 1;
  if (phoneIdx === -1) phoneIdx = 2;
  if (destIdx === -1) destIdx = 3;
  if (emailIdx === -1) emailIdx = 4;
  if (budgetIdx === -1) budgetIdx = 5;

  const leads: EnquiryLead[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 2) continue;

    const rawTime = row[timeIdx] || "";
    const name = row[nameIdx] || "Guest Traveler";
    const phone = row[phoneIdx] || "";
    const rawDest = row[destIdx] || "Custom Trail";
    const email = row[emailIdx] || "";
    const budget = row[budgetIdx] || "";

    if (!phone && !name && !rawDest) continue;

    // Parse pipe-separated route details if formatted by InteractiveTrailBuilder
    let destination = rawDest;
    let departureHub = "";
    let duration = "";
    let travelers = "";
    let hotelTier = "";
    let notes = "";

    if (rawDest.includes("|")) {
      const parts = rawDest.split("|").map((p) => p.trim());
      destination = parts[0] || rawDest;
      for (let p = 1; p < parts.length; p++) {
        const part = parts[p];
        if (part.toLowerCase().includes("hub")) departureHub = part.replace(/hub/i, "").trim();
        else if (part.includes("Adult") || part.includes("Kid") || part.includes("Couple")) travelers = part;
        else if (part.endsWith("D") || part.toLowerCase().includes("days")) duration = part;
        else if (part.includes("★") || part.toLowerCase().includes("luxury") || part.toLowerCase().includes("boutique")) hotelTier = part;
        else if (part.toLowerCase().includes("notes:") || part.toLowerCase().includes("month:")) notes += (notes ? " | " : "") + part;
      }
    }

    // Stable ID for row deduplication
    const cleanPhone = (phone || name).replace(/[^a-zA-Z0-9]/g, "").slice(-6);
    const rowId = `gsheet-${i}-${cleanPhone}`;

    // Parse date safely
    let parsedDate = new Date().toISOString();
    if (rawTime) {
      const d = new Date(rawTime);
      if (!isNaN(d.getTime())) {
        parsedDate = d.toISOString();
      }
    }

    leads.push({
      id: rowId,
      name,
      fullName: name,
      phone,
      email: email.includes("@") ? email : undefined,
      destination,
      source: "Google Sheet / Form",
      departureHub: departureHub || undefined,
      duration: duration || undefined,
      travelers: travelers || undefined,
      hotelTier: hotelTier || undefined,
      budget: budget || undefined,
      notes: notes || undefined,
      date: parsedDate,
      createdAt: parsedDate,
      status: "New",
    });
  }

  // Newest submissions first
  return leads.reverse();
}

/**
 * Get current Cloud Sync configuration from localStorage
 */
export const getCloudSyncSettings = (): CloudSyncSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return DEFAULT_CLOUD_SETTINGS;
    }
    return { ...DEFAULT_CLOUD_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Failed to load cloud sync settings", err);
    return DEFAULT_CLOUD_SETTINGS;
  }
};

/**
 * Save updated Cloud Sync configuration
 */
export const saveCloudSyncSettings = (
  updates: Partial<CloudSyncSettings>
): CloudSyncSettings => {
  const current = getCloudSyncSettings();
  const merged = { ...current, ...updates };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    window.dispatchEvent(
      new CustomEvent("triponomic_cloud_settings_changed", { detail: merged })
    );
  } catch (err) {
    console.error("Failed to save cloud sync settings", err);
  }
  return merged;
};

// ==========================================
// PUSH / CREATE A SINGLE ENQUIRY TO CLOUD
// ==========================================
export const pushEnquiryToCloud = async (lead: EnquiryLead): Promise<boolean> => {
  const settings = getCloudSyncSettings();
  if (!settings.enabled) return false;

  let success = false;

  try {
    if (settings.provider === "supabase" && settings.supabaseUrl && settings.supabaseAnonKey) {
      const baseUrl = settings.supabaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/rest/v1/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: settings.supabaseAnonKey,
          Authorization: `Bearer ${settings.supabaseAnonKey}`,
          Prefer: "return=minimal,resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: lead.id,
          name: lead.name || lead.fullName,
          full_name: lead.fullName || lead.name,
          phone: lead.phone,
          email: lead.email || null,
          destination: lead.destination,
          source: lead.source || "Website",
          departure_hub: lead.departureHub || null,
          travelers: lead.travelers || null,
          duration: lead.duration || null,
          hotel_tier: lead.hotelTier || null,
          budget: lead.budget || null,
          status: lead.status || "New",
          notes: lead.notes || null,
          travel_category: lead.travelCategory || null,
          pace: lead.pace || null,
          stay_preference: lead.stayPreference || null,
          interests: lead.interests || [],
          remarks: lead.remarks || null,
          created_at: lead.createdAt || lead.date || new Date().toISOString(),
          raw_payload: lead,
        }),
      });
      success = res.ok;
    } else if (settings.provider === "firebase" && settings.firebaseUrl) {
      const baseUrl = settings.firebaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/enquiries/${lead.id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      success = res.ok;
    } else if (settings.webhookUrl) {
      const res = await fetch(settings.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_enquiry", data: lead }),
      });
      success = res.ok;
    }
  } catch (err) {
    console.warn("Cloud push failed, queuing lead for retry", err);
    queueOfflineEnquiry(lead);
    return false;
  }

  if (success) {
    saveCloudSyncSettings({
      lastSyncTimestamp: new Date().toISOString(),
      lastSyncStatus: "success",
      lastSyncMessage: `Enquiry #${lead.id.slice(-6)} synced to cloud`,
    });
  } else {
    queueOfflineEnquiry(lead);
  }

  return success;
};

// ==========================================
// FETCH ALL ENQUIRIES FROM CLOUD
// ==========================================
export const fetchEnquiriesFromCloud = async (): Promise<EnquiryLead[] | null> => {
  const settings = getCloudSyncSettings();
  if (!settings.enabled) return null;

  try {
    if (settings.provider === "supabase" && settings.supabaseUrl && settings.supabaseAnonKey) {
      const baseUrl = settings.supabaseUrl.replace(/\/+$/, "");
      const res = await fetch(
        `${baseUrl}/rest/v1/enquiries?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: settings.supabaseAnonKey,
            Authorization: `Bearer ${settings.supabaseAnonKey}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Supabase returned status ${res.status}`);
      const data = await res.json();

      return data.map((row: any) => ({
        id: row.id,
        name: row.name || row.full_name,
        fullName: row.full_name || row.name,
        phone: row.phone,
        email: row.email,
        destination: row.destination,
        source: row.source,
        departureHub: row.departure_hub,
        travelers: row.travelers,
        duration: row.duration,
        hotelTier: row.hotel_tier,
        budget: row.budget,
        status: row.status,
        notes: row.notes,
        travelCategory: row.travel_category,
        pace: row.pace,
        stayPreference: row.stay_preference,
        interests: row.interests || [],
        remarks: row.remarks,
        createdAt: row.created_at,
        date: row.created_at,
        ...(row.raw_payload || {}),
      }));
    } else if (settings.provider === "firebase" && settings.firebaseUrl) {
      const baseUrl = settings.firebaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/enquiries.json`);
      if (!res.ok) throw new Error(`Firebase returned status ${res.status}`);
      const data = await res.json();
      if (!data) return [];
      return Object.values(data) as EnquiryLead[];
    } else if (settings.provider === "googlesheet" && settings.googleSheetUrl) {
      let url = settings.googleSheetUrl.trim();

      // Automatically convert standard Google Sheet URL to CSV export format
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (
        match &&
        !url.includes("output=csv") &&
        !url.includes("export?format=csv") &&
        !url.includes("macros/s/")
      ) {
        const sheetId = match[1];
        const gidMatch = url.match(/gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : "0";
        url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Google Sheet returned HTTP ${res.status}`);

      const text = await res.text();

      // Handle JSON response if Google Apps Script
      if (text.trim().startsWith("[") || text.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            if (Array.isArray(parsed[0])) {
              return parseGoogleSheetData(parsed);
            }
            return parsed as EnquiryLead[];
          }
        } catch {
          // Fall through to CSV
        }
      }

      const rows = parseCSV(text);
      return parseGoogleSheetData(rows);
    } else if (settings.webhookUrl) {
      const res = await fetch(
        `${settings.webhookUrl}${settings.webhookUrl.includes("?") ? "&" : "?"}action=get_enquiries`
      );
      if (!res.ok) throw new Error(`Webhook returned status ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : data.enquiries || [];
    }
  } catch (err: any) {
    console.error("Failed to fetch enquiries from cloud", err);
    saveCloudSyncSettings({
      lastSyncStatus: "error",
      lastSyncMessage: err?.message || "Fetch failed",
    });
    return null;
  }

  return null;
};

// ==========================================
// UPDATE LEAD STATUS IN CLOUD
// ==========================================
export const updateEnquiryInCloud = async (
  id: string,
  updates: Partial<EnquiryLead>
): Promise<boolean> => {
  const settings = getCloudSyncSettings();
  if (!settings.enabled) return false;

  try {
    if (settings.provider === "supabase" && settings.supabaseUrl && settings.supabaseAnonKey) {
      const baseUrl = settings.supabaseUrl.replace(/\/+$/, "");
      const body: any = {};
      if (updates.status) body.status = updates.status;
      if (updates.notes !== undefined) body.notes = updates.notes;

      const res = await fetch(`${baseUrl}/rest/v1/enquiries?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: settings.supabaseAnonKey,
          Authorization: `Bearer ${settings.supabaseAnonKey}`,
        },
        body: JSON.stringify(body),
      });
      return res.ok;
    } else if (settings.provider === "firebase" && settings.firebaseUrl) {
      const baseUrl = settings.firebaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/enquiries/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      return res.ok;
    } else if (settings.webhookUrl) {
      const res = await fetch(settings.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_enquiry", id, updates }),
      });
      return res.ok;
    }
  } catch (err) {
    console.error("Cloud status update failed", err);
    return false;
  }
  return false;
};

// ==========================================
// DELETE LEAD FROM CLOUD
// ==========================================
export const deleteEnquiryFromCloud = async (id: string): Promise<boolean> => {
  const settings = getCloudSyncSettings();
  if (!settings.enabled) return false;

  try {
    if (settings.provider === "supabase" && settings.supabaseUrl && settings.supabaseAnonKey) {
      const baseUrl = settings.supabaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/rest/v1/enquiries?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: settings.supabaseAnonKey,
          Authorization: `Bearer ${settings.supabaseAnonKey}`,
        },
      });
      return res.ok;
    } else if (settings.provider === "firebase" && settings.firebaseUrl) {
      const baseUrl = settings.firebaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/enquiries/${id}.json`, {
        method: "DELETE",
      });
      return res.ok;
    } else if (settings.webhookUrl) {
      const res = await fetch(settings.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_enquiry", id }),
      });
      return res.ok;
    }
  } catch (err) {
    console.error("Cloud delete failed", err);
    return false;
  }
  return false;
};

// ==========================================
// TEST CLOUD CONNECTION
// ==========================================
export const testCloudConnection = async (
  configToTest?: Partial<CloudSyncSettings>
): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
  const settings = { ...getCloudSyncSettings(), ...configToTest };
  const start = performance.now();

  try {
    if (settings.provider === "googlesheet") {
      if (!settings.googleSheetUrl) {
        return { success: false, message: "Please paste your Google Sheet link or Apps Script Web App URL." };
      }
      let url = settings.googleSheetUrl.trim();
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (
        match &&
        !url.includes("output=csv") &&
        !url.includes("export?format=csv") &&
        !url.includes("macros/s/")
      ) {
        const sheetId = match[1];
        const gidMatch = url.match(/gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : "0";
        url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      }

      const res = await fetch(url);
      const latencyMs = Math.round(performance.now() - start);

      if (!res.ok) {
        return {
          success: false,
          message: `Could not access Google Sheet (HTTP ${res.status}). Make sure the sheet is shared ('Anyone with the link can view') or Published to Web.`,
          latencyMs,
        };
      }

      const text = await res.text();
      let rowCount = 0;
      if (text.trim().startsWith("[") || text.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) rowCount = parsed.length;
        } catch {}
      } else {
        const rows = parseCSV(text);
        rowCount = Math.max(0, rows.length - 1);
      }

      return {
        success: true,
        message: `Connected to Google Sheet successfully! Found ${rowCount} customer enquiry submissions (${latencyMs}ms).`,
        latencyMs,
      };
    } else if (settings.provider === "supabase") {
      if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
        return { success: false, message: "Please enter both Supabase URL and Anon Key." };
      }
      const baseUrl = settings.supabaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/rest/v1/enquiries?limit=1`, {
        headers: {
          apikey: settings.supabaseAnonKey,
          Authorization: `Bearer ${settings.supabaseAnonKey}`,
        },
      });
      const latencyMs = Math.round(performance.now() - start);

      if (res.status === 200 || res.status === 206) {
        return { success: true, message: `Connected to Supabase successfully (${latencyMs}ms)`, latencyMs };
      } else if (res.status === 404 || res.status === 400) {
        return {
          success: false,
          message: `Connected to Supabase, but the 'enquiries' table was not found. Click 'Copy SQL Schema' to create it.`,
          latencyMs,
        };
      } else {
        return { success: false, message: `Supabase error (HTTP ${res.status})`, latencyMs };
      }
    } else if (settings.provider === "firebase") {
      if (!settings.firebaseUrl) {
        return { success: false, message: "Please enter your Firebase Realtime Database URL." };
      }
      const baseUrl = settings.firebaseUrl.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/.json?shallow=true`);
      const latencyMs = Math.round(performance.now() - start);
      if (res.ok) {
        return { success: true, message: `Connected to Firebase successfully (${latencyMs}ms)`, latencyMs };
      }
      return { success: false, message: `Firebase error (HTTP ${res.status})`, latencyMs };
    } else if (settings.webhookUrl) {
      const res = await fetch(settings.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ping" }),
      });
      const latencyMs = Math.round(performance.now() - start);
      return {
        success: res.ok,
        message: res.ok ? `Webhook pinged successfully (${latencyMs}ms)` : `Webhook error (${res.status})`,
        latencyMs,
      };
    } else {
      return { success: false, message: "No cloud provider credentials configured yet." };
    }
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err?.message || "Network Error"}` };
  }
};

// ==========================================
// SYNC ALL LOCAL ENQUIRIES TO CLOUD
// ==========================================
export const pushAllEnquiriesToCloud = async (
  leads: EnquiryLead[]
): Promise<{ successCount: number; failCount: number }> => {
  let successCount = 0;
  let failCount = 0;

  for (const lead of leads) {
    const ok = await pushEnquiryToCloud(lead);
    if (ok) successCount++;
    else failCount++;
  }

  return { successCount, failCount };
};

// ==========================================
// OFFLINE QUEUE HELPERS
// ==========================================
function queueOfflineEnquiry(lead: EnquiryLead) {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    const queue: EnquiryLead[] = raw ? JSON.parse(raw) : [];
    if (!queue.some((item) => item.id === lead.id)) {
      queue.push(lead);
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (e) {
    console.error("Queue save failed", e);
  }
}

export const processOfflineQueue = async () => {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    if (!raw) return;
    const queue: EnquiryLead[] = JSON.parse(raw);
    if (!queue.length) return;

    const remaining: EnquiryLead[] = [];
    for (const lead of queue) {
      const ok = await pushEnquiryToCloud(lead);
      if (!ok) remaining.push(lead);
    }
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(remaining));
  } catch (e) {
    console.error("Offline queue processing error", e);
  }
};

// ==========================================
// SQL SCHEMA GENERATOR FOR SUPABASE
// ==========================================
export const SUPABASE_SQL_SCHEMA = `-- TRIPONOMIC ENQUIRIES TABLE
create table if not exists public.enquiries (
  id text primary key,
  name text,
  full_name text,
  phone text not null,
  email text,
  destination text not null,
  source text default 'Website',
  departure_hub text,
  travelers text,
  duration text,
  hotel_tier text,
  budget text,
  status text default 'New',
  notes text,
  travel_category text,
  pace text,
  stay_preference text,
  interests text[],
  remarks text,
  created_at timestamptz default timezone('utc'::text, now()),
  raw_payload jsonb
);

-- Enable Row Level Security (RLS) & allow anonymous read/insert/update
alter table public.enquiries enable row level security;

create policy "Allow anonymous insert" on public.enquiries
  for insert with check (true);

create policy "Allow anonymous read" on public.enquiries
  for select using (true);

create policy "Allow anonymous update" on public.enquiries
  for update using (true);

create policy "Allow anonymous delete" on public.enquiries
  for delete using (true);
`;
