import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addCategory } from '@/utils/api';

const CategoriasTab = ({ categorias }) => {
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminDashboard']);
      toast({ title: "Categoria adicionada com sucesso" });
      setNewCategory("");
    },
    onError: (error) => {
      toast({ title: "Erro ao adicionar categoria", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="mb-4">
          {categorias.map((categoria) => (
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
  );
};

export default CategoriasTab;