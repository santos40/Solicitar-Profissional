import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchDashboardData = async () => {
  const response = await fetch('/api/admin/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

const AdminDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Profissionais</CardTitle>
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profissionais Mais Clicados</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.profissionaisMaisClicados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cliques" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cadastros Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.cadastrosRecentes.map((cadastro) => (
              <li key={cadastro.id} className="flex justify-between items-center">
                <span>{cadastro.nome}</span>
                <span className="text-sm text-gray-500">{new Date(cadastro.data_cadastro).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;