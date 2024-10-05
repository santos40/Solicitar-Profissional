import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const fetchProfissionais = async () => {
  // Simulating API call. Replace with actual API call in production.
  return [
    { id: 1, nome: 'João Silva', categoria: 'Pedreiro', cidade: 'São Paulo', whatsapp: '5511999999999' },
    { id: 2, nome: 'Maria Souza', categoria: 'Diarista', cidade: 'Rio de Janeiro', whatsapp: '5511888888888' },
    { id: 3, nome: 'Pedro Santos', categoria: 'Eletricista', cidade: 'Belo Horizonte', whatsapp: '5511777777777' },
  ];
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: profissionais, isLoading, error } = useQuery({
    queryKey: ['profissionais'],
    queryFn: fetchProfissionais,
  });

  const filteredProfissionais = profissionais?.filter(prof => 
    prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <div className="text-center mt-8">Carregando...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Erro ao carregar profissionais: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Profissionais Disponíveis</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Pesquisar por nome, categoria ou cidade"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfissionais.map((profissional) => (
          <Card key={profissional.id}>
            <CardHeader>
              <CardTitle>{profissional.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Categoria: {profissional.categoria}</p>
              <p className="mb-2">Cidade: {profissional.cidade}</p>
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