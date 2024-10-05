import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchProfissional = async (id) => {
  // Simulating API call. Replace with actual API call in production.
  const response = await fetch(`/api/profissional/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Perfil = () => {
  const { id } = useParams();
  const { data: profissional, isLoading, error } = useQuery({
    queryKey: ['profissional', id],
    queryFn: () => fetchProfissional(id),
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar o perfil: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{profissional.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={profissional.logo} alt={profissional.nome} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
          <p className="mb-2">{profissional.descricao}</p>
          <p className="mb-2">WhatsApp: {profissional.whatsapp}</p>
          {profissional.youtube && <p className="mb-2">YouTube: <a href={profissional.youtube} target="_blank" rel="noopener noreferrer">{profissional.youtube}</a></p>}
          {profissional.instagram && <p className="mb-2">Instagram: @{profissional.instagram}</p>}
          {profissional.website && <p className="mb-2">Website: <a href={profissional.website} target="_blank" rel="noopener noreferrer">{profissional.website}</a></p>}
          <Button className="mt-4" onClick={() => window.open(`https://wa.me/${profissional.whatsapp}`, '_blank')}>
            Contatar via WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;