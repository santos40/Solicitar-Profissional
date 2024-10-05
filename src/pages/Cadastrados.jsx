import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Mock data for professionals and companies
const mockCadastrados = [
  { id: 1, nome: "João Silva", categoria: "Pedreiro", cidade: "São Paulo", whatsapp: "+55 11 98765-4321", tipo: "Profissional" },
  { id: 2, nome: "Maria Construções Ltda.", categoria: "Construtora", cidade: "Rio de Janeiro", whatsapp: "+55 21 98765-4321", website: "www.mariaconstrucoes.com.br", tipo: "Empresa" },
  { id: 3, nome: "Carlos Eletricista", categoria: "Eletricista", cidade: "Belo Horizonte", whatsapp: "+55 31 98765-4321", tipo: "Profissional" },
  { id: 4, nome: "Pinturas & Cia", categoria: "Pintura", cidade: "Salvador", whatsapp: "+55 71 98765-4321", website: "www.pinturasecia.com.br", tipo: "Empresa" },
  { id: 5, nome: "Ana Jardins", categoria: "Jardinagem", cidade: "Curitiba", whatsapp: "+55 41 98765-4321", tipo: "Profissional" },
  { id: 6, nome: "Tech Instalações ME", categoria: "Instalações Elétricas", cidade: "Porto Alegre", whatsapp: "+55 51 98765-4321", website: "www.techinstalacoes.com.br", tipo: "Empresa" },
];

const Cadastrados = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCadastrados, setFilteredCadastrados] = useState(mockCadastrados);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = mockCadastrados.filter(item =>
      item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cidade.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCadastrados(filtered);
  };

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
        {filteredCadastrados.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.nome}</CardTitle>
              <CardDescription>{item.categoria}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tipo: {item.tipo}</p>
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