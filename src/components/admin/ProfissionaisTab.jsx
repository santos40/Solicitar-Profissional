import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toggleProfessionalStatus } from '@/utils/api';

const ProfissionaisTab = ({ profissionais }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: toggleProfessionalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Status do profissional atualizado" });
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar status", description: error.message, variant: "destructive" });
    },
  });

  return (
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
            {profissionais.map((prof) => (
              <TableRow key={prof.id}>
                <TableCell>{prof.nome}</TableCell>
                <TableCell>{prof.categoria}</TableCell>
                <TableCell>{prof.pago ? 'Pago' : 'Pendente'}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleStatusMutation.mutate({ id: prof.id, pago: !prof.pago })}
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
  );
};

export default ProfissionaisTab;