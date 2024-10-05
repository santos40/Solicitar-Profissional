import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const fetchProfissionais = async () => {
  // Simulating API call. Replace with actual API call in production.
  const response = await fetch('/api/profissionais');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Admin = () => {
  const { data: profissionais, isLoading, error } = useQuery({
    queryKey: ['profissionais'],
    queryFn: fetchProfissionais,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os profissionais: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profissionais.map((profissional) => (
            <TableRow key={profissional.id}>
              <TableCell>{profissional.nome}</TableCell>
              <TableCell>{profissional.whatsapp}</TableCell>
              <TableCell>{profissional.pago ? 'Pago' : 'Pendente'}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Editar</Button>
                <Button variant="destructive">Remover</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;