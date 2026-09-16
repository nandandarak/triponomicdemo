import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { verifyAdminCredentials } from "@/services/adminAuth";
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Artificial delay to prevent automated brute-force timing attacks
      await new Promise((res) => setTimeout(res, 400));

      const result = await verifyAdminCredentials(username, password);

      if (result.success) {
        onSuccess();
      } else {
        setAttempts((prev) => prev + 1);
        setErrorMessage(result.error || "Access denied. Invalid credentials.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-[#151B40] border border-amber-400/40 shadow-xl mx-auto">
            <img src={logo} alt="Triponomic" className="h-9 w-auto object-contain brightness-0 invert" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Triponomic Portal
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Admin Authentication
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Protected operations &amp; destination management
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter authorized username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full py-3 px-4 rounded-xl bg-[#151B40] hover:bg-[#1f285e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg flex items-center justify-center gap-2 mt-2 group cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block animate-pulse">Verifying credentials...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-300 transition">
            &larr; Back to Website
          </Link>
          <span className="text-[11px] text-slate-600">SHA-256 Encrypted</span>
        </div>
      </div>
    </div>
  );
};
