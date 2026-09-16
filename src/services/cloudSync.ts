import { EnquiryLead } from "./enquiryStore";
import { DestinationCard } from "./cardStore";

export type CloudProvider = "supabase" | "firebase" | "webhook" | "custom";

export interface CloudSyncSettings {
  enabled: boolean;
  provider: CloudProvider;
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
  provider: "supabase",
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
    if (settings.provider === "supabase") {
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
