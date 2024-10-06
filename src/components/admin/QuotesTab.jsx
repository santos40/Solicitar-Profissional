import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateQuote, deleteQuote } from '@/utils/api';

const QuotesTab = ({ quotes }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingQuote, setEditingQuote] = useState(null);

  const updateMutation = useMutation({
    mutationFn: updateQuote,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Pedido de orçamento atualizado com sucesso" });
      setEditingQuote(null);
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar pedido de orçamento", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Pedido de orçamento deletado com sucesso" });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar pedido de orçamento", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (quote) => {
    setEditingQuote({ ...quote });
  };

  const handleSaveEdit = () => {
    updateMutation.mutate(editingQuote);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este pedido de orçamento?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos de Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>{quote.nome}</TableCell>
                <TableCell>{quote.cidade}</TableCell>
                <TableCell>{quote.servico}</TableCell>
                <TableCell>{quote.status}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(quote)}>
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Pedido de Orçamento</DialogTitle>
                      </DialogHeader>
                      {editingQuote && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              value={editingQuote.nome}
                              onChange={(e) => setEditingQuote({ ...editingQuote, nome: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                              Cidade
                            </Label>
                            <Input
                              id="city"
                              value={editingQuote.cidade}
                              onChange={(e) => setEditingQuote({ ...editingQuote, cidade: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="service" className="text-right">
                              Serviço
                            </Label>
                            <Input
                              id="service"
                              value={editingQuote.servico}
                              onChange={(e) => setEditingQuote({ ...editingQuote, servico: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Input
                              id="status"
                              value={editingQuote.status}
                              onChange={(e) => setEditingQuote({ ...editingQuote, status: e.target.value })}
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
                    onClick={() => handleDelete(quote.id)}
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

export default QuotesTab;