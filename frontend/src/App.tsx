import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inscription from "./pages/Inscription";
import DashboardTouriste from "./pages/DashboardTouriste";
import PlanVoyage from "./pages/PlanVoyage";
import Accompagnant from "./pages/Accompagnant";
import Communaute from "./pages/Communaute";
import Culture from "./pages/Culture";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Ecodefis from "./pages/Ecodefis";
import Urgence from "./pages/Urgence";
import CultureId from "./pages/CultureId";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/dashboard" element={<DashboardTouriste />} />
          <Route path="/plan-voyage" element={<PlanVoyage />} />
          <Route path="/accompagnant" element={<Accompagnant />} />
          <Route path="/communaute" element={<Communaute />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/culture/:id" element={<CultureId />} />
          <Route path="/ecodefis" element={<Ecodefis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/urgence" element={<Urgence />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
