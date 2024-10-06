import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { mockCadastrados, mockCategorias, mockOrcamentos } from '@/data/mockCadastrados';

const fetchDashboardData = async () => {
  // Simulating API call with mock data
  return {
    totalProfissionais: mockCadastrados.length,
    profissionaisPagos: mockCadastrados.filter(p => p.pago).length,
    orcamentosPendentes: mockOrcamentos.filter(o => o.status === 'pendente').length,
    profissionais: mockCadastrados,
    categorias: mockCategorias,
    orcamentosRecentes: mockOrcamentos
  };
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [newCategory, setNewCategory] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
  });

  const addCategoryMutation = useMutation({
    mutationFn: async (categoryName) => {
      // Simulating API call
      console.log('Adding category:', categoryName);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Categoria adicionada com sucesso" });
      setNewCategory("");
    },
    onError: (error) => {
      toast({ title: "Erro ao adicionar categoria", description: error.message, variant: "destructive" });
    },
  });

  const toggleProfessionalStatusMutation = useMutation({
    mutationFn: async ({ id, pago }) => {
      // Simulating API call
      console.log('Toggling professional status:', id, pago);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Status do profissional atualizado" });
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar status", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total de Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{data.totalProfissionais}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profissionais Pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{data.profissionaisPagos}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Orçamentos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{data.orcamentosPendentes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profissionais">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.profissionais.map((prof) => (
                    <TableRow key={prof.id}>
                      <TableCell>{prof.nome}</TableCell>
                      <TableCell>{prof.categoria}</TableCell>
                      <TableCell>{prof.pago ? 'Pago' : 'Pendente'}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleProfessionalStatusMutation.mutate({ id: prof.id, pago: !prof.pago })}
                        >
                          {prof.pago ? 'Marcar como Pendente' : 'Marcar como Pago'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="mb-4">
                {data.categorias.map((categoria) => (
                  <li key={categoria.id}>{categoria.nome}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Input
                  placeholder="Nova categoria"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button onClick={() => addCategoryMutation.mutate(newCategory)}>
                  Adicionar Categoria
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orcamentos">
          <Card>
            <CardHeader>
              <CardTitle>Orçamentos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.orcamentosRecentes.map((orcamento) => (
                    <TableRow key={orcamento.id}>
                      <TableCell>{orcamento.nome}</TableCell>
                      <TableCell>{orcamento.servico}</TableCell>
                      <TableCell>{orcamento.status}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Detalhes</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalhes do Orçamento</DialogTitle>
                            </DialogHeader>
                            <div>
                              <p><strong>Cliente:</strong> {orcamento.nome}</p>
                              <p><strong>Serviço:</strong> {orcamento.servico}</p>
                              <p><strong>Status:</strong> {orcamento.status}</p>
                              <p><strong>Descrição:</strong> {orcamento.descricao}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;