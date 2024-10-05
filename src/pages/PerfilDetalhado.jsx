import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Star, MapPin, Briefcase, Phone, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This would typically come from an API call
const mockCadastrados = [
  { id: 1, nome: "João Silva", categoria: "Pedreiro", cidade: "São Paulo", whatsapp: "+5511987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.5 },
  { id: 2, nome: "Maria Construções Ltda.", categoria: "Construtora", cidade: "Rio de Janeiro", whatsapp: "+5521987654321", website: "www.mariaconstrucoes.com.br", tipo: "Empresa", logo: "/placeholder.svg", rating: 4.2 },
  { id: 3, nome: "Carlos Eletricista", categoria: "Eletricista", cidade: "Belo Horizonte", whatsapp: "+5531987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.8 },
  { id: 4, nome: "Pinturas & Cia", categoria: "Pintura", cidade: "Salvador", whatsapp: "+5571987654321", website: "www.pinturasecia.com.br", tipo: "Empresa", logo: "/placeholder.svg", rating: 3.9 },
  { id: 5, nome: "Ana Jardins", categoria: "Jardinagem", cidade: "Curitiba", whatsapp: "+5541987654321", tipo: "Profissional", logo: "/placeholder.svg", rating: 4.7 },
  { id: 6, nome: "Tech Instalações ME", categoria: "Instalações Elétricas", cidade: "Porto Alegre", whatsapp: "+5551987654321", website: "www.techinstalacoes.com.br", rating: 4.1 },
];

const PerfilDetalhado = () => {
  const { id } = useParams();
  const perfil = mockCadastrados.find(item => item.id === parseInt(id));

  if (!perfil) {
    return <div>Perfil não encontrado</div>;
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${perfil.nome} - ${perfil.categoria}`,
        text: `Confira ${perfil.nome}, ${perfil.categoria} em ${perfil.cidade}`,
        url: window.location.href,
      })
      .then(() => console.log('Conteúdo compartilhado com sucesso'))
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={perfil.logo} alt={perfil.nome} />
              <AvatarFallback>{perfil.nome.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{perfil.nome}</CardTitle>
              <CardDescription className="text-xl">{perfil.categoria}</CardDescription>
              <div className="flex items-center mt-2">
                {renderStars(perfil.rating)}
                <span className="ml-2">({perfil.rating})</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <MapPin className="mr-2" />
            <span>{perfil.cidade}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2" />
            <span>{perfil.tipo}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2" />
            <span>{perfil.whatsapp}</span>
          </div>
          {perfil.website && (
            <div className="flex items-center">
              <Globe className="mr-2" />
              <a href={perfil.website} target="_blank" rel="noopener noreferrer">{perfil.website}</a>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="default"
            onClick={() => window.open(`https://wa.me/${perfil.whatsapp}`, '_blank')}
          >
            Contatar via WhatsApp
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PerfilDetalhado;
