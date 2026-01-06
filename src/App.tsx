import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop"; // ✅ ADD THIS

import Index from "./pages/Index";
import EnquireNow from "./pages/EnquireNow";
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
          <Route path="/enquire" element={<EnquireNow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
