import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop"; // ✅ ADD THIS

import Index from "./pages/Index";
import Domestic from "./pages/Domestic";
import International from "./pages/International";
import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import Experiences from "./pages/Experiences";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import EnquireNow from "./pages/EnquireNow";
import BuildTrail from "./pages/BuildTrail";
import { AdminPortal } from "./pages/AdminPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        {/* Global UI */}
        <Toaster />
        <Sonner />

        {/* ✅ SCROLL FIX (ONLY ADDITION) */}
        <ScrollToTop />

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/domestic" element={<Domestic />} />
          <Route path="/international" element={<International />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/build-trail" element={<BuildTrail />} />
          <Route path="/customise-trail" element={<BuildTrail />} />
          <Route path="/enquire" element={<EnquireNow />} />
          <Route path="/contact" element={<EnquireNow />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
