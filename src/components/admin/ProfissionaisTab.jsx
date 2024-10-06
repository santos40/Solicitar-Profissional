import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toggleProfessionalStatus, editProfessional, deleteProfessional } from '@/utils/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfissionaisTab = ({ profissionais }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProfessional, setEditingProfessional] = useState(null);

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

  const editMutation = useMutation({
    mutationFn: editProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Profissional editado com sucesso" });
      setEditingProfessional(null);
    },
    onError: (error) => {
      toast({ title: "Erro ao editar profissional", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Profissional deletado com sucesso" });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar profissional", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (prof) => {
    setEditingProfessional({ ...prof });
  };

  const handleSaveEdit = () => {
    editMutation.mutate(editingProfessional);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este profissional?")) {
      deleteMutation.mutate(id);
    }
  };

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
                    className="mr-2"
                    onClick={() => toggleStatusMutation.mutate({ id: prof.id, pago: !prof.pago })}
                  >
                    {prof.pago ? 'Marcar como Pendente' : 'Marcar como Pago'}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(prof)}>
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Profissional</DialogTitle>
                      </DialogHeader>
                      {editingProfessional && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              value={editingProfessional.nome}
                              onChange={(e) => setEditingProfessional({ ...editingProfessional, nome: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Categoria
                            </Label>
                            <Input
                              id="category"
                              value={editingProfessional.categoria}
                              onChange={(e) => setEditingProfessional({ ...editingProfessional, categoria: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <DialogClose asChild>
                        <Button type="submit" onClick={handleSaveEdit}>Salvar alterações</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(prof.id)}
                  >
                    Deletar
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