import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Share2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Update the mock data to include logo and rating
const mockCadastrados = [
  { id: 1, nome: "João Silva", categoria: "Pedreiro", cidade: "São Paulo", whatsapp: "+5511987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.5 },
  { id: 2, nome: "Maria Construções Ltda.", categoria: "Construtora", cidade: "Rio de Janeiro", whatsapp: "+5521987654321", website: "www.mariaconstrucoes.com.br", tipo: "Empresa", logo: "/placeholder.svg", rating: 4.2 },
  { id: 3, nome: "Carlos Eletricista", categoria: "Eletricista", cidade: "Belo Horizonte", whatsapp: "+5531987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.8 },
  { id: 4, nome: "Pinturas & Cia", categoria: "Pintura", cidade: "Salvador", whatsapp: "+5571987654321", website: "www.pinturasecia.com.br", tipo: "Empresa", logo: "/placeholder.svg", rating: 3.9 },
  { id: 5, nome: "Ana Jardins", categoria: "Jardinagem", cidade: "Curitiba", whatsapp: "+5541987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.7 },
  { id: 6, nome: "Tech Instalações ME", categoria: "Instalações Elétricas", cidade: "Porto Alegre", whatsapp: "+5551987654321", website: "www.techinstalacoes.com.br", tipo: "Empresa", logo: "/placeholder.svg", rating: 4.1 },
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

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: `${item.nome} - ${item.categoria}`,
        text: `Confira ${item.nome}, ${item.categoria} em ${item.cidade}`,
        url: window.location.href,
      })
      .then(() => console.log('Conteúdo compartilhado com sucesso'))
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
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
          <Link to={`/perfil/${item.id}`} key={item.id} className="no-underline">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={item.logo} alt={item.nome} />
                    <AvatarFallback>{item.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{item.nome}</CardTitle>
                    <CardDescription>{item.categoria}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>Tipo: {item.tipo}</p>
                <p>Cidade: {item.cidade}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <p>Avaliação:</p>
                  <div className="flex">{renderStars(item.rating)}</div>
                  <p className="text-sm text-gray-500">({item.rating})</p>
                </div>
                {item.website && <p>Website: {item.website}</p>}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="default"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://wa.me/${item.whatsapp}`, '_blank');
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(item);
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cadastrados;