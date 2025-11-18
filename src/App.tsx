import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Pacientes from "./pages/Pacientes";
import Financeiro from "./pages/Financeiro";
import Mensagens from "./pages/Mensagens";
import NotasFiscais from "./pages/NotasFiscais";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/agenda" element={<AppLayout><Agenda /></AppLayout>} />
          <Route path="/pacientes" element={<AppLayout><Pacientes /></AppLayout>} />
          <Route path="/financeiro" element={<AppLayout><Financeiro /></AppLayout>} />
          <Route path="/mensagens" element={<AppLayout><Mensagens /></AppLayout>} />
          <Route path="/notas-fiscais" element={<AppLayout><NotasFiscais /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
