import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  useEnquiries,
  EnquiryLead,
  updateEnquiryStatus,
  updateEnquiryNotes,
  deleteEnquiry,
  resetEnquiriesToDefault,
  clearAllEnquiries,
} from "@/services/enquiryStore";
import {
  useDestinationCards,
  DestinationCard,
  saveDestinationCard,
  deleteDestinationCard,
  resetCardsToDefault,
} from "@/services/cardStore";
import { CardEditModal } from "@/components/admin/CardEditModal";
import { AdminLogin } from "@/components/admin/AdminLogin";
import {
  isAdminAuthenticated,
  adminSignOut,
  updateAdminPassword,
  resetAdminCredentialsToDefault,
} from "@/services/adminAuth";
import {
  Inbox,
  MapPin,
  Globe2,
  Settings,
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Filter,
  Eye,
  X,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  LogOut,
  Lock,
  KeyRound,
  Sun,
  Moon,
  Database,
  Wifi,
  WifiOff,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Bell,
  RefreshCw,
} from "lucide-react";
import {
  getCloudSyncSettings,
  saveCloudSyncSettings,
  testCloudConnection,
  pushAllEnquiriesToCloud,
  SUPABASE_SQL_SCHEMA,
  CloudSyncSettings,
} from "@/services/cloudSync";

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());

  // Theme state with localStorage persistence (dark / light)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("triponomic_admin_theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("triponomic_admin_theme", next);
      return next;
    });
  };

  // Cloud Sync state & settings
  const [cloudSettings, setCloudSettings] = useState<CloudSyncSettings>(() => getCloudSyncSettings());
  const [isTestingCloud, setIsTestingCloud] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [isPushingAll, setIsPushingAll] = useState(false);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [schemaCopied, setSchemaCopied] = useState(false);
  const [newLeadAlert, setNewLeadAlert] = useState<{ name: string; destination: string; count: number } | null>(null);

  // Audio chime helper using Web Audio API (cross-browser, zero external audio asset required)
  const playLeadNotificationChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880.0, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignored if browser policy blocks autoplay before interaction
    }
  };

  useEffect(() => {
    const handleNewLead = (e: any) => {
      const detail = e.detail;
      if (detail && detail.latest) {
        setNewLeadAlert({
          name: detail.latest.name || detail.latest.fullName || "Customer",
          destination: detail.latest.destination || "Curated Trail",
          count: detail.newCount || 1,
        });
        if (cloudSettings.soundAlerts) {
          playLeadNotificationChime();
        }
      }
    };
    window.addEventListener("triponomic_new_lead_received", handleNewLead);
    return () => window.removeEventListener("triponomic_new_lead_received", handleNewLead);
  }, [cloudSettings.soundAlerts]);

  // Cloud action handlers
  const handleTestCloud = async () => {
    setIsTestingCloud(true);
    setTestResult(null);
    try {
      const res = await testCloudConnection(cloudSettings);
      setTestResult(res);
    } finally {
      setIsTestingCloud(false);
    }
  };

  const handleSaveCloudSettings = () => {
    saveCloudSyncSettings(cloudSettings);
    handleTestCloud();
  };

  const handlePushAllToCloud = async () => {
    setIsPushingAll(true);
    setPushStatus(null);
    try {
      const res = await pushAllEnquiriesToCloud(enquiries);
      setPushStatus(
        `Successfully synced ${res.successCount} enquiries to the cloud!${
          res.failCount > 0 ? ` (${res.failCount} failed)` : ""
        }`
      );
    } finally {
      setIsPushingAll(false);
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setSchemaCopied(true);
    setTimeout(() => setSchemaCopied(false), 2500);
  };

  // Password change state in Settings
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passChangeStatus, setPassChangeStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { enquiries, isSyncing, syncNow } = useEnquiries();
  const { domesticCards, internationalCards, allCards } = useDestinationCards();

  const [activeTab, setActiveTab] = useState<"enquiries" | "domestic" | "international" | "settings">("enquiries");

  // Filter & Search states for Enquiries
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryLead | null>(null);
  const [leadNotes, setLeadNotes] = useState("");

  // Card CMS states
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<DestinationCard | null>(null);
  const [cardDefaultType, setCardDefaultType] = useState<"domestic" | "international">("domestic");
  const [cardSearch, setCardSearch] = useState("");
  const [cardRegionFilter, setCardRegionFilter] = useState("all");

  // Status counts for KPI badges
  const kpiStats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === "New").length;
    const inProgress = enquiries.filter((e) => e.status === "In Progress").length;
    const contacted = enquiries.filter((e) => e.status === "Contacted").length;
    const converted = enquiries.filter((e) => e.status === "Converted").length;
    return { total, newCount, inProgress, contacted, converted };
  }, [enquiries]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus =
        enquiryStatusFilter === "all" || item.status === enquiryStatusFilter;
      const term = enquirySearch.toLowerCase();
      const matchesSearch =
        !term ||
        item.fullName.toLowerCase().includes(term) ||
        item.destination.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phone.includes(term) ||
        (item.travelCategory && item.travelCategory.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [enquiries, enquiryStatusFilter, enquirySearch]);

  // Domestic Filtered Cards
  const filteredDomestic = useMemo(() => {
    return domesticCards.filter((card) => {
      const term = cardSearch.toLowerCase();
      return (
        !term ||
        card.name.toLowerCase().includes(term) ||
        (card.category && card.category.toLowerCase().includes(term)) ||
        (card.vibe && card.vibe.toLowerCase().includes(term))
      );
    });
  }, [domesticCards, cardSearch]);

  // International Filtered Cards
  const filteredInternational = useMemo(() => {
    return internationalCards.filter((card) => {
      const matchesRegion =
        cardRegionFilter === "all" ||
        (card.category && card.category.toLowerCase().includes(cardRegionFilter.toLowerCase()));
      const term = cardSearch.toLowerCase();
      const matchesSearch =
        !term ||
        card.name.toLowerCase().includes(term) ||
        (card.category && card.category.toLowerCase().includes(term)) ||
        (card.vibe && card.vibe.toLowerCase().includes(term));
      return matchesRegion && matchesSearch;
    });
  }, [internationalCards, cardRegionFilter, cardSearch]);

  // Open Edit Card
  const handleOpenAddCard = (type: "domestic" | "international") => {
    setEditingCard(null);
    setCardDefaultType(type);
    setCardModalOpen(true);
  };

  const handleOpenEditCard = (card: DestinationCard) => {
    setEditingCard(card);
    setCardDefaultType(card.type);
    setCardModalOpen(true);
  };

  const handleSaveCard = (cardData: Omit<DestinationCard, "id"> | DestinationCard) => {
    saveDestinationCard(cardData);
  };

  const handleDeleteCard = (card: DestinationCard) => {
    if (window.confirm(`Are you sure you want to delete "${card.name}"? This will immediately remove it from the live site.`)) {
      deleteDestinationCard(card.id);
    }
  };

  // Lead Modal handlers
  const handleSelectLead = (lead: EnquiryLead) => {
    setSelectedEnquiry(lead);
    setLeadNotes(lead.notes || "");
  };

  const handleUpdateNotes = () => {
    if (selectedEnquiry) {
      updateEnquiryNotes(selectedEnquiry.id, leadNotes);
      setSelectedEnquiry({ ...selectedEnquiry, notes: leadNotes });
    }
  };

  const handleStatusChange = (status: EnquiryLead["status"]) => {
    if (selectedEnquiry) {
      updateEnquiryStatus(selectedEnquiry.id, status);
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const handleDeleteLead = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete enquiry from "${name}"?`)) {
      deleteEnquiry(id);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert("No enquiries to export.");
      return;
    }
    const headers = [
      "ID",
      "Date",
      "Full Name",
      "Phone",
      "Email",
      "Destination",
      "Category",
      "Travelers",
      "Duration",
      "Pace",
      "Stay Preference",
      "Budget",
      "Status",
      "Notes",
    ];
    const rows = enquiries.map((e) => [
      e.id,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${e.fullName}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.destination}"`,
      `"${e.travelCategory || ""}"`,
      `"${e.travelers || ""}"`,
      `"${e.duration || ""}"`,
      `"${e.pace || ""}"`,
      `"${e.stayPreference || ""}"`,
      `"${e.budget || ""}"`,
      `"${e.status}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `triponomic_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate approximate localStorage size
  const storageUsageKb = useMemo(() => {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key].length * 2) / 1024;
        }
      }
      return total.toFixed(1);
    } catch {
      return "0";
    }
  }, [enquiries, allCards]);

  const handleSignOut = () => {
    adminSignOut();
    setIsAuthenticated(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeStatus(null);

    if (newPass !== confirmPass) {
      setPassChangeStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }

    const result = await updateAdminPassword(currentPass, newPass);
    if (result.success) {
      setPassChangeStatus({ type: "success", msg: "Admin password updated successfully!" });
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } else {
      setPassChangeStatus({ type: "error", msg: result.error || "Failed to update password." });
    }
  };

  // If not authenticated, render secure login lock screen
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === "light" ? "admin-light bg-slate-50 text-slate-900" : "bg-slate-900 text-slate-100"
      }`}
    >
      {/* Top Executive Header */}
      <header
        className={`sticky top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors duration-200 ${
          theme === "light"
            ? "bg-white/95 border-slate-200 text-slate-900"
            : "bg-[#151B40] border-white/10 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Triponomic"
                className={`h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105 ${
                  theme === "dark" ? "brightness-0 invert" : ""
                }`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold tracking-wide text-base ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    TRIPONOMIC
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin Portal
                  </span>
                </div>
                <p
                  className={`text-[11px] ${
                    theme === "light" ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  Operations &amp; Destination CMS Dashboard
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Cloud Sync Button */}
            <button
              type="button"
              onClick={() => syncNow()}
              disabled={isSyncing}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-sm ${
                isSyncing
                  ? "bg-amber-400/20 text-amber-500 border-amber-400/50 animate-pulse"
                  : theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                  : "bg-white/10 hover:bg-white/20 text-slate-200 border-white/20"
              }`}
              title="Sync latest customer enquiries across all PCs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-amber-500" : "text-emerald-500"}`} />
              <span className="hidden sm:inline">{isSyncing ? "Syncing..." : "Sync Cloud"}</span>
            </button>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-sm ${
                theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                  : "bg-white/10 hover:bg-white/20 text-amber-300 border-white/20"
              }`}
              title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark Theme</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light Theme</span>
                </>
              )}
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <span>Live Website</span>
              <ExternalLink
                className={`w-3.5 h-3.5 ${
                  theme === "light" ? "text-slate-500" : "text-slate-300"
                }`}
              />
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition cursor-pointer"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Real-time Incoming Lead Alert Banner */}
      {newLeadAlert && (
        <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 border-b border-amber-400/40 px-4 py-2.5 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <Bell className="w-4 h-4 text-amber-400 shrink-0" />
              <span className={`font-semibold ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                🔔 New Enquiry received from <span className="font-bold underline text-amber-500">{newLeadAlert.name}</span> for {newLeadAlert.destination}!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab("enquiries");
                  setNewLeadAlert(null);
                }}
                className="text-[11px] font-bold px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm"
              >
                View in Inbox
              </button>
              <button
                onClick={() => setNewLeadAlert(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Total Enquiries</span>
              <Inbox className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{kpiStats.total}</span>
              <span className="text-[11px] text-slate-400">all time</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-amber-400/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between text-amber-300">
              <span className="text-xs font-semibold">New Enquiries</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">{kpiStats.newCount}</span>
              <span className="text-[11px] text-amber-300/80">needs reply</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-blue-500/30 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-300">
              <span className="text-xs font-medium">In Progress / Contacted</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{kpiStats.inProgress + kpiStats.contacted}</span>
              <span className="text-[11px] text-slate-400">active leads</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-300">
              <span className="text-xs font-medium">Converted Trips</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">{kpiStats.converted}</span>
              <span className="text-[11px] text-emerald-300/70">booked</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Live Destination Cards</span>
              <Globe2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{allCards.length}</span>
              <span className="text-[11px] text-slate-400">{domesticCards.length} Ind / {internationalCards.length} Intl</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-800 flex items-center justify-between gap-4 overflow-x-auto pb-1">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                activeTab === "enquiries"
                  ? "bg-[#151B40] text-white border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Enquiries Inbox</span>
              {kpiStats.newCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {kpiStats.newCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("domestic");
                setCardSearch("");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                activeTab === "domestic"
                  ? "bg-[#151B40] text-white border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Discover India Cards ({domesticCards.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("international");
                setCardSearch("");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                activeTab === "international"
                  ? "bg-[#151B40] text-white border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span>Beyond Borders Cards ({internationalCards.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-[#151B40] text-white border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Sync</span>
            </button>
          </nav>
        </div>

        {/* TAB 1: ENQUIRIES INBOX */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by client, destination, phone..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New Only</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
              {filteredEnquiries.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Inbox className="w-10 h-10 mx-auto text-slate-500 opacity-60" />
                  <p className="text-sm font-medium">No enquiries match your current filters</p>
                  <p className="text-xs text-slate-500">
                    Try clearing search terms or status filters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#151B40] text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Destination</th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3">Received</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {filteredEnquiries.map((lead) => {
                        const statusColors: Record<string, string> = {
                          New: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                          "In Progress": "bg-blue-500/20 text-blue-300 border-blue-500/40",
                          Contacted: "bg-purple-500/20 text-purple-300 border-purple-500/40",
                          Converted: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                        };

                        return (
                          <tr
                            key={lead.id}
                            className="hover:bg-slate-750 transition cursor-pointer group"
                            onClick={() => handleSelectLead(lead)}
                          >
                            <td className="px-4 py-3.5">
                              <div className="font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                                {lead.fullName}
                                {lead.notes && (
                                  <span title="Has internal notes">
                                    <MessageSquare className="w-3 h-3 text-amber-400" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>{lead.phone}</span>
                                <span>•</span>
                                <span className="truncate max-w-[140px]">{lead.email}</span>
                              </div>
                            </td>

                            <td className="px-4 py-3.5">
                              <div className="font-medium text-white flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-amber-400" />
                                <span>{lead.destination}</span>
                              </div>
                              {lead.travelCategory && (
                                <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                                  {lead.travelCategory}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3.5 text-slate-300">
                              <div className="text-[11px]">
                                <span className="font-medium text-slate-200">{lead.travelers || "N/A"}</span>
                                {lead.duration && ` • ${lead.duration}`}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Budget: {lead.budget || "Flexible"}
                              </div>
                            </td>

                            <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                              {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>

                            <td className="px-4 py-3.5">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                                  statusColors[lead.status] || "bg-slate-700 text-slate-300"
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>

                            <td
                              className="px-4 py-3.5 text-right space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Quick WhatsApp button */}
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                                  lead.fullName
                                )},%20greetings%20from%20Triponomic!%20We%20received%20your%20custom%20trail%20request%20for%20${encodeURIComponent(
                                  lead.destination
                                )}.`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition text-[11px] font-medium"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>

                              <button
                                onClick={() => handleSelectLead(lead)}
                                className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                                className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                                title="Delete Enquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DOMESTIC CARDS CMS */}
        {activeTab === "domestic" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search domestic destination, category, vibe..."
                  value={cardSearch}
                  onChange={(e) => setCardSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenAddCard("domestic")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#151B40] hover:bg-[#1f285e] border border-amber-400/50 text-white shadow-md transition"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Domestic Destination Card</span>
                </button>
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDomestic.map((card) => (
                <div
                  key={card.id}
                  className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {card.featured && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">
                        {card.category || "India"}
                      </span>
                      <h4 className="text-base font-bold text-white leading-tight mt-0.5">
                        {card.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-300 font-medium line-clamp-1 italic">
                        "{card.vibe || "Curated Trail"}"
                      </div>
                      <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-700/60">
                        <span>Duration:</span>
                        <span className="font-semibold text-slate-200">{card.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Starting:</span>
                        <span className="font-bold text-amber-400">{card.startingPrice}</span>
                      </div>
                      {card.bestSeason && (
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Season:</span>
                          <span className="text-slate-300">{card.bestSeason}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700/80">
                      <button
                        onClick={() => handleOpenEditCard(card)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-white transition"
                      >
                        <Edit2 className="w-3 h-3 text-amber-400" />
                        <span>Edit Card</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERNATIONAL CARDS CMS */}
        {activeTab === "international" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search international destination, vibe..."
                    value={cardSearch}
                    onChange={(e) => setCardSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={cardRegionFilter}
                    onChange={(e) => setCardRegionFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">All Regions</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="middle east">Middle East</option>
                    <option value="island">Island / Beach</option>
                    <option value="africa">Africa</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenAddCard("international")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#151B40] hover:bg-[#1f285e] border border-amber-400/50 text-white shadow-md transition"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add International Destination Card</span>
                </button>
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredInternational.map((card) => (
                <div
                  key={card.id}
                  className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {card.featured && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider block">
                        {card.category || "International"}
                      </span>
                      <h4 className="text-base font-bold text-white leading-tight mt-0.5">
                        {card.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-300 font-medium line-clamp-1 italic">
                        "{card.vibe || "Curated Trail"}"
                      </div>
                      <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-700/60">
                        <span>Duration:</span>
                        <span className="font-semibold text-slate-200">{card.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Starting:</span>
                        <span className="font-bold text-amber-400">{card.startingPrice}</span>
                      </div>
                      {card.bestSeason && (
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Season:</span>
                          <span className="text-slate-300">{card.bestSeason}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700/80">
                      <button
                        onClick={() => handleOpenEditCard(card)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-white transition"
                      >
                        <Edit2 className="w-3 h-3 text-amber-400" />
                        <span>Edit Card</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & SYNC */}
        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-6">
            {/* Cloud Database & Live Cross-Device Sync Setup */}
            <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-6 space-y-5 shadow-lg relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Cloud Database &amp; Cross-Device Sync</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Wifi className="w-3 h-3" /> Live Sync
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Syncs enquiries in real-time when customers submit from other PCs or mobile phones.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestCloud}
                    disabled={isTestingCloud}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingCloud ? "animate-spin text-amber-400" : ""}`} />
                    <span>{isTestingCloud ? "Testing..." : "Test Connection"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCloudSettings}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-sm cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Config</span>
                  </button>
                </div>
              </div>

              {/* Status or Diagnostic Result */}
              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 animate-in fade-in duration-200 ${
                    testResult.success
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-red-500/15 border-red-500/40 text-red-300"
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}

              {pushStatus && (
                <div className="p-3 rounded-xl border border-blue-500/40 bg-blue-500/15 text-blue-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>{pushStatus}</span>
                </div>
              )}

              {/* Provider Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Cloud Storage Provider
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { id: "googlesheet", label: "Google Sheet (Form)", desc: "Direct from your linked Sheet" },
                    { id: "supabase", label: "Supabase (DB)", desc: "PostgreSQL cloud database" },
                    { id: "firebase", label: "Google Firebase", desc: "Realtime DB instant sync" },
                    { id: "webhook", label: "Custom Webhook", desc: "Apps Script / API URL" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCloudSettings((prev) => ({ ...prev, provider: p.id as any }))}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        cloudSettings.provider === p.id
                          ? theme === "light"
                            ? "bg-amber-50 border-amber-500 text-slate-900 shadow-md ring-2 ring-amber-400/30"
                            : "bg-[#151B40] border-amber-400 text-white shadow-md"
                          : theme === "light"
                          ? "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div className={`font-semibold text-xs ${
                        cloudSettings.provider === p.id && theme === "light" ? "text-slate-900" : "text-white"
                      }`}>{p.label}</div>
                      <div className={`text-[10px] mt-0.5 ${
                        cloudSettings.provider === p.id && theme === "light" ? "text-slate-600" : "text-slate-400"
                      }`}>{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider Configuration Inputs */}
              {cloudSettings.provider === "googlesheet" && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-emerald-400" /> Google Sheet Live Integration
                    </span>
                    <span className="text-[10px] uppercase font-bold text-amber-500 dark:text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      Zero Setup Required
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Google Sheet Link or Published CSV Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/.../edit or .../pub?output=csv"
                      value={cloudSettings.googleSheetUrl}
                      onChange={(e) => setCloudSettings({ ...cloudSettings, googleSheetUrl: e.target.value.trim() })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className={`p-3.5 rounded-xl border text-[11px] space-y-1.5 leading-relaxed ${
                    theme === "light"
                      ? "bg-amber-50/80 border-amber-300/80 text-slate-800"
                      : "bg-slate-950/70 border-slate-800 text-slate-300"
                  }`}>
                    <div className={`font-semibold flex items-center gap-1.5 ${
                      theme === "light" ? "text-amber-950" : "text-white"
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> How to connect your Google Sheet in 30 seconds:
                    </div>
                    <ol className={`list-decimal pl-4 space-y-1 ${
                      theme === "light" ? "text-slate-800" : "text-slate-300"
                    }`}>
                      <li>Open the Google Sheet linked to your Triponomic Google Form.</li>
                      <li>Click <strong>File &gt; Share &gt; Publish to web</strong>.</li>
                      <li>Under Link, select <strong>Entire Document</strong> (or your responses sheet) and choose <strong>Comma-separated values (.csv)</strong>.</li>
                      <li>Click <strong>Publish</strong>, copy that link, and paste it in the box above!</li>
                    </ol>
                    <p className={`text-[10px] pt-1 font-semibold ${
                      theme === "light" ? "text-amber-900" : "text-amber-300/90"
                    }`}>
                      *Tip: You can also simply share the Google Sheet (&quot;Anyone with the link can view&quot;) and paste the normal URL!
                    </p>
                  </div>
                </div>
              )}
              {cloudSettings.provider === "supabase" && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> Supabase Connection Details
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySchema}
                      className="text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
                      title="Copy SQL table definition to clipboard"
                    >
                      {schemaCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{schemaCopied ? "SQL Copied!" : "Copy SQL Schema"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Supabase Project URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://xyzcompany.supabase.co"
                        value={cloudSettings.supabaseUrl}
                        onChange={(e) => setCloudSettings({ ...cloudSettings, supabaseUrl: e.target.value.trim() })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Supabase Public Anon Key
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                        value={cloudSettings.supabaseAnonKey}
                        onChange={(e) => setCloudSettings({ ...cloudSettings, supabaseAnonKey: e.target.value.trim() })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Tip: Create a free project on <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">supabase.com</a>, click <strong>"Copy SQL Schema"</strong> above, paste it into the Supabase SQL Editor and click Run. Then paste your URL and Anon Key here.
                  </p>
                </div>
              )}

              {cloudSettings.provider === "firebase" && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-[11px] font-medium text-slate-400">
                    Firebase Realtime Database URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-triponomic-default-rtdb.firebaseio.com"
                    value={cloudSettings.firebaseUrl}
                    onChange={(e) => setCloudSettings({ ...cloudSettings, firebaseUrl: e.target.value.trim() })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {cloudSettings.provider === "webhook" && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-3">
                  <label className="block text-[11px] font-medium text-slate-400">
                    Webhook Endpoint / Google Apps Script URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={cloudSettings.webhookUrl}
                    onChange={(e) => setCloudSettings({ ...cloudSettings, webhookUrl: e.target.value.trim() })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {/* Sync Controls & Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-700/60">
                  <div>
                    <div className="text-xs font-semibold text-white">Auto-Polling Interval</div>
                    <div className="text-[10px] text-slate-400">Checks for customer leads in background</div>
                  </div>
                  <select
                    value={cloudSettings.pollIntervalMs}
                    onChange={(e) => setCloudSettings({ ...cloudSettings, pollIntervalMs: Number(e.target.value) })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value={5000}>5 Seconds (Live)</option>
                    <option value={10000}>10 Seconds (Standard)</option>
                    <option value={30000}>30 Seconds</option>
                    <option value={60000}>1 Minute</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-700/60">
                  <div>
                    <div className="text-xs font-semibold text-white">Audio Alert on New Lead</div>
                    <div className="text-[10px] text-slate-400">Plays chime when enquiry arrives</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCloudSettings({ ...cloudSettings, soundAlerts: !cloudSettings.soundAlerts })}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                      cloudSettings.soundAlerts
                        ? "bg-amber-400/20 text-amber-400 border-amber-400/40"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {cloudSettings.soundAlerts ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{cloudSettings.soundAlerts ? "Sound ON" : "Muted"}</span>
                  </button>
                </div>
              </div>

              {/* Push Local to Cloud Action */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20">
                <div>
                  <div className="text-xs font-bold text-amber-300">Push Local Enquiries to Cloud</div>
                  <div className="text-[11px] text-slate-300">Uploads all {enquiries.length} current enquiries so other PCs immediately see them.</div>
                </div>
                <button
                  type="button"
                  onClick={handlePushAllToCloud}
                  disabled={isPushingAll}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm shrink-0 cursor-pointer"
                >
                  {isPushingAll ? "Uploading..." : "Push to Cloud"}
                </button>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Storage & Data Diagnostics
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Triponomic uses browser-persistent local storage synchronized in real-time across all user tabs and customer-facing pages. Any edits or new cards saved here instantly populate throughout the home page, domestic page, and international page.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Total Enquiries</div>
                  <div className="text-xl font-bold text-white mt-1">{enquiries.length}</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Total Destination Cards</div>
                  <div className="text-xl font-bold text-white mt-1">{allCards.length}</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400">Local Storage Used</div>
                  <div className="text-xl font-bold text-amber-400 mt-1">{storageUsageKb} KB</div>
                </div>
              </div>
            </div>

            {/* Quick Resets */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-blue-400" />
                Quick Reset & Recovery Controls
              </h3>
              <p className="text-xs text-slate-300">
                Use these tools to restore curated demonstration data or clean up test leads.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div>
                    <div className="text-xs font-semibold text-white">Reset Destination Cards to Default</div>
                    <div className="text-[11px] text-slate-400">Restores all 32 curated domestic and international cards.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Restore default cards? Any custom cards will be replaced.")) {
                        resetCardsToDefault();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 transition"
                  >
                    Reset Cards
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div>
                    <div className="text-xs font-semibold text-white">Reset Enquiries to Sample Data</div>
                    <div className="text-[11px] text-slate-400">Restores the 4 initial demo leads for demonstration.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Reset leads to sample data?")) {
                        resetEnquiriesToDefault();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 transition"
                  >
                    Reset Leads
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                  <div>
                    <div className="text-xs font-semibold text-red-300">Clear All Enquiries</div>
                    <div className="text-[11px] text-slate-400">Permanently wipes all lead submissions.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete ALL enquiries?")) {
                        clearAllEnquiries();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/40 transition"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Password & Security Card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                Change Admin Password
              </h3>
              <p className="text-xs text-slate-300">
                Update your login credentials. The password is cryptographically encrypted using salted SHA-256 before saving to the browser's secure storage so it cannot be extracted even in DevTools.
              </p>

              {passChangeStatus && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    passChangeStatus.type === "success"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/15 border-red-500/30 text-red-300"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passChangeStatus.msg}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Current password"
                      required
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Min 6 characters"
                      required
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Repeat new password"
                      required
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Reset password back to factory default?")) {
                        resetAdminCredentialsToDefault();
                        alert("Password restored to factory default: triponomic2026");
                      }
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-300 underline cursor-pointer"
                  >
                    Restore default password
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#151B40] hover:bg-[#1f285e] border border-amber-400/50 text-white shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-[#151B40] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  {selectedEnquiry.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{selectedEnquiry.fullName}</h3>
                  <p className="text-xs text-slate-300">
                    Lead ID: #{selectedEnquiry.id.slice(-6)} • Received {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              {/* Status Update Quick Selector */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-300">Current Lead Status:</span>
                <div className="flex items-center gap-1.5">
                  {(["New", "In Progress", "Contacted", "Converted"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                        selectedEnquiry.status === st
                          ? "bg-amber-400 text-slate-950 shadow-sm"
                          : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" /> Phone Number
                  </div>
                  <div className="font-semibold text-white mt-1">{selectedEnquiry.phone}</div>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 text-[11px] text-emerald-400 hover:underline"
                  >
                    Open WhatsApp Chat &rarr;
                  </a>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-400" /> Email Address
                  </div>
                  <div className="font-semibold text-white mt-1 break-all">{selectedEnquiry.email}</div>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="inline-block mt-1 text-[11px] text-blue-400 hover:underline"
                  >
                    Send Email &rarr;
                  </a>
                </div>
              </div>

              {/* Trip Preferences Details */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" /> Requested Trail Preferences
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Destination</span>
                    <span className="font-bold text-white text-sm">{selectedEnquiry.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Trip Category</span>
                    <span className="font-medium text-slate-200">{selectedEnquiry.travelCategory || "Custom"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Travelers</span>
                    <span className="font-medium text-slate-200">{selectedEnquiry.travelers || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Duration</span>
                    <span className="font-medium text-slate-200">{selectedEnquiry.duration || "Flexible"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Pace</span>
                    <span className="font-medium text-slate-200">{selectedEnquiry.pace || "Moderate"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Stay Preference</span>
                    <span className="font-medium text-slate-200">{selectedEnquiry.stayPreference || "Boutique / Heritage"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Budget</span>
                    <span className="font-bold text-amber-400">{selectedEnquiry.budget || "Custom"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Lead Source</span>
                    <span className="font-medium text-slate-300">{selectedEnquiry.source || "Website Form"}</span>
                  </div>
                </div>

                {selectedEnquiry.interests && selectedEnquiry.interests.length > 0 && (
                  <div className="pt-2">
                    <span className="text-slate-400 text-[10px] block mb-1">Selected Interests</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEnquiry.interests.map((it, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 text-[10px]">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEnquiry.remarks && (
                  <div className="pt-2 border-t border-slate-700/60">
                    <span className="text-slate-400 text-[10px] block mb-1">Client Special Remarks</span>
                    <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 leading-relaxed italic">
                      "{selectedEnquiry.remarks}"
                    </p>
                  </div>
                )}
              </div>

              {/* Internal Staff Notes */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 text-[11px] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Internal Staff Notes
                  </span>
                  <button
                    type="button"
                    onClick={handleUpdateNotes}
                    className="px-2.5 py-1 text-[10px] font-semibold rounded bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Record call logs, quoted itinerary package, special client requests..."
                  className="w-full p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedEnquiry.id, selectedEnquiry.fullName)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Edit Modal */}
      <CardEditModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSave={handleSaveCard}
        cardToEdit={editingCard}
        defaultType={cardDefaultType}
      />
    </div>
  );
};
