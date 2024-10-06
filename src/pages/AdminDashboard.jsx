import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDashboardData } from '@/utils/api';
import OverviewTab from '@/components/admin/OverviewTab';
import ProfissionaisTab from '@/components/admin/ProfissionaisTab';
import CategoriasTab from '@/components/admin/CategoriasTab';
import OrcamentosTab from '@/components/admin/OrcamentosTab';
import QuotesTab from '@/components/admin/QuotesTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
          <TabsTrigger value="quotes">Pedidos de Orçamento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab data={data} />
        </TabsContent>

        <TabsContent value="profissionais">
          <ProfissionaisTab profissionais={data.profissionais} />
        </TabsContent>

        <TabsContent value="categorias">
          <CategoriasTab categorias={data.categorias} />
        </TabsContent>

        <TabsContent value="orcamentos">
          <OrcamentosTab orcamentos={data.orcamentosRecentes} />
        </TabsContent>

        <TabsContent value="quotes">
          <QuotesTab quotes={data.quotes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;