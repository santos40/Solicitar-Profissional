import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const fetchCadastrados = async () => {
  // This should be replaced with an actual API call
  const response = await fetch('/api/cadastrados');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Cadastrados = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: cadastrados, isLoading, error } = useQuery({
    queryKey: ['cadastrados'],
    queryFn: fetchCadastrados,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profissionais e Empresas Cadastrados</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <Input
            type="text"
            placeholder="Buscar por nome, categoria ou cidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cadastrados && cadastrados.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.nome}</CardTitle>
              <CardDescription>{item.categoria}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cidade: {item.cidade}</p>
              <p>WhatsApp: {item.whatsapp}</p>
              {item.website && <p>Website: {item.website}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cadastrados;