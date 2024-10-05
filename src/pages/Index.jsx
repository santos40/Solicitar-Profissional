import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const fetchProfissionais = async () => {
  // Simulating API call. Replace with actual API call in production.
  return [
    { id: 1, nome: 'João Silva', categoria: 'Pedreiro', whatsapp: '5511999999999' },
    { id: 2, nome: 'Maria Souza', categoria: 'Diarista', whatsapp: '5511888888888' },
    { id: 3, nome: 'Pedro Santos', categoria: 'Eletricista', whatsapp: '5511777777777' },
  ];
};

const Index = () => {
  const { data: profissionais, isLoading, error } = useQuery({
    queryKey: ['profissionais'],
    queryFn: fetchProfissionais,
  });

  if (isLoading) return <div className="text-center mt-8">Carregando...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Erro ao carregar profissionais: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Profissionais Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profissionais.map((profissional) => (
          <Card key={profissional.id}>
            <CardHeader>
              <CardTitle>{profissional.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Categoria: {profissional.categoria}</p>
              <div className="flex justify-between">
                <Button asChild>
                  <Link to={`/perfil/${profissional.id}`}>Ver Perfil</Link>
                </Button>
                <Button onClick={() => window.open(`https://wa.me/${profissional.whatsapp}`, '_blank')}>
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;