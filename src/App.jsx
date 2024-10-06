import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import CadastroEmpresa from './pages/CadastroEmpresa';
import Pagamento from './pages/Pagamento';
import Perfil from './pages/Perfil';
import PerfilDetalhado from './pages/PerfilDetalhado';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminChangePassword from './pages/AdminChangePassword';
import Orcamento from './pages/Orcamento';
import Cadastrados from './pages/Cadastrados';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cadastro-profissional" element={<Cadastro />} />
                <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
                <Route path="/pagamento" element={<Pagamento />} />
                <Route path="/perfil/:id" element={<PerfilDetalhado />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/change-password" element={<AdminChangePassword />} />
                <Route path="/orcamento" element={<Orcamento />} />
                <Route path="/cadastrados" element={<Cadastrados />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
