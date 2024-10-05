import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import Pagamento from './pages/Pagamento';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;