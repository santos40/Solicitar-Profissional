import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchProfissionais = async () => {
  // Simulating API call. Replace with actual API call in production.
  return [
    { id: 1, nome: 'João Silva', categoria: 'Pedreiro', whatsapp: '5511999999999', pago: true },
    { id: 2, nome: 'Maria Souza', categoria: 'Diarista', whatsapp: '5511888888888', pago: false },
    { id: 3, nome: 'Pedro Santos', categoria: 'Eletricista', whatsapp: '5511777777777', pago: true },
  ];
};

const fetchCategorias = async () => {
  // Simulating API call. Replace with actual API call in production.
  return [
    { id: 1, nome: 'Pedreiro' },
    { id: 2, nome: 'Diarista' },
    { id: 3, nome: 'Eletricista' },
    { id: 4, nome: 'Encanador' },
    { id: 5, nome: 'Pintor' },
  ];
};

const Admin = () => {
  const [novaCategoria, setNovaCategoria] = useState('');

  const { data: profissionais, isLoading: isLoadingProfissionais, error: errorProfissionais } = useQuery({
    queryKey: ['profissionais'],
    queryFn: fetchProfissionais,
  });

  const { data: categorias, isLoading: isLoadingCategorias, error: errorCategorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: fetchCategorias,
  });

  const adicionarCategoria = () => {
    // Implementar lógica para adicionar categoria
    console.log('Adicionar categoria:', novaCategoria);
    setNovaCategoria('');
  };

  if (isLoadingProfissionais || isLoadingCategorias) return <div>Carregando...</div>;
  if (errorProfissionais || errorCategorias) return <div>Erro ao carregar dados: {errorProfissionais?.message || errorCategorias?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gerenciar Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
            <Button onClick={adicionarCategoria}>Adicionar</Button>
          </div>
          <ul>
            {categorias.map((categoria) => (
              <li key={categoria.id} className="flex justify-between items-center mb-2">
                {categoria.nome}
                <Button variant="destructive" size="sm">Remover</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Lista de Profissionais</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profissionais.map((profissional) => (
            <TableRow key={profissional.id}>
              <TableCell>{profissional.nome}</TableCell>
              <TableCell>{profissional.categoria}</TableCell>
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