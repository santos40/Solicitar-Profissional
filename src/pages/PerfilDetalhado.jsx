import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Star, MapPin, Briefcase, Phone, Globe, Calendar, Tag, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import AvaliacaoBotoes from '@/components/AvaliacaoBotoes';
import { createWhatsAppLink } from '@/utils/messageUtils';
import { ProfileHeader, ProfileInfo, Comments } from '@/components/PerfilComponents';

const mockCadastrados = [
  {
    id: 1,
    nome: "João Silva",
    categoria: "Pedreiro",
    cidade: "São Paulo",
    whatsapp: "+5511987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.5,
    descricao: "Pedreiro experiente com mais de 15 anos no mercado. Especializado em construções residenciais e reformas.",
    tags: ["construção", "reforma", "alvenaria"],
    dataCadastro: "2023-01-15",
    likes: 25,
    dislikes: 2,
    comments: [
      { author: "Maria", text: "Ótimo trabalho! Recomendo.", date: "2023-05-10" },
      { author: "Pedro", text: "Profissional pontual e eficiente.", date: "2023-06-15" }
    ]
  },
  {
    id: 2,
    nome: "Maria Construções Ltda.",
    categoria: "Construtora",
    cidade: "Rio de Janeiro",
    whatsapp: "+5521987654321",
    website: "www.mariaconstrucoes.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 4.2,
    descricao: "Construtora com vasta experiência em obras de grande porte.",
    tags: ["construção", "empresa", "obras"],
    dataCadastro: "2023-02-20",
    likes: 15,
    dislikes: 1,
    comments: []
  },
  {
    id: 3,
    nome: "Carlos Eletricista",
    categoria: "Eletricista",
    cidade: "Belo Horizonte",
    whatsapp: "+5531987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.8,
    descricao: "Eletricista qualificado, especializado em instalações residenciais.",
    tags: ["eletricidade", "instalações", "residencial"],
    dataCadastro: "2023-03-10",
    likes: 30,
    dislikes: 0,
    comments: []
  },
  {
    id: 4,
    nome: "Pinturas & Cia",
    categoria: "Pintura",
    cidade: "Salvador",
    whatsapp: "+5571987654321",
    website: "www.pinturasecia.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 3.9,
    descricao: "Serviços de pintura interna e externa com qualidade garantida.",
    tags: ["pintura", "serviços", "qualidade"],
    dataCadastro: "2023-04-05",
    likes: 10,
    dislikes: 5,
    comments: []
  },
  {
    id: 5,
    nome: "Ana Jardins",
    categoria: "Jardinagem",
    cidade: "Curitiba",
    whatsapp: "+5541987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.7,
    descricao: "Especialista em jardinagem e paisagismo.",
    tags: ["jardinagem", "paisagismo", "verde"],
    dataCadastro: "2023-05-15",
    likes: 20,
    dislikes: 1,
    comments: []
  },
  {
    id: 6,
    nome: "Tech Instalações ME",
    categoria: "Instalações Elétricas",
    cidade: "Porto Alegre",
    whatsapp: "+5551987654321",
    website: "www.techinstalacoes.com.br",
    rating: 4.1,
    descricao: "Instalações elétricas seguras e eficientes.",
    tags: ["instalações", "elétricas", "segurança"],
    dataCadastro: "2023-06-25",
    likes: 5,
    dislikes: 0,
    comments: []
  },
];

const PerfilDetalhado = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(mockCadastrados.find(item => item.id === parseInt(id)));
  const [newComment, setNewComment] = useState('');

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

  const handleLike = () => {
    setPerfil(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleDislike = () => {
    setPerfil(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        author: "Usuário Anônimo",
        text: newComment,
        date: new Date().toISOString().split('T')[0]
      };
      setPerfil(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentObj]
      }));
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <ProfileHeader perfil={perfil} renderStars={renderStars} />
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileInfo perfil={perfil} />
          <AvaliacaoBotoes perfil={perfil} handleLike={handleLike} handleDislike={handleDislike} />
          <Button
            variant="default"
            className="w-full mt-4"
            onClick={() => window.open(createWhatsAppLink(perfil.whatsapp, perfil.nome), '_blank')}
          >
            Contatar via WhatsApp
          </Button>
          <Comments
            comments={perfil.comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
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
