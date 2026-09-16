import { useState, useEffect } from "react";
import {
  pushEnquiryToCloud,
  fetchEnquiriesFromCloud,
  updateEnquiryInCloud,
  deleteEnquiryFromCloud,
  getCloudSyncSettings,
  processOfflineQueue,
} from "./cloudSync";

export interface EnquiryLead {
  id: string;
  name: string;
  fullName?: string;
  phone: string;
  email?: string;
  destination: string;
  source: "Trail Builder" | "Postcard Card" | "Hero Search" | "Enquire Modal" | "Direct Enquiry" | string;
  departureHub?: string;
  travelers?: string;
  duration?: string;
  hotelTier?: string;
  budget?: string;
  date: string; // ISO string
  createdAt?: string; // ISO string
  status: "New" | "Contacted" | "In Progress" | "Converted" | "Cancelled";
  notes?: string;
  travelCategory?: string;
  pace?: string;
  stayPreference?: string;
  interests?: string[];
  remarks?: string;
}

const STORAGE_KEY = "triponomic_enquiries_v1";

const DEFAULT_ENQUIRIES: EnquiryLead[] = [
  {
    id: "enq-101",
    name: "Rohan Malhotra",
    fullName: "Rohan Malhotra",
    phone: "+91 98201 45892",
    email: "rohan.m@gmail.com",
    destination: "Kashmir (Domestic)",
    source: "Trail Builder",
    departureHub: "Mumbai",
    travelers: "2 Adults (Couple / Honeymoon)",
    duration: "7 Days",
    hotelTier: "5★ Iconic Luxury & Palaces",
    budget: "₹54,899 / person",
    date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: "New",
    notes: "Requested Dal Lake luxury houseboat + Gulmarg Gondola Phase 2 private guide.",
    travelCategory: "Honeymoon",
    pace: "Relaxed",
    stayPreference: "Heritage Palaces & Luxury Resorts",
    interests: ["Snow Activities", "Shikara Boat Rides", "Gourmet Kashmiri Wazwan"],
    remarks: "Would love a special flower decoration in houseboat for our anniversary.",
  },
  {
    id: "enq-102",
    name: "Ananya Deshmukh",
    fullName: "Ananya Deshmukh",
    phone: "+91 97412 88390",
    email: "ananya.d@outlook.com",
    destination: "Switzerland (International)",
    source: "Hero Search",
    departureHub: "Bengaluru",
    travelers: "4 Adults, 1 Child (Family Escape)",
    duration: "10 Days",
    hotelTier: "5★ Luxury",
    budget: "₹2,50,000 / person",
    date: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    status: "In Progress",
    notes: "Interested in Glacier Express first class panoramic train + Jungfraujoch excursion.",
    travelCategory: "Family Vacation",
    pace: "Balanced",
    stayPreference: "5★ Luxury Alpine Resorts",
    interests: ["Scenic Mountain Trains", "Chocolate Tasting", "Lake Cruises"],
    remarks: "Need kid-friendly hotels with interconnected family suites.",
  },
  {
    id: "enq-103",
    name: "Vikram Singhania",
    fullName: "Vikram Singhania",
    phone: "+91 99100 23419",
    email: "vikram.singh@corp.in",
    destination: "Leh Ladakh (Domestic)",
    source: "Postcard Card",
    departureHub: "Delhi NCR",
    travelers: "4 Adults (Squad Adventure)",
    duration: "6–8 Days",
    hotelTier: "4★ Handpicked Boutique",
    budget: "₹35,000 / person",
    date: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: "Contacted",
    notes: "Requires dedicated 4x4 SUV for Khardung La & Pangong Tso lake camp.",
    travelCategory: "Adventure & Squad",
    pace: "Fast & Adventurous",
    stayPreference: "Boutique Camps & Starlit Glamping",
    interests: ["High Mountain Passes", "Astrophotography", "Monastery Treks"],
    remarks: "Oxygen backup in vehicle is preferred.",
  },
  {
    id: "enq-104",
    name: "Meera & Siddharth Nair",
    fullName: "Meera & Siddharth Nair",
    phone: "+91 98450 71203",
    email: "siddharth.nair@tech.com",
    destination: "Bali (International)",
    source: "Trail Builder",
    departureHub: "Hyderabad",
    travelers: "2 Adults (Romantic / Honeymoon)",
    duration: "7 Days",
    hotelTier: "5★ Iconic Luxury",
    budget: "₹80,000 / person",
    date: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    status: "Converted",
    notes: "Booking confirmed! Tariffs locked for Ubud jungle private pool villa + Nusa Penida boat.",
    travelCategory: "Honeymoon",
    pace: "Relaxed & Romantic",
    stayPreference: "Private Pool Jungle Villas",
    interests: ["Floating Breakfast", "Nusa Penida Private Tour", "Balinese Spa"],
    remarks: "Vegetarian food arrangements needed during tours.",
  },
];

export const getEnquiries = (): EnquiryLead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENQUIRIES));
      return DEFAULT_ENQUIRIES;
    }
    const parsed = JSON.parse(raw) as EnquiryLead[];
    return parsed.map((e) => ({
      ...e,
      fullName: e.fullName || e.name || "Guest Traveler",
      name: e.name || e.fullName || "Guest Traveler",
      createdAt: e.createdAt || e.date || new Date().toISOString(),
      date: e.date || e.createdAt || new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Error reading enquiries from storage", err);
    return DEFAULT_ENQUIRIES;
  }
};

export const addEnquiry = (
  lead: Omit<EnquiryLead, "id" | "date" | "status"> & {
    id?: string;
    date?: string;
    createdAt?: string;
    status?: EnquiryLead["status"];
  }
): EnquiryLead => {
  const all = getEnquiries();
  const dateStr = lead.date || lead.createdAt || new Date().toISOString();
  const nameStr = lead.name || lead.fullName || "Guest Traveler";

  const newLead: EnquiryLead = {
    id: lead.id || `enq-${Date.now()}`,
    date: dateStr,
    createdAt: dateStr,
    status: lead.status || "New",
    ...lead,
    name: nameStr,
    fullName: nameStr,
  };

  const updated = [newLead, ...all];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error saving enquiry", err);
  }

  // Asynchronously dispatch to Cloud Database so Admin Portal on other PCs receive it
  pushEnquiryToCloud(newLead).catch((err) => {
    console.warn("Async cloud enquiry sync queued", err);
  });

  return newLead;
};

export const updateEnquiryStatus = (
  id: string,
  status: EnquiryLead["status"],
  notes?: string
): void => {
  const all = getEnquiries();
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        notes: notes !== undefined ? notes : item.notes,
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error updating enquiry", err);
  }

  // Update in cloud
  updateEnquiryInCloud(id, { status, notes }).catch((err) => {
    console.warn("Cloud status update failed", err);
  });
};

export const updateEnquiryNotes = (id: string, notes: string): void => {
  const all = getEnquiries();
  const updated = all.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        notes,
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error updating enquiry notes", err);
  }

  // Update in cloud
  updateEnquiryInCloud(id, { notes }).catch((err) => {
    console.warn("Cloud notes update failed", err);
  });
};

export const deleteEnquiry = (id: string): void => {
  const all = getEnquiries();
  const updated = all.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error deleting enquiry", err);
  }

  // Delete from cloud
  deleteEnquiryFromCloud(id).catch((err) => {
    console.warn("Cloud delete failed", err);
  });
};

export const clearAllEnquiries = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error clearing enquiries", err);
  }
};

export const resetEnquiriesToDefault = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENQUIRIES));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));
  } catch (err) {
    console.error("Error resetting enquiries", err);
  }
};

/**
 * Synchronize local enquiries store with remote Cloud Database
 */
export const syncWithCloud = async (): Promise<{ newCount: number }> => {
  try {
    processOfflineQueue();
    const cloudLeads = await fetchEnquiriesFromCloud();
    if (!cloudLeads || !cloudLeads.length) return { newCount: 0 };

    const localLeads = getEnquiries();
    const localMap = new Map<string, EnquiryLead>(localLeads.map((l) => [l.id, l]));

    let newCount = 0;
    const mergedList: EnquiryLead[] = [];

    // Combine cloud leads and local leads intelligently
    for (const cloudLead of cloudLeads) {
      if (!localMap.has(cloudLead.id)) {
        newCount++;
        mergedList.push(cloudLead);
      } else {
        const local = localMap.get(cloudLead.id)!;
        // Merge: keep latest status & notes
        mergedList.push({
          ...cloudLead,
          status: local.status || cloudLead.status,
          notes: local.notes !== undefined ? local.notes : cloudLead.notes,
        });
        localMap.delete(cloudLead.id);
      }
    }

    // Append any local-only leads that are not in cloud yet
    for (const remainingLocal of localMap.values()) {
      mergedList.push(remainingLocal);
    }

    // Sort newest first
    mergedList.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.date || 0).getTime();
      const timeB = new Date(b.createdAt || b.date || 0).getTime();
      return timeB - timeA;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList));
    window.dispatchEvent(new CustomEvent("triponomic_enquiries_updated"));

    if (newCount > 0) {
      window.dispatchEvent(
        new CustomEvent("triponomic_new_lead_received", {
          detail: { newCount, latest: cloudLeads[0] },
        })
      );
    }

    return { newCount };
  } catch (err) {
    console.error("Cloud sync error", err);
    return { newCount: 0 };
  }
};

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>(() => getEnquiries());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const performSync = async () => {
    setIsSyncing(true);
    try {
      await syncWithCloud();
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const handleUpdate = () => {
      setEnquiries(getEnquiries());
    };

    window.addEventListener("triponomic_enquiries_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // Initial background sync on mount
    performSync();

    // Auto-polling interval for real-time updates across multiple PCs
    const settings = getCloudSyncSettings();
    const intervalMs = settings.pollIntervalMs || 10000;

    let timer: any = null;
    if (settings.enabled) {
      timer = setInterval(() => {
        syncWithCloud();
      }, intervalMs);
    }

    // Listen for settings changes to update poll interval
    const handleSettingsChange = (e: any) => {
      if (timer) clearInterval(timer);
      const newSettings = e.detail;
      if (newSettings && newSettings.enabled) {
        timer = setInterval(() => {
          syncWithCloud();
        }, newSettings.pollIntervalMs || 10000);
      }
    };
    window.addEventListener("triponomic_cloud_settings_changed", handleSettingsChange);

    return () => {
      window.removeEventListener("triponomic_enquiries_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("triponomic_cloud_settings_changed", handleSettingsChange);
      if (timer) clearInterval(timer);
    };
  }, []);

  return {
    enquiries,
    isSyncing,
    syncNow: performSync,
    addEnquiry,
    updateEnquiryStatus,
    updateEnquiryNotes,
    deleteEnquiry,
    resetEnquiriesToDefault,
    clearAllEnquiries,
  };
};
